# WACRM — Análise Completa do Projeto

## 1. IDENTIDADE DO PROJETO

**Nome:** wacrm (WhatsApp CRM)
**Versão:** 0.2.2 (pré-1.0, em desenvolvimento ativo)
**Licença:** MIT
**Autor:** Arnas Donauskas
**Homepage:** https://github.com/ArnasDon/wacrm
**Descrição:** Template de CRM auto-hospedável para WhatsApp — caixa de entrada compartilhada, contatos, pipeline de vendas, transmissões e automações sem código. Construído como um template para forkar, customizar e auto-hospedar.

---

## 2. STACK TECNOLÓGICO

| Camada | Tecnologia | Versão |
|--------|-----------|--------|
| **Framework** | Next.js (App Router) | 16.2.6 |
| **UI Library** | React | 19.2.4 |
| **Linguagem** | TypeScript | ~6 |
| **Estilização** | Tailwind CSS | v4 |
| **Componentes UI** | shadcn/ui (base-nova) | via shadcn ^4.11.0 |
| **Ícones** | lucide-react | ^1.18.0 |
| **Animações** | tw-animate-css | ^1.4.0 |
| **Banco/Auth** | Supabase (Postgres + Auth + Storage + RLS + Realtime) | ^2.107.0 |
| **WhatsApp** | Meta Cloud API (v21.0) | — |
| **Drag & Drop** | @dnd-kit | core ^6.3.1, sortable ^10.0.0 |
| **Fluxogramas** | @xyflow/react (React Flow) | ^12.11.0 |
| **Layout de Grafos** | @dagrejs/dagre | ^3.0.0 |
| **Gráficos** | recharts | ^3.8.1 |
| **Notificações** | sonner | ^2.0.7 |
| **Datas** | date-fns | ^4.4.0 |
| **Áudio** | opus-recorder | ^8.0.5 |
| **CSS-in-JS** | class-variance-authority, clsx, tailwind-merge | vários |
| **Testes** | Vitest | ^4.1.9 |
| **Linting** | ESLint v9, eslint-config-next | v9 / 16.2.6 |
| **Formatação** | Prettier + prettier-plugin-tailwindcss | ^3.8.4 |
| **Runtime** | Node.js >=20 | — |

---

## 3. ESTRUTURA DE DIRETÓRIOS

### Raiz

| Arquivo/Pasta | Propósito |
|--------------|-----------|
| `.editorconfig` | Configurações do editor (espaços, UTF-8, LF) |
| `.env.local.example` | Template para variáveis de ambiente |
| `.gitignore` | Regras de ignorar do Git |
| `.prettierrc` / `.prettierignore` | Configuração do Prettier |
| `AGENTS.md` | Regras para agentes de IA (nota de divergência do Next.js 16) |
| `CHANGELOG.md` | Histórico completo de versões com notas de migração |
| `CLAUDE.md` | Aponta para AGENTS.md |
| `CONTRIBUTING.md` | Guia de fork/customização |
| `LICENSE` | Licença MIT |
| `README.md` | Documentação principal, features, quick start, deploy |
| `components.json` | Configuração do shadcn/ui |
| `eslint.config.mjs` | Configuração ESLint flat (Next.js + TypeScript) |
| `next.config.ts` | Configuração Next.js 16 (headers de segurança, cache) |
| `package.json` | Metadados NPM, scripts, dependências |
| `postcss.config.mjs` | PostCSS com plugin Tailwind v4 |
| `tsconfig.json` | Configuração TypeScript (path alias @/ → ./src/) |
| `vitest.config.ts` | Configuração de testes Vitest |
| `docs/` | Diretório de documentação |
| `public/` | Assets estáticos (ícones, SVGs, worker opus) |
| `src/` | Código fonte da aplicação |
| `supabase/` | Migrações do banco de dados |

### `src/` — Árvore Principal

```
src/
  middleware.ts              — Middleware Next.js (proteção de auth)
  middleware.test.ts         — Testes unitários do middleware
  app/                       — Páginas App Router + rotas API
  components/                — Componentes React (UI, módulos de funcionalidades)
  hooks/                     — Hooks React customizados
  lib/                       — Lógica de negócio, utilitários, acesso a dados
  types/                     — Definições de tipos TypeScript
```

### `src/app/` — Estrutura App Router

```
app/
  layout.tsx                 — Layout raiz (fonte Inter, ThemeProvider, script de tema)
  page.tsx                   — Página raiz (redireciona para /dashboard)
  globals.css                — Tailwind + shadcn + variáveis CSS de tema (5 temas, 2 modos)
  icon.tsx                   — Favicon dinâmico (bolha de chat roxa)

  (auth)/                    — Grupo de rotas de autenticação
    layout.tsx               — Metadados no-index
    login/page.tsx           — Formulário de login (com suporte a token de convite)
    signup/page.tsx          — Formulário de cadastro (com suporte a token de convite)
    forgot-password/page.tsx — Formulário de redefinição de senha

  (dashboard)/               — Grupo de rotas autenticadas
    layout.tsx               — Layout do dashboard (no-index, envolve DashboardShell)
    dashboard-shell.tsx      — AuthProvider + Sidebar + Header + PresenceHeartbeat
    dashboard/page.tsx       — Dashboard principal (métricas, gráficos, feed de atividade)
    inbox/page.tsx           — Caixa de entrada compartilhada (lista de conversas + thread)
    contacts/page.tsx        — Gerenciamento de contatos (tabela, busca, filtro de tags, importação)
    pipelines/page.tsx       — Kanban de pipeline de vendas
    broadcasts/page.tsx      — Lista de campanhas de transmissão
    broadcasts/new/page.tsx       — Wizard de nova transmissão
    broadcasts/[id]/page.tsx      — Detalhe da transmissão
    automations/page.tsx          — Lista de automações + templates
    automations/new/page.tsx      — Nova automação
    automations/[id]/edit/        — Editor de automação
    automations/[id]/logs/        — Logs de execução de automação
    flows/page.tsx                — Lista de fluxos
    flows/[id]/page.tsx           — Editor de fluxo (construtor visual)
    flows/[id]/runs/              — Histórico de execuções de fluxo
    settings/page.tsx             — Central de configurações (10 abas)

  join/                      — Aceitação de convite (fora dos grupos auth/dashboard)
    layout.tsx               — Meta no-referrer, layout de card centralizado
    [token]/page.tsx         — Página de visualização + resgate de convite

  api/                       — Handlers de rotas de API
    account/                 — CRUD de conta (GET, PATCH), membros, convites, transferência
    account/api-keys/        — Gerenciamento de chaves de API
    account/members/         — Gerenciamento de membros da equipe
    account/invitations/     — CRUD de convites
    account/transfer-ownership/ — Transferência de propriedade
    automations/             — CRUD de automações, dispatch do motor, cron
    flows/                   — CRUD de fluxos, templates, cron
    invitations/             — Endpoints públicos de visualização + resgate
    v1/me/                   — Sonda da REST API pública
    whatsapp/                — Rotas de integração WhatsApp
      webhook/               — Webhook de entrada (verificação + recebimento)
      broadcast/             — Envio de transmissão
      config/                — CRUD de configuração WhatsApp
      send/                  — Envio de mensagem
      react/                 — Envio de reação
      media/                 — Proxy de mídia
      templates/             — CRUD + submissão de templates de mensagem
```

### `src/components/` — Módulos de Componentes

```
components/
  ui/                   — 23 primitivas shadcn/ui (button, card, dialog, table, etc.)
  layout/               — sidebar.tsx, header.tsx, mode-toggle.tsx
  auth/                 — require-role.tsx (componente de restrição de função)
  inbox/                — conversation-list, message-thread, message-bubble,
                          message-composer, message-actions, message-reactions,
                          contact-sidebar, reply-quote, template-picker
  contacts/             — contact-form, contact-detail-view, custom-fields-manager, import-modal
  dashboard/            — metric-card, conversations-chart, pipeline-donut,
                          response-time-chart, activity-feed, quick-actions, skeleton
  pipelines/            — pipeline-board, deal-card, deal-form, pipeline-settings, pipeline-analytics
  broadcasts/           — step1-choose-template, step2-select-audience,
                          step3-personalize, step4-schedule-send
  automations/          — automation-builder.tsx
  flows/                — flow-builder, flow-canvas, flow-editor-shell, validation-panel,
                          flow-editor-state, forms/, shared, header
  settings/             — 20 componentes (profile-form, whatsapp-config, template-manager,
                          appearance-panel, members-tab, api-keys-settings, etc.)
  presence/             — presence-dot, presence-heartbeat
  tremor/               — bar-chart, chart-colors, use-on-window-resize, get-y-axis-domain
  themed-toaster.tsx    — Sonner toaster com suporte a tema
```

### `src/hooks/` — Hooks React Customizados

| Hook | Propósito |
|------|-----------|
| `use-auth.tsx` | Contexto AuthProvider — usuário, perfil, conta, função, permissões |
| `use-can.ts` | Verificação de permissão tipada (`useCan('send-messages')`) |
| `use-realtime.ts` | Assinaturas Supabase Realtime (mensagens + conversas) |
| `use-theme.tsx` | ThemeProvider — tema de acento + modo claro/escuro |
| `use-presence.ts` | Presença ao vivo de membros da equipe (online/ausente/offline) |
| `use-total-unread.ts` | Total de conversas não lidas (badge da sidebar) |
| `use-broadcast-sending.ts` | Criação + envio de transmissão com resolução de audiência |

### `src/lib/` — Lógica de Negócio e Utilitários

```
lib/
  utils.ts              — Função cn() (clsx + tailwind-merge)
  themes.ts             — Catálogo de temas (5 cores de acento), modo claro/escuro
  currency.ts           — formatCurrency, formatCurrencyShort, lista CURRENCIES
  rate-limit.ts         — Limitador de taxa em memória por chave (múltiplos orçamentos)
  broadcast-status.ts   — Config de exibição de status para transmissões/destinatários
  template-status.ts    — Config de exibição de status para templates de mensagem
  presence.ts           — Helpers de derivação e formatação de presença

  supabase/
    client.ts           — Cliente Supabase singleton para browser
    server.ts           — Cliente Supabase SSR para servidor

  auth/
    roles.ts            — Enum de funções + hierarquia + predicados de capacidade
    account.ts          — Contexto de conta server-side (getCurrentAccount, requireRole)
    api-context.ts      — Autenticação por chave de API para API pública
    invitations.ts      — Geração de token, hashing, construção de URL

  whatsapp/
    meta-api.ts         — Todas as chamadas Meta Cloud API (enviar, mídia, templates, reações, interativas)
    encryption.ts       — Criptografia/descriptografia AES-256-GCM de token
    phone-utils.ts      — Sanitização de telefone, validação E.164
    webhook-signature.ts — Verificação de assinatura HMAC-SHA256 de webhook
    template-components.ts   — Construtor de componentes de template Meta
    template-send-builder.ts — Constrói array de componentes no momento do envio
    template-validators.ts   — Validação de restrições de template
    template-lifecycle.ts    — Helpers de ciclo de vida de status de template
    template-webhook.ts      — Handler de mudança de template via webhook
    template-header-handle.ts — Gerenciamento de handle de upload retomável
    template-row-guard.ts    — Guard de linha de template
    template-status-normalize.ts — Normalização de status

  automations/
    engine.ts           — Motor de execução de automações (703 linhas)
    meta-send.ts        — Helpers Meta Send específicos de automação
    validate.ts         — Validação de configuração de automação
    templates.ts        — Templates de automação pré-construídos
    trigger-meta.ts     — Metadados de exibição de triggers
    steps-tree.ts       — Helpers de árvore de passos
    admin-client.ts     — Cliente Supabase service-role lazy

  flows/
    engine.ts           — Motor de execução de fluxos (1117 linhas)
    meta-send.ts        — Helpers Meta Send específicos de fluxo
    types.ts            — Tipos de configuração de nó de fluxo + tipos runtime
    validate.ts         — Validação de fluxo
    templates.ts        — Templates de fluxo pré-construídos
    admin-client.ts     — Cliente Supabase service-role lazy
    edges.ts            — Helpers de geração de arestas
    layout.ts           — Helpers de layout de grafo Dagre
    fallback.ts         — Política de fallback (reprompt, handoff, end)

  dashboard/
    queries.ts          — Consultas de dados do dashboard (métricas, séries, pipeline, etc.)
    types.ts            — Tipos de dados do dashboard
    date-utils.ts       — Utilitários de intervalo de datas

  contacts/
    dedupe.ts           — Lógica de deduplicação de telefone
    parse-contact-csv.ts — Parse de CSV
    resolve-import-tags.ts — Resolução de tags durante importação

  api-keys/
    keys.ts             — Geração + hashing de chave de API
    scopes.ts           — Escopos de chave de API
    store.ts            — Operações de armazenamento de chave

  api/v1/
    respond.ts          — Helpers de resposta da API pública (ok, error)

  storage/
    upload-media.ts     — Upload para Supabase Storage para mídia de fluxo
```

### `supabase/migrations/` — Evolução do Schema do Banco

26 arquivos de migração (001–026) cobrindo:

1. **001** — Tabelas core: profiles, contacts, tags, contact_tags, custom_fields, contact_custom_values, conversations, messages, whatsapp_config, pipelines, pipeline_stages, deals, broadcasts, broadcast_recipients
2. **002** — Melhorias em pipelines
3. **003** — broadcast_recipient wamid
4. **004** — Contact delete set null
5. **005** — Broadcast counts incremental
6. **006** — Schema de automações
7. **007** — RPC de contador incremental de automações
8. **008** — Storage de avatares de perfil
9. **009** — Ações de mensagem (reações, resposta)
10. **010** — Schema de fluxos (flows, flow_nodes, flow_runs, flow_run_events)
11. **011** — Coluna beta_features no perfil
12. **012** — RPC de contador incremental de fluxos
13. **013** — WhatsApp config phone_number_id unique
14. **014** — Templates de mensagem + integração Meta
15. **015** — Registro de configuração WhatsApp
16. **016** — Bucket de storage de mídia de fluxo
17. **017** — Compartilhamento de conta (accounts, account_invitations, account_id)
18. **018** — RPCs de membro de conta (set_member_role, remove_account_member, transfer_ownership)
19. **019** — RPCs de convite (peek_invitation, redeem_invitation)
20. **020** — Followups de compartilhamento de conta
21. **021** — Moeda padrão da conta
22. **022** — Dedup de telefone de contato
23. **023** — Chat media
24. **024** — Presença de membro
25. **025** — Filtrar contatos por tags
26. **026** — Chaves de API

---

## 4. MODELOS DE DADOS / SCHEMA (Entidades Core)

| Entidade | Tabela | Campos Principais |
|---------|--------|-------------------|
| **Account** | `accounts` | id, name, owner_user_id, default_currency |
| **Profile** | `profiles` | id, user_id, full_name, email, avatar_url, account_id, account_role |
| **Contact** | `contacts` | id, user_id, account_id, phone, phone_normalized, name, email, company |
| **Tag** | `tags` | id, user_id, name, color |
| **ContactTag** | `contact_tags` | contact_id, tag_id (M:N) |
| **CustomField** | `custom_fields` | id, user_id, account_id, field_name, field_type |
| **ContactCustomValue** | `contact_custom_values` | contact_id, custom_field_id, value |
| **Conversation** | `conversations` | id, user_id, contact_id, status, assigned_agent_id |
| **Message** | `messages` | id, conversation_id, sender_type, content_type, content_text, media_url |
| **MessageReaction** | `message_reactions` | message_id, actor_type, emoji |
| **WhatsAppConfig** | `whatsapp_config` | id, user_id, account_id, phone_number_id, waba_id, access_token (criptografado) |
| **MessageTemplate** | `message_templates` | id, user_id, name, category, body_text, header_type, buttons, status |
| **Pipeline** | `pipelines` | id, user_id, account_id, name |
| **PipelineStage** | `pipeline_stages` | id, pipeline_id, name, position, color |
| **Deal** | `deals` | id, pipeline_id, stage_id, contact_id, title, value, currency, status |
| **Broadcast** | `broadcasts` | id, user_id, account_id, name, template_name, status |
| **BroadcastRecipient** | `broadcast_recipients` | broadcast_id, contact_id, status, whatsapp_message_id |
| **Automation** | `automations` | id, account_id, user_id, name, trigger_type, trigger_config, is_active |
| **AutomationStep** | `automation_steps` | id, automation_id, step_type, step_config, position |
| **AutomationLog** | `automation_logs` | automation_id, contact_id, status, steps_executed |
| **Flow** | `flows` | id, account_id, status, trigger_type, trigger_config |
| **FlowNode** | `flow_nodes` | flow_id, node_key, node_type, config |
| **FlowRun** | `flow_runs` | flow_id, contact_id, status, current_node_key |
| **FlowRunEvent** | `flow_run_events` | run_id, event_type, payload |
| **MemberPresence** | `member_presence` | user_id, account_id, status, last_seen_at |
| **AccountInvitation** | `account_invitations` | account_id, token_hash, role, expires_at |
| **ApiKey** | `api_keys` | account_id, key_hash, name, scopes, revoked_at |

---

## 5. SERVIÇOS EXTERNOS / INTEGRAÇÕES

### Meta WhatsApp Cloud API (v21.0)
- **Envio:** Texto, mídia (imagem/video/documento/áudio), templates, botões interativos, listas interativas, reações
- **Mídia:** Resumable Upload API para handles de mídia de header de template; download/recuperação de mídia
- **Templates:** Submeter, editar, deletar templates de mensagem via Business Management API
- **Webhook:** Recebimento de mensagens de entrada, atualizações de status de entrega, mudanças de status de template
- **Registro:** Registro de número de telefone, assinatura WABA
- **Verificação:** Verificação de assinatura HMAC-SHA256 em payloads de webhook

### Supabase
- **Auth:** Autenticação email/senha, gerenciamento de sessão
- **Database:** PostgreSQL com Row-Level Security (RLS) em todas as tabelas
- **Realtime:** Assinaturas WebSocket em mensagens, conversas, member_presence
- **Storage:** Bucket de avatares (fotos de perfil), bucket flow-media (uploads de mídia de fluxo)
- **Edge Functions:** Não utilizado atualmente

---

## 6. PRINCIPAIS FUNCIONALIDADES & PADRÕES DE ARQUITETURA

### Arquitetura de Segurança
- **Criptografia AES-256-GCM** para tokens de acesso WhatsApp em repouso
- **Hashing SHA-256** para chaves de API e tokens de convite (nunca armazenados em texto puro)
- **Verificação de assinatura HMAC-SHA256** de webhook
- **Headers CSP** em modo Report-Only
- **HSTS, X-Content-Type-Options, X-Frame-Options** de hardening
- **Limitador de taxa** por usuário/chave (em memória, janela fixa)
- **4 funções** (owner, admin, agent, viewer) com controle de UI baseado em capacidade
- **RLS** em todas as tabelas do banco (com escopo de conta desde migração 017)

### Multi-Tenancy (Compartilhamento de Conta)
- Migração 017 introduziu tenancy com escopo de conta
- Cada usuário ganha uma conta pessoal ao se cadastrar
- Membros da conta compartilham config WhatsApp, contatos, conversas
- Acesso baseado em função: Owner > Admin > Agent > Viewer
- Sistema de convite (baseado em token, hash em repouso)
- Suporte a transferência de propriedade

### Padrões de Design Principais
- **Padrões server-only** — auth/account.ts usa cliente Supabase SSR
- **Cliente Supabase singleton** — cliente do browser é singleton para evitar contenção de lock de auth
- **Clientes Admin (service-role)** — motores de automações/fluxos usam cliente service-role (ignora RLS)
- **Parâmetros nomeados** — Funções Meta API usam objetos de argumentos nomeados para evitar bugs de argumentos trocados
- **Atualizações otimistas** — pipeline board, toggle de automação, progresso de transmissão usam estado otimista com rollback em erro
- **Manipulação de eventos Realtime** — inbox usa Supabase Realtime para atualizações ao vivo de mensagens/conversas
- **Ressincronização na reconexão** — reconexões de canal Realtime disparam um refetch para capturar eventos perdidos
- **Padrão de hidratação** — IDs de conversa desconhecidos disparam uma hidratação no DB para preencher dados de contato
- **Padrão de cancelamento** — números de sequência de fetch previnem que respostas obsoletas sobrescrevam dados recentes
- **Controle acessível** — `GatedButton` wrapper mostra desabilitado com tooltip em vez de esconder elementos de usuários sem privilégio

### Arquitetura dos Motores
- **Motor de Automações** (`src/lib/automations/engine.ts`): Execução de workflow baseado em trigger. Suporta 7 tipos de trigger (new_message, first_inbound, keyword, new_contact, conversation_assigned, tag_added, time_based) e 11 tipos de passo (send_message, send_template, add/remove_tag, assign, update_field, create_deal, wait, condition, send_webhook, close_conversation)
- **Motor de Fluxos** (`src/lib/flows/engine.ts`): Chatbot state-machine runner. Tipos de nó: start, send_message, send_buttons, send_list, send_media, collect_input, condition, set_tag. Usa chaves de idempotência, atualizações otimistas e políticas de fallback.
- **Envio de Transmissão** (`src/lib/broadcast/`): Resolução de audiência (all/tags/custom_field/CSV), interpolação de variáveis de template, envio em lote com conformidade a limite de taxa Meta
- **Consultas do Dashboard** (`src/lib/dashboard/queries.ts`): Agregação client-side para métricas, séries de conversas, donut de pipeline, tempo de resposta e feed de atividade

### REST API Pública (`/api/v1`)
- Autenticação Bearer token com chaves de API com escopo
- Limitado a 120 req/min por chave
- Envelope JSON padrão (`{ data: ... }` / `{ error: { code, message } }`)
- Endpoint atual: `GET /api/v1/me` (sonda de identidade)
- Planejado: endpoints de mensagens, contatos, conversas, transmissões

### Sistema de Temas
- 5 temas de cor de acento: Violeta (padrão), Esmeralda, Cobalto, Âmbar, Rosa
- 2 modos: Escuro (padrão), Claro
- Persistido no localStorage, script de boot previne flash
- Sincronização entre abas via StorageEvent

---

## 7. SCRIPTS

| Comando | Propósito |
|---------|-----------|
| `npm run dev` | Servidor de desenvolvimento Turbopack (porta 3000) |
| `npm run build` | Build de produção (inclui typecheck) |
| `npm run start` | Servidor de produção |
| `npm run lint` | ESLint |
| `npm run typecheck` | Verificação TypeScript (`tsc --noEmit`) |
| `npm run format` | Prettier write |
| `npm run format:check` | Prettier check-only |
| `npm test` | Vitest run |
| `npm run test:watch` | Vitest watch mode |

---

## 8. VARIÁVEIS DE AMBIENTE

### Obrigatórias
| Variável | Descrição |
|----------|-----------|
| `NEXT_PUBLIC_SUPABASE_URL` | URL do projeto Supabase |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Chave anônima do Supabase |
| `SUPABASE_SERVICE_ROLE_KEY` | Chave service-role (apenas server-side) |
| `ENCRYPTION_KEY` | Chave hex de 64 caracteres para criptografia AES-256-GCM de token |
| `META_APP_SECRET` | Meta App Secret para verificação HMAC de webhook |

### Recomendadas
| Variável | Descrição |
|----------|-----------|
| `NEXT_PUBLIC_SITE_URL` | URL pública canônica |

### Opcionais
| Variável | Descrição |
|----------|-----------|
| `ALLOWED_INVITE_HOSTS` | Lista de permissão para hostnames de URL de convite |
| `AUTOMATION_CRON_SECRET` | Segredo para endpoints cron de automação/fluxo |
| `META_APP_ID` | Meta App ID para Resumable Upload (templates com header de imagem) |
| `WHATSAPP_TEMPLATES_DRY_RUN` | Pular chamada Meta API para submissão de template (dev/CI) |

---

## 9. TESTES

- **Framework:** Vitest v4
- **Localização:** Arquivos `.test.ts`/`.test.tsx` colocalizados junto ao código fonte
- **Áreas cobertas:** middleware (113 linhas), encryption, webhook-signature, phone-utils, template-*, broadcast-status, presence, rate-limit, currency, contacts/dedupe, contacts/parse-contact-csv, api-keys, auth/roles, auth/account, auth/api-context, auth/invitations, automations/engine, automations/validate, flows/engine, flows/edges, flows/layout, flows/validate, flows/fallback, flows/flow-editor-state, dashboard/date-utils, storage/upload-media, meta-api, meta-api.media, meta-api.resumable

---

## 10. NOTAS ADICIONAIS RELEVANTES

- O projeto usa **Next.js 16** que tem mudanças de quebra (conforme AGENTS.md)
- O arquivo **`AGENTS.md`** alerta agentes de IA que esta versão do Next.js difere dos dados de treinamento e para verificar a documentação inclusa no Node
- O **CHANGELOG** é excepcionalmente detalhado com requisitos de migração por versão
- **Não há Dockerfile** — o projeto é projetado para Hostinger managed Node.js ou deploy Vercel/Railway
- O diretório **`supabase/migrations/`** contém arquivos SQL que devem ser aplicados em ordem
- O projeto tem **0 dependências de produção em ORMs** — usa o cliente Supabase JS puro com RLS
- A dependência **`opus-recorder`** possui um worker de encoder vendido em `public/opus/` (excluído do ESLint)

---

## 11. PLANO DE IMPLANTAÇÃO LOCAL

### Pré-requisitos verificados
- Node.js **v24.16.0** (>=20 ✓)
- npm **11.13.0**

### Passo 1: Criar projeto no Supabase
1. Acessar [https://supabase.com](https://supabase.com) e criar conta/login
2. Criar novo projeto PostgreSQL (região próxima)
3. Anotar Project URL, anon key e service_role key em **Project Settings → API**

### Passo 2: Aplicar as migrações do banco
- Executar cada arquivo SQL de `supabase/migrations/` em **ordem numérica** (001 a 026) no SQL Editor do Supabase
- 26 migrações cobrindo: schema inicial, pipelines, broadcasts, automations, flows, account sharing, message templates, api keys, etc.

### Passo 3: Configurar autenticação no Supabase
- Em **Authentication → Settings**:
  - Site URL: `http://localhost:3000`
  - Redirect URLs: incluir `http://localhost:3000/**`
- Email provider habilitado (padrão)
- `mailer_autoconfirm: true` (confirmação automática de email)

### Passo 4: Configurar armazenamento (Storage)
- Criar bucket `avatars` (público)
- Criar bucket `flow-media` (público)
- Criar bucket `chat-media` (público)

### Passo 5: Obter credenciais do Meta WhatsApp
- Criar Meta App do tipo Business em [developers.facebook.com](https://developers.facebook.com)
- Configurar WhatsApp Business API com número de telefone
- Anotar App ID, App Secret, Phone Number ID e WABA ID

### Passo 6: Gerar chave de criptografia
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```
Gera `ENCRYPTION_KEY` (64 caracteres hex, AES-256-GCM).

### Passo 7: Criar arquivo `.env.local`
```bash
cp .env.local.example .env.local
```
Preencher com as credenciais dos passos anteriores.

### Passo 8: Instalar dependências
```bash
npm install
```

### Passo 9: Executar verificação de tipos
```bash
npm run typecheck
```

### Passo 10: Iniciar servidor de desenvolvimento
```bash
npm run dev
```

### Passo 11: Criar conta de usuário
- Acessar `http://localhost:3000`
- Clicar em **Sign up** e preencher formulário
- Primeiro usuário é criado como **owner** da conta

---

## 12. EXECUÇÃO DA IMPLANTAÇÃO LOCAL

### Configuração do ambiente

| Arquivo | Status |
|---------|--------|
| `.env.local` | ✅ Criado e configurado |

### Variáveis configuradas

| Variável | Valor |
|----------|-------|
| `NEXT_PUBLIC_SUPABASE_URL` | `https://hepuziqmdiogereifqxn.supabase.co` |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | ✅ Configurada |
| `SUPABASE_SERVICE_ROLE_KEY` | ✅ Configurada |
| `ENCRYPTION_KEY` | ✅ 64 caracteres hex gerada |
| `META_APP_SECRET` | ✅ Configurado |
| `META_APP_ID` | ✅ Configurado |
| `NEXT_PUBLIC_SITE_URL` | `http://localhost:3000` |
| `AUTOMATION_CRON_SECRET` | ✅ Gerado |

### Passos executados

| Passo | Comando | Status | Observação |
|-------|---------|--------|------------|
| Instalar dependências | `npm install` | ✅ | 669 pacotes, 0 vulnerabilidades |
| Verificar tipos | `npm run typecheck` | ✅ | 0 erros |
| Iniciar servidor | `npm run dev` | ✅ | Next.js 16.2.6 (Turbopack) |
| Acessar aplicação | `http://localhost:3000` | ✅ | Login e Signup funcionais |

### Problema encontrado e solução

**Problema:** Após o primeiro `npm run dev`, os bundles JavaScript do Turbopack não haviam sido totalmente compilados. O HTML da página de Signup carregava, mas o JavaScript React responsável pelo evento de submit e pela chamada ao Supabase ainda não estava pronto, fazendo com que o cadastro parecesse não funcionar.

**Solução:** Matar todos os processos Node, restartar o servidor com `Start-Process` para mantê-lo em background e recarregar a página (F5). Na segunda inicialização, os bundles são compilados do zero e o cadastro passa a funcionar.

**Sinais de funcionamento:**
- Log do servidor mostra `GET /dashboard 200` após o cadastro (confirma que o usuário foi criado e redirecionado)
- API direta do Supabase confirma criação de usuário, profile e conta
- `mailer_autoconfirm: true` dispensa confirmação por email

### Servidor ativo
- **URL:** `http://localhost:3000`
- **Framework:** Next.js 16.2.6 (Turbopack)
- **Deprecation notice:** O middleware foi deprecado em favor de `proxy` (esperado no Next.js 16, conforme AGENTS.md)

---

## 13. INTERNACIONALIZAÇÃO (i18n) — PORTUGUÊS BRASIL

### Infraestrutura criada em `src/lib/i18n/`

| Arquivo | Propósito |
|---------|-----------|
| `types.ts` | Interface `TranslationDict` com ~1000+ keys tipadas |
| `provider.tsx` | `I18nProvider` + `useI18n()` hook + boot script anti-flash |
| `use-t.ts` | Re-export de `useI18n` como `useT` |
| `index.ts` | Barrel export |
| `supabase-errors.ts` | Mapeamento de erros Supabase → keys i18n |
| `dictionaries/en.ts` | Dicionário inglês (todas as keys) |
| `dictionaries/pt-BR.ts` | Dicionário português brasileiro |

### Como funciona
- **Provider** no `layout.tsx` envolvendo a árvore React
- **Boot script inline** (antes da hidratação) lê `localStorage` e define `html.lang`
- **Hook `useT()`** retorna `{ t, locale, setLocale }`
- **`t('key', { vars })`** resolve chaves aninhadas com interpolação de variáveis
- **`setLocale('pt-BR')`** persiste em localStorage e troca o dicionário instantaneamente

### Seletor de idioma
- Settings → Appearance → seção "Idioma / Language"
- Opções: **English** | **Português (Brasil)**
- Padrão: English (fallback se nenhum salvo)

### Resumo das alterações

| Categoria | Arquivos | Strings |
|-----------|----------|---------|
| **Infraestrutura** | 7 novos | — |
| **Auth** (login, signup, forgot-password) | 3 páginas | ~50 |
| **Layout** (sidebar, header, mode-toggle) | 3 componentes | ~35 |
| **Dashboard** (page, charts, activity, metrics) | 6 componentes | ~60 |
| **Inbox** (9 componentes) | 9 | ~120 |
| **Contacts** (page + 4 componentes) | 5 | ~90 |
| **Pipelines** (page + 5 componentes) | 6 | ~80 |
| **Broadcasts** (3 páginas + 4 steps) | 7 | ~110 |
| **Automations** (3 páginas + builder) | 4 | ~100 |
| **Flows** (3 páginas + 7 componentes) | 10 | ~200 |
| **Settings** (15 componentes) | 15 | ~250 |
| **Join page** (convite) | 1 | ~30 |
| **Library files** (status, templates, validate, presence, themes, currency, roles) | 12 | ~120 |
| **Toast strings** (20 arquivos) | 20 | ~90 |
| **Dashboard queries** (activity items, date-utils) | 2 | ~20 |
| **WhatsApp config** (toasts, placeholders, helpers, setup) | 1 | ~58 |
| **Template Manager** (toasts, placeholders, tooltips) | 1 | ~35 |
| **Total** | **~85 arquivos** | **~1000+ keys** |

### Dicionários
- **`en.ts`**: ~5000 linhas, todas as keys em inglês original
- **`pt-BR.ts`**: ~5000 linhas, todas as keys traduzidas para português brasileiro
- Ambos os dicionários têm a mesma estrutura de keys (mesmo número de chaves)

### Erros do Supabase traduzidos
- `"Invalid login credentials"` → `"Credenciais de login inválidas"`
- `"Email not confirmed"` → `"E-mail não confirmado"`
- `"Password should be at least 6 characters"` → `"Senha muito fraca"`
- `"A user with this email already exists"` → `"Já existe uma conta com este e-mail"`
- `"Too many requests"` → `"Muitas requisições"`
- `"NetworkError"` → `"Erro de rede"`

### Estrutura de keys
```
common.*               — Botões/labels compartilhados (cancel, save, delete...)
auth.login.*           — Página de login
auth.signup.*          — Página de cadastro
auth.forgotPassword.*  — Redefinição de senha
layout.sidebar.*       — Sidebar (navegação, funções, menu)
layout.header.*        — Header (títulos, menu)
dashboard.*            — Painel principal
inbox.*                — Caixa de entrada (9 submódulos)
contacts.*             — Contatos (form, detail, import, customFields)
pipelines.*            — Pipelines (board, cards, analytics)
broadcasts.*           — Transmissões (4 steps, detail)
automations.*          — Automações (builder, triggers, templates)
flows.*                — Fluxos (editor, canvas, config forms, NODE_META)
settings.*             — Configurações (10 abas, ~15 seções)
join.*                 — Página de convite
templateStatus.*       — Status de templates de mensagem
broadcastStatus.*      — Status de transmissões
automationTrigger.*    — Labels de triggers de automação
flowValidation.*       — Mensagens de validação de fluxos
presenceLabels.*       — Labels de presença (online, ausente...)
theme.*                — Nomes/taglines dos temas de cor
role.*                 — Nomes das funções (Owner, Admin...)
currency.*             — Nomes das moedas
activity.*             — Texto do feed de atividade
chart.*                — Labels dos gráficos do dashboard
dow.*                  — Dias da semana (Seg, Ter, Qua...)
toast.*                — Mensagens de toast (~90)
errors.*               — Erros Supabase + app
```

### Testes
- `npm run typecheck` — 0 erros ✅
- Servidor de dev — todas as rotas retornam 200 ✅
- Troca de idioma em Settings → Appearance → Language ✅
