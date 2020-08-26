import React from "react";
import Sobre from "./components/Sobre";
import Cabecalho from "./components/Cabecalho";
import ProdutoEdit from "./components/ProdutoEdit";
import PostagemEdit from "./components/PostagemEdit";
import ProdutoListaFuncao from "./components/ProdutoListaFuncao";
import PostagemListaFuncao from "./components/PostagemListaFuncao";
import PaginaPrincipal from "./components/PaginaPrincipal";
import PaginaNaoEncontrada from "./components/PaginaNaoEncontrada";
import GlobalStyles from "./GlobalStyles";
import { Route, Switch, NavLink, Redirect } from "react-router-dom";
import ProdutoDetalhe from "./components/ProdutoDetalhe";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

class App extends React.Component {
  state = {
    titulo: "",
  };

  componentWillMount() {
    this.setState({ titulo: this.props.titulo });
  }

  render() {
    return (
      <>
        <ToastContainer />
        <GlobalStyles />
        <Cabecalho cor="#73C2F6">
          <em>{this.state.titulo}</em>
        </Cabecalho>
        <ul className="nav nav-tabs">
          <NavLink className="nav-link" activeClassName="active" exact to="/">
            Home
          </NavLink>
          <NavLink className="nav-link" activeClassName="active" to="/produtos">
            Produtos
          </NavLink>
          <NavLink className="nav-link" activeClassName="active" to="/sobre">
            Sobre
          </NavLink>
          <NavLink className="nav-link" activeClassName="active" to="/postagens">
            Postagens
          </NavLink>
        </ul>
        <Switch>
          <Route path="/" exact component={PaginaPrincipal}></Route>
          <Redirect from="/lista-produtos" to="/produtos"></Redirect>
          <Route path="/produtos" component={ProdutoListaFuncao}></Route>
          <Route path="/produto/novo" component={ProdutoEdit}></Route>
          <Route path="/produto/:codigo" component={ProdutoEdit}></Route>
          <Route path="/postagens" component={PostagemListaFuncao}></Route>
          <Route path="/postagem/novo" component={PostagemEdit}></Route>
          <Route
            path="/produto/detalhe/:codigo"
            component={ProdutoDetalhe}
          ></Route>
          <Route path="/sobre" component={Sobre}></Route>
          <Route component={PaginaNaoEncontrada}></Route>
        </Switch>
      </>
    );
  }
}

export default App;
