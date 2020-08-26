import React from "react";
import PropTypes from "prop-types";

// Props é um objeto => { texto: "...", cor: "..." }
function Cabecalho(props) {
  return (
    <h1 style={{ backgroundColor: "white", color: props.cor }}>
      {props.children}
    </h1>
  );
}

// tipos das props
Cabecalho.propTypes = {
  cor: PropTypes.string.isRequired,
};

// valores default para props
Cabecalho.defaultProps = {
  cor: "#73C2F6",
};

export default Cabecalho;
