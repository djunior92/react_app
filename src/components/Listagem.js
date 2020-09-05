import React, { useEffect } from "react";
import "../css/Listagem.css";
import { Postagens } from "./Postagens";


function ListagemFuncao({ history }) {

  useEffect(() => {
    return () => { };
  }, []);





  return (
    <>
      <div className="card-header">
        <h3 className="card-title">Lista de Postagens</h3>
      </div>

      <div className="postagem-lista--new">
        <a href={`/postagem/novo`} className="postagem-lista--buttonnew">
          + Nova Postagem
        </a>
      </div>

      <div className="container container">
        <div className="card-title ">


          <Postagens></Postagens>

        </div>
      </div>
    </>
  );
}

export default ListagemFuncao;
