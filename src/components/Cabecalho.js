import React from "react";
import PropTypes from "prop-types";

function Cabecalho(props) {
  return (
    <h1 style={{ backgroundColor: "white", color: props.cor }}>
      {props.children}
    </h1>
  );
}

Cabecalho.propTypes = {
  cor: PropTypes.string.isRequired,
};

Cabecalho.defaultProps = {
  cor: "#73C2F6",
};

export default Cabecalho;
