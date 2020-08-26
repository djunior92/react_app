import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PostagemApi from "../api/PostagemApi";
import { toast } from "react-toastify";

function PostagemEdit({ history, match }) {
  const [isEdit, setIsEdit] = useState(false);
  const [errors, setErrors] = useState({});

  const [postagem, setPostagem] = useState({
    Titulo: "",
    Texto: "",
  });


  useEffect(() => {
    if (match) {
      setIsEdit(true);
      let codigoPostagem = +match.params.codigo;
      PostagemApi.getByCodigo(codigoPostagem).then((response) => {
        setPostagem(response.data);
      });
    }

  }, []);

  function submitForm(event) {
    event.preventDefault();

    PostagemApi.add(postagem)
      .then((response) => {
        history.push("/postagens");
        toast.success("Postagem adicionado com sucesso.");
      })

      .catch((error) => {
        toast.error(`Erro: ${error}`);
      });

  }


  function changeHandler(event) {
    setErrors({});
    switch (event.target.name) {
      case "nome":
        if (event.target.value.length === 0)
          setErrors({ nome: "Nome é obrigatório" });
        break;
      default:
    }

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

export default PostagemEdit;
