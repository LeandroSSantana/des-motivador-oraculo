require("dotenv").config();

const express = require("express");
const cors = require("cors");
const fs = require("fs");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static("public"));

/*
Banco local de frases
*/
const banco = {
  trabalho: JSON.parse(
    fs.readFileSync("./frases/trabalho.json")
  ),
  vida_pessoal: JSON.parse(
    fs.readFileSync("./frases/vida_pessoal.json")
  ),
  vida_amorosa: JSON.parse(
    fs.readFileSync("./frases/vida_amorosa.json")
  )
};

/*
Memória simples anti-repetição
*/
const ultimaFrasePorTipo = {
  trabalho: null,
  vida_pessoal: null,
  vida_amorosa: null
};

/*
Endpoint principal
*/
app.post("/mensagem", (req, res) => {

  const { tipo } = req.body;

  const lista = banco[tipo];

  if (!lista) {

    return res.json({
      mensagem: "Nem o destino sabe responder isso."
    });

  }

  let mensagem;

  do {

    const indiceAleatorio =
      Math.floor(Math.random() * lista.length);

    mensagem = lista[indiceAleatorio];

  } while (
    mensagem === ultimaFrasePorTipo[tipo]
    && lista.length > 1
  );

  ultimaFrasePorTipo[tipo] = mensagem;

  res.json({ mensagem });

});

/*
Compatibilidade Render
*/
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {

  console.log(`Servidor rodando na porta ${PORT}`);

});