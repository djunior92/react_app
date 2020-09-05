import React from "react";
import Cabecalho from "./components/Cabecalho";
import NovaPostagem from "./components/NovaPostagem";
import ListagemFuncao from "./components/Listagem";
import PaginaPrincipal from "./components/PaginaPrincipal";
import GlobalStyles from "./GlobalStyles";
import { Route, Switch, NavLink } from "react-router-dom";
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
          <NavLink className="nav-link" activeClassName="active" to="/postagens">
            Postagens
          </NavLink>
        </ul>
        <Switch>
          <Route path="/" exact component={PaginaPrincipal}></Route>
          <Route path="/postagens" component={ListagemFuncao}></Route>
          <Route path="/postagem/novo" component={NovaPostagem}></Route>
          <Route path="/commentspost/:codigo" component={ListagemFuncao}></Route>
        </Switch>
      </>
    );
  }
}

export default App;
