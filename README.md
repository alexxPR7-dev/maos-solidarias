# Mãos Solidárias

Plataforma web (Single Page Application) para uma ONG fictícia do terceiro setor, desenvolvida em **HTML5 semântico, CSS3 e JavaScript puro** (sem frameworks). O site apresenta a ONG, divulga projetos sociais, explica como doar e permite o cadastro de voluntários.

## Funcionalidades

- Navegação de página única por hash (`#/inicio`, `#/projetos`, `#/cadastro`), com página 404.
- Menu responsivo: dropdown no desktop e menu hambúrguer no celular (CSS puro).
- Templates dinâmicos em JavaScript (cartões, badges e modal gerados a partir de dados).
- Formulário de cadastro com máscaras (CPF, telefone, CEP) e validação com feedback em tempo real.
- Persistência no `localStorage`: cadastros e rascunho do formulário.
- Componentes de feedback: badges, alertas, modal (`dialog`) e toast.
- Design System com variáveis CSS, Grid de 12 colunas, Flexbox e 5 breakpoints.
- Acessibilidade: HTML semântico, ARIA, foco visível e `prefers-reduced-motion`.

## Estrutura de pastas

```
maos-solidarias/
├── html/
│   └── index.html          # shell da SPA (cabeçalho, menu, main#app, rodapé)
├── css/
│   └── estilo.css          # Design System, layout, componentes e media queries
├── imagens/
│   ├── voluntarios.jpg
│   └── voluntarios.webp
├── js/
│   ├── main.js             # ponto de entrada
│   └── modules/
│       ├── dados.js        # dados da aplicação
│       ├── templates.js    # geração de HTML (Template Literals)
│       ├── mascaras.js     # máscaras de CPF, telefone e CEP
│       ├── validacao.js    # regras e feedback de validação
│       ├── storage.js      # acesso ao localStorage
│       ├── ui.js           # toast e modal
│       ├── cadastro.js     # lógica do formulário
│       └── router.js       # roteamento por hash
└── README.md
```

## Como executar

1. Baixe ou clone o repositório.
2. Abra o arquivo `html/index.html` no navegador (duplo clique). Não é necessário servidor nem instalação de dependências.

## Tecnologias

HTML5, CSS3 (variáveis, Grid, Flexbox), JavaScript (ES6+), Web Storage API e Constraint Validation API.

## Estratégia de versionamento (GitFlow)

| Branch | Finalidade |
|---|---|
| `main` | Versões de lançamento, marcadas com tags (`v1.0.0`, `v1.0.1`) |
| `develop` | Código de desenvolvimento constante, onde as features são integradas |
| `feature/*` | Novas funcionalidades, criadas a partir de `develop` |
| `release/*` | Preparação de uma versão, criada a partir de `develop` |
| `hotfix/*` | Correções urgentes, criadas a partir de `main` |

### Convenção de commits (semânticos)

`tipo(escopo): descrição`, com os tipos `feat`, `fix`, `docs`, `style`, `refactor` e `chore`. Exemplo: `feat(router): add hash-based navigation`.

## Licença

Projeto acadêmico, sem fins comerciais.
