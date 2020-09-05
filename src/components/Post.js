import React, { useState } from "react";
import "../css/Post.css";
import { ListaComentarioComponent } from "./Comentarios";

export class Post extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      exibirComentario: true,
    };
  }

  mudarStatusExibirComentarios = () => {
    this.setState({
      exibirComentario: !this.state.exibirComentario,
    });
  };

  render() {
    return (
      <>
        <div class="card-body">
          <h5 class="card-title">{this.props.post.texto}</h5>
          <p class="card-text">{this.props.post.data}</p>
          <button
            type="button"
            class="btn btn-secondary"
            onClick={() => this.mudarStatusExibirComentarios()}
          >
            {!this.state.exibirComentario ? "Exibir" : "Ocultar"} Comentários
          </button>
        </div>
        {this.state.exibirComentario && (
          <div className="col-md-10">
            <ListaComentarioComponent
              codigo={this.props.post.codigo}
            ></ListaComentarioComponent>
          </div>
        )}
      </>
    );
  }
}
