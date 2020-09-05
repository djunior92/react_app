import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PostagemApi from "../api/PostagemApi";
import { toast } from "react-toastify";

function PostagemAdd({ history }) {

  const [postagem, setPostagem] = useState({
    Titulo: "",
    Texto: "",
  });


  useEffect(() => {
  }, []);



  function submitForm(event) {
    event.preventDefault();
    PostagemApi.add(postagem)
      .then((response) => {
        history.push("/postagens");
        toast.success("Postagem adicionada com sucesso.");
      })

      .catch((erro) => {
        alert("Erro: " + erro);
      });

  }


  function changeHandler(event) {
    setPostagem({ ...postagem, [event.target.name]: event.target.value });
  }

  return (
    <div className="container">
      <form className="form" onSubmit={submitForm}>
        <div className="form-group">
          <label htmlFor="titulo">Título</label>
          <input
            type="text"
            name="titulo"
            className="form-control"
            value={postagem.titulo}
            onChange={changeHandler}
          />

        </div>
        <div className="form-group">
          <label htmlFor="texto">Texto</label>
          <input
            type="text"
            name="texto"
            className="form-control"
            value={postagem.texto}
            onChange={changeHandler}
          />
        </div>


        <div>
          <button type="submit" className="btn btn-primary">
            Confirmar
          </button>
          <Link to="/postagens"> Cancelar</Link>
        </div>
      </form>
    </div>
  );
}

export default PostagemAdd;
