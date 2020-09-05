import React, { useState } from "react";
import "../css/Post.css";
import { ListaComentarioComponent } from "./Comentarios";
import PostagemApi from "../api/PostagemApi";
import { Post } from "./Post";

export class Postagens extends React.Component {
  state = {
    postagens: [],
  };

  mudarStatusExibirComentarios = () => {
    this.setState({
      exibirComentario: !this.state.exibirComentario,
    });
  };

  componentDidMount() {
    this.listaPosts();
  }

  avaliar(codigo, type) {
    this.updatePost(codigo, type);
  }

  listaPosts = (async) => {
    PostagemApi.getAll()
      .then((result) => {
        this.setState({ postagens: result.data });
      })
      .catch((erro) => {
        alert("Erro: " + erro);
      });
  };

  updatePost(codigo, type) {
    PostagemApi.avaliar(codigo, type)
      .then((result) => {
        //window.location.reload();
        this.listaPosts();
      })
      .catch((erro) => {
        console.error("Erro encontado:", erro);
      });
  }

  render() {
    return (
      <>
        <div className="card-title ">
          {this.state.postagens &&
            this.state.postagens.map((p) => (
              <div key={p.codigo}>
                <div class="card">
                  <div class="card-header">
                    <h3 className="post--titulo">{p.titulo}</h3>
                    <div className="post--curtida">
                      <button
                        type="button"
                        class="btn btn-primary"
                        onClick={() => this.avaliar(p.codigo, "+")}
                      >
                        Curtir
                      </button>
                      <button
                        type="button"
                        class="btn btn-danger"
                        onClick={() => this.avaliar(p.codigo, "-")}
                      >
                        Não Curtir
                      </button>
                      <h6 className="post--curtidas">
                        curtidas: {p.curtidas} / descurtidas: {p.descurtidas}
                      </h6>
                    </div>
                  </div>

                  <Post post={p}></Post>
                </div>
              </div>
            ))}
        </div>
      </>
    );
  }
}
