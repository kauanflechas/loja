export interface Product {
  id: number;
  nome: string;
  descricao: string;
  preco: number;
  desconto?: number;
  quantidade: number;
  imagemUrl?: string;
  sku: string;
  categoriaId: number;
  ativo: boolean;
}

export interface ProdutoRequest {
  nome: string;
  descricao: string;
  preco: number;
  sku: string;
  categoriaId: number;
  ativo: boolean;

}

export interface CreateProduct {

  produto: ProdutoRequest;
  quantidade: number;

}