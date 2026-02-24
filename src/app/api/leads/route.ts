import { NextRequest, NextResponse } from "next/server";

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

// ──────────────────────────────────────────────
// Simulação de Google Sheets API
// ──────────────────────────────────────────────
/**
 * Em produção, substitua esta função pela integração real:
 *
 * import { google } from 'googleapis';
 * const auth = new google.auth.GoogleAuth({ ... });
 * const sheets = google.sheets({ version: 'v4', auth });
 * await sheets.spreadsheets.values.append({
 *   spreadsheetId: process.env.GOOGLE_SHEET_ID,
 *   range: 'Leads!A:H',
 *   valueInputOption: 'USER_ENTERED',
 *   requestBody: { values: [row] },
 * });
 */
async function guardarNoGoogleSheets(lead: LeadPayload): Promise<{ sucesso: boolean; linha: number }> {
    console.log("📊 [Google Sheets API] A guardar lead:", {
        timestamp: lead.timestampISO,
        nome: lead.nome,
        zona: lead.zona,
        tipo: lead.tipoNegocio,
    });

    // Simula latência da API (~300ms)
    await new Promise((r) => setTimeout(r, 300));

    // Simula número de linha na folha de cálculo
    const linhaSimulada = Math.floor(Math.random() * 1000) + 2;

    return { sucesso: true, linha: linhaSimulada };
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

        // 2. Guardar no Google Sheets (simulação)
        const resultado = await guardarNoGoogleSheets(body);

        if (!resultado.sucesso) {
            throw new Error("Falha ao guardar na folha de cálculo.");
        }

        // 3. Log de auditoria RGPD
        console.log(`✅ [RGPD Audit] Lead guardado | Nome: ${body.nome} | IP: ${req.headers.get("x-forwarded-for") ?? "local"} | Timestamp: ${body.timestampISO} | Linha Sheets: ${resultado.linha}`);

        // 4. Resposta de sucesso
        return NextResponse.json(
            {
                mensagem: "Lead guardado com sucesso.",
                referencia: `IPR-${Date.now().toString(36).toUpperCase()}`,
                linhaSheets: resultado.linha,
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
// GET /api/leads — lista todos os leads (demo)
// ──────────────────────────────────────────────
export async function GET() {
    // Em produção: lê da Google Sheets ou base de dados
    return NextResponse.json({
        mensagem: "Em produção, esta rota devolve os leads da folha de cálculo.",
        documentacao: "Configure GOOGLE_SHEET_ID e GOOGLE_SERVICE_ACCOUNT no .env.local",
        exemplo_env: {
            GOOGLE_SHEET_ID: "1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgVE2upms",
            GOOGLE_SERVICE_ACCOUNT_EMAIL: "imovelprime@projeto.iam.gserviceaccount.com",
        },
    });
}
