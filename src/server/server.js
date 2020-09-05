var expressClass = require("express");
var bodyParser = require("body-parser");
var postagens = require("./postagens");
var comentarios = require("./comentarios");

var express = new expressClass();

express.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");

  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );

  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );

  res.setHeader("Access-Control-Allow-Credentials", true);

  next();
});



express.use(bodyParser.json());
express.use(
  bodyParser.urlencoded({
    extended: true,
  })
);



express.get("/Postagem/:codigo", function (request, response) {
  var codigo = request.params["codigo"];
  var promise = new Promise((resolve, reject) => {
    resolve(
      postagens.filter((postagem) => {
        return postagem.codigo == codigo;
      })[0]
    );
  });
  promise.then((postagem) => {
    response.json(postagem);
  });
});

express.get("/Postagens", function (request, response) {
  response.json(postagens);
});

express.post("/Postagem", function (request, response) {
  var max = 0;
  postagens.forEach(item => {
    if (item.codigo > max)
      max = item.codigo;
  });
  request.body.codigo = max + 1;
  var now = new Date();
  request.body.data = now.getDate() + "/" + (now.getMonth() < 10 ? "0" + now.getMonth() : now.getMonth()) + "/" + now.getFullYear() + " " + now.getHours() + ":" + now.getMinutes();

  postagens.push(request.body);
  response.json();
});



express.get("/commentspost/:codigo", function (request, response) {
  var codigo = request.params["codigo"];
  var promise = new Promise((resolve, reject) => {
    resolve(
      comentarios.filter((comentario) => {
        return comentario.codigopostagem == codigo;
      })
    );
  });

  promise.then((comentario) => {
    response.json(comentario);
  });
});

express.post("/addcomment", function (request, response) {
  var max = 0;
  comentarios.forEach(item => {
    if (item.codigo > max)
      max = item.codigo;
  });
  request.body.codigo = max + 1;
  var now = new Date();
  request.body.data = now.getDate() + "/" + (now.getMonth() < 10 ? "0" + now.getMonth() : now.getMonth()) + "/" + now.getFullYear() + " " + now.getHours() + ":" + now.getMinutes();

  comentarios.push(request.body);
  response.json();
});

express.put("/attpost/:codigo/:type", function (request, response) {
  var codigo = request.params["codigo"];
  var type = request.params["type"];

  var promise = new Promise((resolve, reject) => {
    resolve(
      postagens.filter((obj) => {
        return obj.codigo == codigo;
      })[0]
    );
  });

  promise.then((postagem) => {
    if (type == "+") {
      postagem.curtidas = postagem.curtidas + 1
    }
    else {
      postagem.descurtidas = postagem.descurtidas + 1;
    }

    response.json();
  });
});


express.listen(8888);
