# 🏡 Imóvel Zeta — Manual do Sistema de Qualificação Automática

> **Como este sistema reduz o tempo de resposta da sua agência em 80%**

---

## 📋 Índice

1. [O Problema Resolvido](#o-problema-resolvido)
2. [Como Funciona](#como-funciona)
3. [Tecnologias Utilizadas](#tecnologias-utilizadas)
4. [Instalação e Arranque](#instalação-e-arranque)
5. [Integração com Google Sheets](#integração-com-google-sheets)
6. [Conformidade RGPD](#conformidade-rgpd)
7. [Estrutura do Projeto](#estrutura-do-projeto)

---

## 🎯 O Problema Resolvido

### Antes deste sistema

| Situação | Tempo |
|---|---|
| Cliente preenche formulário de contacto | — |
| Email recebido na agência | +0 min |
| Staff verifica email e lê pedido | +2–4 horas |
| Staff faz triagem manual (tipo, zona, orçamento) | +30 min |
| Staff liga ao cliente para qualificar | +1 hora |
| Lead chega a um consultor pronto para agir | **4–8 horas depois** |

### Depois deste sistema

| Situação | Tempo |
|---|---|
| Cliente abre o chatbot e aceita RGPD | — |
| Chatbot qualifica automaticamente (nome, telemóvel, tipo, zona, orçamento) | **< 2 minutos** |
| Dados enviados em tempo real para Google Sheets | **< 1 segundo** |
| Consultor recebe notificação e contacta | **< 30 minutos** |
| **Total até contacto qualificado** | **⚡ < 30 minutos** |

> **Resultado: redução de 80%+ no tempo de resposta** — de 4–8 horas para menos de 30 minutos.

---

## ⚙️ Como Funciona

```
Cliente → Chatbot (Web) → API /api/leads → Google Sheets → Consultor
```

### Fluxo do Chatbot (passo a passo)

1. **Consentimento RGPD** — O cliente lê e aceita os termos de tratamento de dados (obrigatório).
2. **Nome completo** — Identificação do lead.
3. **Telemóvel** — Validado automaticamente para o formato português (+351), incluindo:
   - Redes móveis: 91x, 92x, 93x, 96x
   - Redes fixas: 21x–29x
   - Bloqueio de números tarifados especiais (900, 800, 808, etc.)
4. **Tipo de negócio** — Compra ou Arrendamento.
5. **Zona geográfica** — Lisboa, Porto, Algarve ou outra.
6. **Orçamento disponível** — 4 intervalos pré-definidos.
7. **Confirmação** — Dados guardados automaticamente na folha de cálculo.

---

## 🛠 Tecnologias Utilizadas

| Tecnologia | Função |
|---|---|
| **Next.js 14 (App Router)** | Framework web full-stack |
| **TypeScript** | Tipagem segura, menos bugs |
| **Tailwind CSS** | Estilização rápida e consistente |
| **Supabase** | Base de dados em tempo real |
| **RGPD (UE 2016/679)** | Conformidade legal automática |

---

## 🚀 Instalação e Arranque

### Pré-requisitos

- Node.js 18+ instalado
- Conta Google com acesso a Google Sheets

### Passos

```bash
# 1. Instalar dependências
npm install

# 2. Configurar variáveis de ambiente
cp .env.example .env.local
# Edite o ficheiro .env.local com as suas credenciais

# 3. Iniciar em modo de desenvolvimento
npm run dev

# 4. Abrir no browser
# http://localhost:3000
```

---

## 📊 Integração com Supabase

### Configuração (10 minutos, uma única vez)

1. Aceda a [supabase.com](https://supabase.com)
2. Crie um projeto novo → vá a **Project Settings** > **API**
3. Adicione ao `.env.local`:

```env
SUPABASE_URL=SUA_URL_AQUI
SUPABASE_ANON_KEY=SUA_KEY_AQUI
LEAD_WEBHOOK_URL=OPCIONAL_WEBHOOK_PARA_ZAPIER_MAKE
```

4. Crie uma tabela `leads` com as colunas: `nome`, `telemovel`, `tipo_negocio`, `zona`, `orcamento`, `consentimento_rgpd`, `timestamp_iso`.

### Estrutura da Folha de Cálculo

| A | B | C | D | E | F | G | H |
|---|---|---|---|---|---|---|---|
| Timestamp | Nome | Telemóvel | Tipo | Zona | Orçamento | RGPD | Referência |

---

## 🔒 Conformidade RGPD

Este sistema foi desenhado desde o início com privacidade integrada (**Privacy by Design**):

- ✅ **Consentimento explícito** — checkbox obrigatória antes de qualquer recolha de dados
- ✅ **Finalidade limitada** — dados usados exclusivamente para contacto imobiliário
- ✅ **Log de auditoria** — cada submissão é registada com timestamp e IP (servidor)
- ✅ **Informação clara** — o utilizador sabe exatamente o que acontece aos seus dados
- ✅ **Contacto para exercício de direitos** — email de privacidade apresentado ao utilizador

> ⚠️ **Aviso Legal**: Em produção, consulte um jurista especializado em RGPD para validar o aviso de privacidade completo da sua agência.

---

## 📁 Estrutura do Projeto

```
imovel/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   └── leads/
│   │   │       └── route.ts        ← API de receção e validação de leads
│   │   ├── globals.css             ← Design system luxury
│   │   ├── layout.tsx              ← Layout raiz com SEO PT-PT
│   │   └── page.tsx                ← Página principal com navegação
│   └── components/
│       ├── Chatbot.tsx             ← Agente de qualificação completo
│       └── Dashboard.tsx           ← Painel de gestão de leads
├── .env.local                      ← Credenciais (NÃO partilhar)
├── .env.example                    ← Modelo de variáveis
└── README.md                       ← Este ficheiro
```

---

## 📞 Suporte

Para questões técnicas ou configuração da integração Google Sheets, contacte a equipa de desenvolvimento.

---

*Sistema desenvolvido para ImóvelPrime · Conforme RGPD · Portugal 🇵🇹*
