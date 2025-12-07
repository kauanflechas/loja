# Loja - Aplicação Angular

## **Visão Geral**
- **Descrição**: Projeto front-end em Angular para uma loja simples com CRUD de produtos e um carrinho de compras.
- **Tecnologias**: Angular 21, Angular Material, PrimeNG (opcional), TypeScript.
- **Backend esperado**: API REST em `http://localhost:8080/v1/produtos` (não fornecida aqui).

## **Requisitos Funcionais (mapeamento)**

- **Módulo de Produtos (CRUD)**
  - **Listagem**: Implementado — os produtos são carregados da API usando `ProductService.getProducts()`; componente principal: `src/app/pages/product/list-product/list-product.ts`.
  - **Componente de Tabela isolado**: Parcial/Não implementado — a listagem usa `MatTable` dentro do próprio componente `ListProduct`. Não existe um componente separado que receba os dados via `@Input()` (arquivo a revisar para criar: `src/app/components/`).
  - **Colunas obrigatórias**: Nome / Preço / Cód. Barras — a tabela define colunas `['nome','preco','acoes']` em `list-product.ts`. Formatação de preço é feita via `CurrencyPipe` no template (ver `list-product.html`).
  - **Ações (Editar/Excluir)**: Implementado — botão Editar navega para rota de edição; Exclusão abre um modal (`src/app/components/modal/modal.ts`) que chama `ProductService.deleteProduct()` e, ao fechar, a lista é atualizada.
  - **Adicionar ao Carrinho na listagem**: Parcial — existe um componente `app-product-card` (`src/app/components/product-card/product-card.ts`) com um método `onAddToCart()` definido, porém sem implementação.
  - **Cadastro / Edição (Reactive Forms)**: Parcial — o formulário de criação/edição usa `FormGroup` e `FormControl` em `src/app/pages/product/create-edit-product/create-edit-product.ts`, mas não há validações (`Validators`) aplicadas nos controles (validação obrigatória/tipo numérico ainda não implementada).
  - **Exclusão via API e atualização visual**: Implementado — `Modal.confirm()` usa `ProductService.deleteProduct()` e `ListProduct` recarrega a lista ao fechar o modal.

- **Módulo de Carrinho de Compras**
  - **Lógica de Estado (CartService)**: Não implementado — não foi encontrado um `CartService` em `src/app/service/`. O componente de cartão (`product-card`) tem um `onAddToCart()` vazio.
  - **Persistência (LocalStorage)**: Não implementado — atualmente não há lógica para salvar/ler carrinho no `LocalStorage`.
  - **Prevenção de duplicidade / controle de quantidade / preço negativo**: Não implementado.
  - **Página do Carrinho**: Estrutura presente: `src/app/pages/cart/cart.ts`, porém sem implementação da listagem, total ou remoção de itens.
  - **Header/Menu com contador de itens**: Header existe (`src/app/components/header/header.ts`) mas não exibe contador do carrinho — falta integração com um serviço de estado.

## **Requisitos Técnicos (avaliação)**

- **Arquitetura de Services**
  - **`ProductService`**: Implementado em `src/app/service/product.service.ts`. Realiza chamadas HTTP: `getProducts`, `getProductById`, `createProduct`, `editProduct`, `deleteProduct`.
  - **`CartService`**: Ausente — recomenda-se criar `src/app/service/cart.service.ts` para separar a lógica do carrinho do UI.

- **Boas Práticas e Tipagem**
  - **Interface `Product`**: Implementada em `src/app/models/product.model.ts` (bom uso de tipagem — evita `any`).
  - **Código**: Organização razoável e uso de sinais (`signal`) em alguns componentes; falta de validações nos forms e lógica de carrinho no service.

## **Como Rodar (desenvolvimento)**

- **Pré-requisitos**: Node.js + npm instalados; backend disponível em `http://localhost:8080` conforme end-point usado no `ProductService`.
- **Instalar dependências**:
```powershell
cd c:\Users\kauan\Downloads\JAVA\loja
npm install
```
- **Iniciar aplicação**:
```powershell
npm start
# ou
ng serve
```
- **Abrir no navegador**: `http://localhost:4200`

## **Arquivos e pontos de interesse**

- **ProductService**: `src/app/service/product.service.ts` — chamadas HTTP CRUD.
- **Listagem de produtos**: `src/app/pages/product/list-product/list-product.ts` e `list-product.html` — tabela e ações.
- **Modal de exclusão**: `src/app/components/modal/modal.ts` — confirma exclusão e invoca `ProductService.deleteProduct()`.
- **Formulário criar/editar**: `src/app/pages/product/create-edit-product/create-edit-product.ts` — FormGroup/FormControl, sem validators.
- **Componente de cartão**: `src/app/components/product-card/product-card.ts` — `onAddToCart()` precisa de implementação.
- **Página do carrinho**: `src/app/pages/cart/cart.ts` — arquivo presente, sem lógica.
- **Header**: `src/app/components/header/header.ts` — sem contador do carrinho.

## **Recomendações / Próximos Passos (priorizados)**

1. **Criar `CartService`** (`src/app/service/cart.service.ts`):
   - Métodos: `addItem(product: Product)`, `removeItem(productId: number)`, `getItems()`, `getTotal()`, `saveToStorage()`, `loadFromStorage()`.
   - Persistir em `localStorage` e usar um `BehaviorSubject`/`signal` para emitir mudanças para componentes (header, cart page).

2. **Implementar `onAddToCart()` em `ProductCard`** para usar `CartService.addItem()` e atualizar contador no `Header`.

3. **Extrair componente de Tabela** (opcional, mas conforme requisito):
   - Criar `src/app/components/product-table/product-table.ts` que receba `@Input() products: Product[]` e `@Output()` para eventos (edit, delete, add-to-cart).

4. **Adicionar validações no formulário** (`Validators.required`, `Validators.min`, `Validators.pattern`) em `create-edit-product.ts` e mostrar mensagens de erro no template.

5. **Implementar página do Carrinho** (`cart.ts` / `cart.html`): listar itens, permitir remover, ajustar quantidade, e mostrar total dinâmico.

6. **Testes e lint**: adicionar testes unitários para `ProductService` e `CartService`, e checar console para warnings/erros.

## **Observações**

- O backend esperado deve aceitar os formatos definidos em `src/app/models/product.model.ts` (veja `CreateProduct` e `ProdutoRequest`).
- Alguns componentes importam Material/PrimeNG; confirme configurações de módulo caso surjam erros de provider/import.

---
Se quiser, eu posso:
- Implementar o `CartService` e integrar o `product-card` e `header` para o contador; ou
- Extrair a tabela para um componente isolado com `@Input()`/`@Output()`; ou
- Adicionar validações ao formulário de criação/edição.

Indique qual ação deseja que eu faça a seguir.
# Loja

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 21.0.1.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Vitest](https://vitest.dev/) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
