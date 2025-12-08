# 🛒 Loja - Aplicação Angular

## **Visão Geral**

- **Descrição**: Projeto front-end em Angular para uma loja virtual simples com **CRUD de produtos** e **carrinho de compras**.
- **Tecnologias**: **Angular 17** (com Signals), **TypeScript**, **Tailwind CSS** (para estilização), Angular Material (componentes), PrimeNG (opcional).
- **Backend esperado**: API REST em `http://localhost:8080/v1/produtos` (Endpoints CRUD para Produtos).

---

## **Requisitos Funcionais (Mapeamento e Status)**

### **Módulo de Produtos (CRUD)**

| Funcionalidade                         | Status            | Pontos de Atenção / Detalhes                                                                                                                     |
| :------------------------------------- | :---------------- | :----------------------------------------------------------------------------------------------------------------------------------------------- |
| **Listagem**                           | **Implementado**  | Carga via `ProductService.getProducts()`. Componente: `src/app/pages/product/list-product/list-product.ts`.                                      |
| **Componente de Tabela Isolado**       | **A Implementar** | **Prioridade (Recomendação #3):** Criar `app-product-table` para desacoplar a lógica da tabela da listagem principal.                            |
| **Colunas / Formatação**               | **Implementado**  | Colunas obrigatórias: Nome / Preço / Cód. Barras. Preço formatado com `CurrencyPipe`.                                                            |
| **Ações (Editar/Excluir)**             | **Implementado**  | Edição navega para rota. Exclusão via modal (`src/app/components/modal/modal.ts`) que chama `ProductService.deleteProduct()` e atualiza a lista. |
| **Adicionar ao Carrinho na Listagem**  | **Parcial**       | O método `onAddToCart()` em `product-card` existe, mas precisa integrar-se ao novo **`CartService`**.                                            |
| **Cadastro / Edição (Reactive Forms)** | **Parcial**       | Falta de **validações (Validators)** obrigatórias (Requisito #4: Adicionar `Validators.required`, `Validators.min`, etc.).                       |

### **Módulo de Carrinho de Compras**

| Funcionalidade                            | Status               | Pontos de Atenção / Detalhes                                                                                                             |
| :---------------------------------------- | :------------------- | :--------------------------------------------------------------------------------------------------------------------------------------- |
| **Lógica de Estado (CartService)**        | **A Implementar**    | **Prioridade (Recomendação #1):** Criar `src/app/service/cart.service.ts` para gerenciar a lógica do carrinho.                           |
| **Persistência (LocalStorage)**           | **A Implementar**    | **Prioridade (Recomendação #1):** O `CartService` deve implementar a lógica para **salvar e carregar** o carrinho do **`LocalStorage`**. |
| **Prevenção de Duplicidade / Quantidade** | **A Implementar**    | O `CartService` deve gerenciar a lógica de incrementar a quantidade de um item existente.                                                |
| **Página do Carrinho**                    | **Estrutura Pronta** | **Prioridade (Recomendação #5):** `src/app/pages/cart/cart.ts` sem listagem, total ou lógica de remoção de itens.                        |
| **Header/Menu com Contador**              | **A Implementar**    | O `header.ts` precisa se inscrever no `CartService` (via `signal`/`BehaviorSubject`) para exibir o número de itens.                      |

---

## **Requisitos Técnicos (Avaliação e Arquitetura)**

### **Arquitetura de Services**

- **`ProductService`**: Implementado e seguindo as boas práticas com chamadas HTTP para o CRUD.
- **`CartService`**: **Ausente/Prioritário.** Necessária a criação de `src/app/service/cart.service.ts` para isolar toda a lógica de estado do carrinho (adição, remoção, total e persistência).

### **Boas Práticas e Tipagem**

- **Interface `Product`**: Implementada em `src/app/models/product.model.ts` (Excelente uso de tipagem, evitando `any`).
- **Padrão de Estado**: Uso de **Angular Signals** já em alguns componentes (bom para Angular 17), mas precisa ser aplicado no **`CartService`** para um gerenciamento de estado reativo e eficiente.
- **Estilização**: Uso de **Tailwind CSS** (confirme a configuração no `angular.json` ou `tailwind.config.js`).

---

## **Como Rodar (Desenvolvimento)**

### **Pré-requisitos**

- Node.js + npm instalados.
- Backend REST API disponível (Ex: `http://localhost:8080`).
- **Angular CLI 17+**.

### **Comandos de Execução**

1.  **Instalar dependências**:

    ```powershell
    cd <caminho_do_projeto>
    npm install
    ```

2.  **Iniciar aplicação**:

    ```powershell
    npm start
    # ou
    ng serve
    ```

3.  **Abrir no navegador**: `http://localhost:4200`

---

## **Recomendações / Próximos Passos (Priorizados para o e-commerce)**

1.  ### 🛒 **Implementar `CartService` com LocalStorage**

    - Criar o `CartService` (`src/app/service/cart.service.ts`).
    - Definir um **`signal`** ou **`BehaviorSubject`** para o estado do carrinho.
    - Implementar métodos: `addItem()`, `removeItem()`, `getItems()`, `getTotal()`, e especialmente, **`saveToStorage()`** e **`loadFromStorage()`** (para persistência no _`LocalStorage`_).

2.  ### 🔗 **Integrar Adição ao Carrinho**

    - Corrigir o `onAddToCart()` em `ProductCard` para chamar o novo **`CartService.addItem()`**.
    - No **Header**, subscrever o _signal_ do carrinho para atualizar o contador de itens em tempo real.

3.  ### ✅ **Adicionar Validações no Formulário**

    - Em `create-edit-product.ts`, aplicar **`Validators.required`** e validações numéricas (ex: `Validators.min(0.01)`) para Nome, Preço e Cód. Barras.

4.  ### 📝 **Implementar Página do Carrinho**

    - Em `cart.ts` / `cart.html`, exibir os itens do carrinho (usando o _signal_ do `CartService`), permitir remoção de itens e ajuste de quantidade, e exibir o valor total dinâmico.

5.  **Extrair Tabela de Produtos** (Opcional, mas boa prática): Criar um componente isolado (`app-product-table`) para maior reutilização e clareza.

---

## **Comandos Úteis do Angular CLI**

- **Gerar novo componente**: `ng generate component components/novo-componente`
- **Gerar novo Service**: `ng generate service service/novo-service`
- **Build de Produção**: `ng build` (artefatos em `dist/`)
- **Executar testes unitários (Vitest)**: `ng test`
