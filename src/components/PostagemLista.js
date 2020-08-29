import React, { useState, useEffect } from "react";
import PostagemApi from "../api/PostagemApi";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { ListaComentarioComponent } from "./Comentarios";

function PostagemListaFuncao({ history }) {
  const [postagens, setPostagens] = useState(undefined);


  useEffect(() => {
    var promise = PostagemApi.getAll();
    promise.then((response) => {
      setPostagens(response.data);
    }
    ).catch((erro) => {
      toast.erro("Erro: " + erro);
    });

    return () => {
    };
  }, []);



  return (
    <>

      <p><Link class="btn btn-primary" to="/postagem/novo">
        + Nova Postagem
        </Link>
      </p>
      <div className="card-header">
        <h3 className="card-title">Lista de Postagens</h3>
      </div>
      <div className="container container">

        <div className="card-title ">

          {postagens && postagens.map((p) => (
            <div key={p.codigo}>
              <div className="card-body">
                <button className="btn btn-primary" type="button">Visualizar</button>
                <p className="card-title"><h5>{p.titulo}</h5></p>
                <p className="card-text">{p.texto}</p>
                {/*<button className="btn btn-primary" type="button">Curtir {p.curtidas}</button>*/}
              </div>
              <div className="card-footer">
                {p.data}
              </div>
              <ListaComentarioComponent codigo={p.codigo}></ListaComentarioComponent>
            </div>
          ))}

        </div>
      </div>
    </>

  );


}

export default PostagemListaFuncao;
