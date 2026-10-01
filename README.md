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

## Tecnologias

| Área | Tecnologia | Uso no projeto |
|---|---|---|
| Marcação | HTML5 semântico | `header`, `nav`, `main`, `section`, `article`, `footer`, `dialog` |
| Estilo | CSS3 | Variáveis, Grid de 12 colunas, Flexbox, media queries, transições |
| Lógica | JavaScript (ES6+) | Roteador por hash, templates com Template Literals, event delegation |
| Validação | Constraint Validation API | Regras de campos e mensagens de erro |
| Armazenamento | Web Storage API (`localStorage`) | Cadastros e rascunho em JSON |
| Versionamento | Git, GitHub e GitFlow | Branches, pull requests, issues e releases |

## Pré-requisitos

- Um navegador moderno e atualizado (Chrome, Edge, Firefox ou Safari).
- Opcional, para clonar o repositório: [Git](https://git-scm.com).

Não é necessário Node.js, servidor web nem banco de dados.

## Instalação e execução local

1. Clone o repositório (ou baixe o ZIP pelo botão **Code** do GitHub e extraia):
   ```bash
   git clone https://github.com/alexxPR7-dev/maos-solidarias.git
   ```
2. Entre na pasta do projeto:
   ```bash
   cd maos-solidarias
   ```
3. Abra o arquivo `html/index.html` no navegador (duplo clique).

O projeto **não possui dependências** para instalar (sem `npm install`), porque usa apenas JavaScript puro. Os scripts são carregados em ordem pelo `index.html`, por isso o site funciona direto pelo protocolo `file://`.

## Build e testes

- **Build:** não há etapa de build. Os arquivos são servidos exatamente como estão, sem bundler ou transpilação.
- **Testes:** não há testes automatizados. A verificação é manual no navegador:
  - navegar pelas três rotas e por uma rota inexistente (página 404);
  - redimensionar a janela nas larguras 480, 768, 992, 1200 e 1400 px;
  - enviar o formulário vazio, com CPF inválido e com dados válidos;
  - recarregar a página e conferir a restauração do rascunho e dos cadastros salvos;
  - validar o `html/index.html` no [W3C Validator](https://validator.w3.org).

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

## Estratégia de versionamento (GitFlow)

| Branch | Finalidade |
|---|---|
| `main` | Versões de lançamento, marcadas com tags (`v1.0.0`, `v1.0.1`) |
| `develop` | Código de desenvolvimento constante, onde as features são integradas |
| `feature/*` | Novas funcionalidades, criadas a partir de `develop` |
| `release/*` | Preparação de uma versão, criada a partir de `develop` |
| `hotfix/*` | Correções urgentes, criadas a partir de `main` |

As integrações em `main` e `develop` são feitas por **pull requests**, ligados a **issues** e **milestones** (`v1.0.0` e `v1.0.1`). As versões seguem o **Versionamento Semântico** (MAJOR.MINOR.PATCH).

### Convenção de commits (Conventional Commits)

`tipo(escopo): descrição`, com os tipos `feat`, `fix`, `docs`, `style`, `refactor` e `chore`. Exemplo: `feat(router): add hash-based navigation`.

## Licença

Projeto acadêmico, sem fins comerciais.
