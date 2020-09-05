import React from "react";
import ComentarioApi from "../api/ComentarioApi";
import { toast } from "react-toastify";

export class ListaComentarioComponent extends React.Component {
  state = {
    texto: "",
    comentarios: [],
  };

  componentDidMount() {
    this.getComments();
  }

  setComentario(event) {
    this.setState({ texto: event.target.value });
  }

  postComment() {
    var obj = {
      texto: this.state.texto,
      codigopostagem: this.props.codigo,
    };

    ComentarioApi.add(obj)
      .then((result) => {
        toast.success("Comentário adicionado com sucesso.");
        this.getComments();
      })
      .catch((erro) => {
        alert("erro: " + erro);
      });
  }

  getComments = (async) => {
    if (this.props.codigo && this.props.codigo !== "") {
      ComentarioApi.getAll(this.props.codigo)
        .then((comentarios) => {
          this.setState({ comentarios: comentarios.data });
        })
        .catch((erro) => {
          alert("erro: " + erro);
        });
    }
  };

  render() {
    return (
      <>
        <div className="row">
          <div className="offset-md-2 col-md-10">
            <div className="card">
              <div className="card-header">
                <h5 className="card-title">Comentários</h5>
              </div>

              {this.state.comentarios &&
                this.state.comentarios.map((c) => (
                  <div key={c.codigo}>
                    <div className="card">
                      <div className="card-body">
                        <p className="card-text">
                          <th>
                            <h5 class="card-title">{c.texto}</h5>
                          </th>
                          {c.data}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}

              <div className="row">
                <div className="col-md-12">
                  <div className="card">
                    <div className="card-body">
                      <div className="form-group">
                        <textarea
                          className="form-control"
                          id="novo-comentario"
                          value={this.state.texto}
                          onChange={(event) => this.setComentario(event)}
                        ></textarea>
                      </div>
                      <button
                        className="btn btn-primary"
                        type="button"
                        onClick={(event) => this.postComment()}
                      >
                        Comentar
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}
