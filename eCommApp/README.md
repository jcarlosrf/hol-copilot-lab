# Guia de Início Rápido

## Sobre o projeto

The Daily Harvest é uma loja virtual construída com React, TypeScript e Vite. A interface usa React Router para navegar entre páginas, e o estado do carrinho é compartilhado por meio de um contexto React.

## Pré-requisitos

- Node.js e npm.
- O README atual declara Node.js 18 ou superior. Como o projeto usa `jsdom` 27 nos testes, Node.js 20 ou superior pode ser necessário para executar toda a suíte. Se houver erros relacionados à versão do Node, confira os requisitos das dependências instaladas.

## Configuração local

Abra um terminal na pasta `eCommApp` e execute:

```bash
npm install
npm run dev
```

O Vite abre o navegador automaticamente. O endereço configurado é `http://localhost:3000`.

## Comandos principais

Execute os comandos dentro de `eCommApp`:

| Comando | Para que serve |
| --- | --- |
| `npm run dev` | Inicia o servidor de desenvolvimento. |
| `npm run build` | Verifica os tipos TypeScript e gera a versão de produção em `dist/`. |
| `npm run preview` | Serve localmente a versão de produção gerada por `build`. |
| `npm run lint` | Executa o ESLint nos arquivos TypeScript e TSX. |
| `npm run test` | Inicia o Vitest em modo interativo. |
| `npm run test:run` | Executa os testes uma vez, sem modo interativo. |
| `npm run test:ui` | Abre a interface visual do Vitest. |
| `npm run test:coverage` | Executa os testes e gera relatório de cobertura. |

## Estrutura e arquivos importantes

- `src/main.tsx`: ponto de entrada; monta o React, o roteador e os estilos globais.
- `src/App.tsx`: define as rotas e envolve a aplicação com `CartProvider`.
- `src/components/`: páginas e componentes da interface. As rotas atuais incluem `/`, `/products`, `/login`, `/admin` e `/cart`.
- `src/context/CartContext.tsx`: estado compartilhado do carrinho e operações para adicionar itens e limpar o carrinho.
- `src/types/index.ts`: tipos centrais, como `Product`, `User`, `Address` e `Review`.
- `src/utils/helpers.ts`: funções utilitárias, incluindo formatação de preços, cálculo do total e validação de e-mail.
- `public/products/`: arquivos JSON do catálogo e imagens dos produtos.
- `src/test/setup.ts`: configuração global dos testes.
- `src/components/CartPage.test.tsx`: exemplo de teste de componente com Vitest e React Testing Library.
- `vite.config.ts`: configuração do servidor, build e testes.
- `tsconfig.json`: configuração do TypeScript, incluindo modo estrito.
- `index.html`: documento HTML inicial e título da aplicação.
- `package.json`: dependências e scripts disponíveis.

## Fluxo recomendado para uma alteração

1. Identifique a página ou o componente relacionado à mudança em `src/components/`.
2. Consulte os tipos em `src/types/index.ts` e, para comportamentos compartilhados do carrinho, `src/context/CartContext.tsx`.
3. Faça a alteração e execute os testes relevantes com `npm run test:run`.
4. Antes de finalizar, valide o projeto com `npm run lint` e `npm run build`.
