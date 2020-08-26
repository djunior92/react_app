import React, { useState, useEffect } from "react";
import PostagemApi from "../api/PostagemApi";
import { Titulo } from "../Styles";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

function PostagemListaFuncao({ history }) {
  const [postagens, setPostagens] = useState(undefined);
  const [postagemSelecionada, setPostagemSelecionada] = useState(undefined);

  useEffect(() => {
    var promise = PostagemApi.getAll();
    promise
      .then((response) => {
        setPostagens(response.data);
      })
      .catch((error) => {
        toast.error("Erro: " + error);
      });

    return () => {
    };
  }, []);

  function selecionarPostagem(postagem) {
    setPostagemSelecionada(postagem);
  }

  function getPostagemStyle(postagem) {
    if (postagem === postagemSelecionada)
      return {
        backgroundColor: "#73C2F6",
      };

    return undefined;
  }




  return (
    <>
      <Titulo>Lista de Postagens</Titulo>
      {postagens && (
        <>
          <div>
            <Link class="btn btn-primary" to="/postagem/novo">
              Novo
            </Link>

          </div>
          <table className="table">
            <thead>
              <tr>
                <th>Código</th>
                <th>Data</th>
                <th>Título</th>
                <th>Texto</th>
                <th>Curtidas</th>
              </tr>
            </thead>
            <tbody>
              {postagens.map((p) => (
                <tr
                  key={p.codigo}
                  onClick={() => selecionarPostagem(p)}
                  style={getPostagemStyle(p)}
                >
                  <td>{p.codigo}</td>
                  <td>{p.data}</td>
                  <td>{p.titulo}</td>
                  <td>{p.texto}</td>
                  <td>
                    {p.curtidas == null ? '0' : p.curtidas}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}


    </>
  );
}

export default PostagemListaFuncao;
