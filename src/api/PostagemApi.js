import Axios from "axios";

class PostagemApi {
  static baseUrl = "http://localhost:8888";

  static getAll() {
    return Axios.get(`${this.baseUrl}/postagens`);
  }

  static getByCodigo(codigo) {
    return Axios.get(`${this.baseUrl}/postagem/${codigo}`);
  }

  static add(postagem) {
    return Axios.post(`${this.baseUrl}/postagem`, postagem);
  }

  static avaliar(codigo, type) {
    return Axios.put(`${this.baseUrl}/attpost/${codigo}/${type}`);
  }
}

export default PostagemApi;
