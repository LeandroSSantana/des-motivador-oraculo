const botoes = document.querySelectorAll(".btn");
const container = document.querySelector(".btn-group");

botoes.forEach(botao => {

  botao.addEventListener("click", async () => {

    const tipo = botao.dataset.tipo;

    try {

      const resposta = await fetch("/mensagem", {

        method: "POST",

        headers: {
          "Content-Type": "application/json"
        },

        body: JSON.stringify({
          tipo: tipo
        })

      });

      const data = await resposta.json();

      console.log("Resposta backend:", data);

      container.innerHTML = `

        <div class="mensagem fade-up">

          ${data.mensagem}

          <br><br>

          <button class="btn voltar">
            voltar
          </button>

        </div>

      `;

      document
        .querySelector(".voltar")
        .addEventListener("click", () => location.reload());

    } catch (erro) {

      console.error("Erro frontend:", erro);

      container.innerHTML = `
        <div class="mensagem">
          O oráculo ficou em silêncio…
        </div>
      `;

    }

  });

});