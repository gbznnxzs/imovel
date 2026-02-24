/**
 * automacao.ts - Sistema de Automação de Leads em Tempo Real
 * Envia leads para Webhooks (Zapier, Make, Discord) ou Google Sheets.
 */

export async function dispararAutomacao(lead: any) {
    const WEBHOOK_URL = process.env.LEAD_WEBHOOK_URL;

    console.log("🚀 [Automação] Disparando integração para:", lead.nome);

    if (!WEBHOOK_URL) {
        console.warn("⚠️ [Automação] WEBHOOK_URL não configurada. Lead guardado apenas no banco.");
        return;
    }

    try {
        const response = await fetch(WEBHOOK_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                ...lead,
                origem: "Website Imóvel Zeta",
                emissao: new Date().toISOString()
            }),
        });

        if (response.ok) {
            console.log("✅ [Automação] Lead enviado com sucesso para o Webhook.");
        } else {
            console.error("❌ [Automação] Falha ao enviar Webhook:", response.statusText);
        }
    } catch (error) {
        console.error("❌ [Automação] Erro na requisição de automação:", error);
    }
}
