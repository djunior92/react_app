import React, { useState } from "react";
import "../css/Post.css";
import { ListaComentarioComponent } from "./Comentarios";
import PostagemApi from "../api/PostagemApi";



export class Postagens extends React.Component {

  state = {
    postagens: [],
    exibirComentario: false
  };

  componentDidMount() {
    this.listaPosts();
  }

  avaliar(codigo, type) {
    this.updatePost(codigo, type);
  };

  listaPosts = async => {
    PostagemApi.getAll().then((result) => {
      this.setState({ postagens: result.data });
    }).catch((erro) => {
      alert("Erro: " + erro);
    });
  }

  updatePost(codigo, type) {
    PostagemApi.avaliar(codigo, type).then((result) => {
      //window.location.reload();
      this.listaPosts();
    }).catch((erro) => {
      console.error('Erro encontado:', erro);
    });
  }


  render() {
    return (
      <>
        <div className="card-title ">
          {this.state.postagens && this.state.postagens.map((p) => (
            <div key={p.codigo}>
              <div class="card">
                <div class="card-header">
                  <h5 className="post--titulo">{p.titulo}</h5>
                  <div className="post--curtida">
                    <button type="button" class="btn btn-primary" onClick={() => this.avaliar(p.codigo, "+")}>
                      Curtir
                      </button>
                    <button type="button" class="btn btn-danger" onClick={() => this.avaliar(p.codigo, "-")}>
                      Não Curtir
                      </button>
                    <h6 className="post--curtidas">
                      curtidas: {p.curtidas}  / descurtidas: {p.descurtidas}
                    </h6>
                  </div>
                </div>

                <div class="card-body">
                  <h5 class="card-title">{p.texto}</h5>
                  <p class="card-text">{p.data}</p>
                  <button
                    type="button"
                    class="btn btn-secondary"
                    onClick={() => this.setState({ exibirComentario: true })}>
                    {!this.exibirComentario ? "Exibir" : "Ocultar"} Comentários
                    </button>
                </div>
                {this.state.exibirComentario && (
                  <div className="col-md-10">
                    <ListaComentarioComponent
                      codigo={p.codigo}
                    ></ListaComentarioComponent>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </>
    );
  }
};




