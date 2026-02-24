import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { dispararAutomacao } from "@/lib/automacao";

export const dynamic = "force-dynamic";

// ──────────────────────────────────────────────
// Tipos
// ──────────────────────────────────────────────
interface LeadPayload {
    nome: string;
    telemovel: string;
    tipoNegocio: string;
    zona: string;
    orcamento: string;
    consentimentoRGPD: boolean;
    timestampISO: string;
}

async function guardarNoSupabase(lead: LeadPayload): Promise<{ sucesso: boolean; id?: string }> {
    if (!supabase) {
        console.error("❌ [Supabase API] Cliente não inicializado. Verifique as variáveis de ambiente.");
        return { sucesso: false };
    }
    const { data, error } = await supabase
        .from('leads')
        .insert([{
            nome: lead.nome,
            telemovel: lead.telemovel,
            tipo_negocio: lead.tipoNegocio,
            zona: lead.zona,
            orcamento: lead.orcamento,
            consentimento_rgpd: lead.consentimentoRGPD,
            timestamp_iso: lead.timestampISO
        }])
        .select();

    if (error) {
        console.error("❌ [Supabase API] Erro ao guardar lead:", error);
        return { sucesso: false };
    }

    console.log("📊 [Supabase API] Lead guardado com sucesso:", data[0].id);
    return { sucesso: true, id: data[0].id };
}

// ──────────────────────────────────────────────
// Validação do Telemóvel (server-side)
// ──────────────────────────────────────────────
function validarTelemovelServidor(numero: string): boolean {
    // Remove formatação
    let limpo = numero.replace(/[\s\-\.]/g, "");
    if (limpo.startsWith("+351")) limpo = limpo.slice(4);
    else if (limpo.startsWith("00351")) limpo = limpo.slice(5);
    else if (limpo.startsWith("351") && limpo.length > 9) limpo = limpo.slice(3);

    if (!/^\d{9}$/.test(limpo)) return false;

    const prefixo2 = parseInt(limpo.slice(0, 2));
    const prefixo3 = parseInt(limpo.slice(0, 3));
    const moveisValidos = [91, 92, 93, 96];
    const fixosValidos = prefixo2 >= 21 && prefixo2 <= 29;
    const tarifados = [900, 800, 808, 116, 707, 700, 760, 809, 821];

    if (tarifados.includes(prefixo3)) return false;
    return moveisValidos.includes(prefixo2) || fixosValidos;
}

// ──────────────────────────────────────────────
// POST /api/leads
// ──────────────────────────────────────────────
export async function POST(req: NextRequest) {
    try {
        const body: LeadPayload = await req.json();

        // 1. Validações obrigatórias e Anti-XSS (Sanitization)
        if (!body.consentimentoRGPD) {
            return NextResponse.json({ erro: "Consentimento RGPD é obrigatório." }, { status: 400 });
        }

        // Bloqueio de tamanho (Buffer Overflow Protection / Payload too large)
        if (JSON.stringify(body).length > 2000) {
            return NextResponse.json({ erro: "Payload excede o tamanho permitido." }, { status: 413 });
        }

        const sanitizeTexto = (txt: string) => {
            if (!txt) return "";
            return txt.replace(/[<>]/g, "").trim().substring(0, 100); // Remove < >, trima e limita a 100 chars
        };

        const nomeSanitizado = sanitizeTexto(body.nome);
        if (!nomeSanitizado || nomeSanitizado.length < 2) {
            return NextResponse.json({ erro: "Nome inválido." }, { status: 400 });
        }
        body.nome = nomeSanitizado;

        if (!validarTelemovelServidor(body.telemovel)) {
            return NextResponse.json({ erro: "Número de telemóvel português inválido." }, { status: 400 });
        }

        const camposObrigatorios: (keyof LeadPayload)[] = ["tipoNegocio", "zona", "orcamento", "timestampISO"];
        for (const campo of camposObrigatorios) {
            if (!body[campo]) {
                return NextResponse.json({ erro: `Campo obrigatório em falta: ${campo}` }, { status: 400 });
            }
            // Sanitiza os campos em string
            if (typeof body[campo] === "string") {
                (body as any)[campo] = sanitizeTexto(body[campo] as string);
            }
        }

        // 2. Guardar no Supabase
        const resultado = await guardarNoSupabase(body);

        if (!resultado.sucesso) {
            throw new Error("Falha ao guardar na base de dados.");
        }

        // 2.1 Disparar Automação Real-time (Webhook)
        dispararAutomacao(body).catch(e => console.error("Erro assíncrono na automação:", e));

        // 3. Log de auditoria RGPD
        console.log(`✅ [RGPD Audit] Lead guardado | Nome: ${body.nome} | IP: ${req.headers.get("x-forwarded-for") ?? "local"} | Timestamp: ${body.timestampISO} | ID Supabase: ${resultado.id}`);

        // 4. Resposta de sucesso
        return NextResponse.json(
            {
                mensagem: "Lead guardado com sucesso.",
                referencia: `IPR-${Date.now().toString(36).toUpperCase()}`,
                idSupabase: resultado.id,
                timestamp: new Date().toISOString(),
            },
            { status: 201 }
        );
    } catch (err) {
        console.error("[/api/leads] Erro:", err);
        return NextResponse.json(
            { erro: "Erro interno do servidor. Por favor tente novamente." },
            { status: 500 }
        );
    }
}

// ──────────────────────────────────────────────
// GET /api/leads — Proteção de Dados (Internal Use Only)
// ──────────────────────────────────────────────
export async function GET() {
    return NextResponse.json(
        { erro: "Acesso não autorizado. Esta rota é apenas para uso interno do sistema." },
        { status: 403 }
    );
}
