export interface Product {
  id: number;
  nome: string;
  descricao: string;
  preco: number;
  desconto?: number;
  quantidade: number;
  imagem?: string;
  codigoBarras: string;
  sku: string;
  categoriaId: number;
  categoriaNome?: string;
  ativo: boolean;
}

export interface ProdutoRequest {
  nome: string;
  descricao: string;
  preco: number;
  sku: string;
  categoriaId: number;
  ativo: boolean;
  quantidade: number | null | undefined;
  imagem: string;
  codigoBarras: string;
}

export interface CreateProduct {

  produto: ProdutoRequest;
  quantidade: number;

}
