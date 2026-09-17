import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function CadastrarTarefa() {
  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [status, setStatus] = useState("");
  const [prioridade, setPrioridade] = useState("");
  const [dataLimite, setDataLimite] = useState("");

  const navigate = useNavigate();

  function cadastrarTarefa(evento) {
    evento.preventDefault();

    const tarefa = {
      titulo: titulo,
      descricao: descricao,
      status: status,
      prioridade: prioridade,
      dataLimite: dataLimite,
    };

    fetch('/api/tarefas', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(tarefa),
    })
      .then((resposta) => {
        console.log("Status:", resposta.status);

        if (resposta.ok) {
          console.log("Cadastro realizado");
          navigate("/tarefas");
        } else {
          console.log("Erro ao cadastrar");
        }
      })
      .catch((erro) => {
        console.log(erro);
      });
  }

  return (
    <div>
      <h1>Cadastrar Tarefa</h1>

      <form onSubmit={cadastrarTarefa}>
        <p>
          <label>Título:</label>
          <br />
          <input
            type="text"
            value={titulo}
            onChange={(evento) => setTitulo(evento.target.value)}
          />
        </p>

        <p>
          <label>Descrição:</label>
          <br />
          <input
            type="text"
            value={descricao}
            onChange={(evento) => setDescricao(evento.target.value)}
          />
        </p>

        <p>
          <label>Status:</label>
          <br />
          <input
            type="text"
            value={status}
            onChange={(evento) => setStatus(evento.target.value)}
          />
        </p>

        <p>
          <label>Prioridade:</label>
          <br />
          <input
            type="text"
            value={prioridade}
            onChange={(evento) => setPrioridade(evento.target.value)}
          />
        </p>

        <p>
          <label>Data limite:</label>
          <br />
          <input
            type="date"
            value={dataLimite}
            onChange={(evento) => setDataLimite(evento.target.value)}
          />
        </p>

        <button type="submit">Cadastrar</button>
      </form>

      <p>
        <Link to="/">Voltar</Link>
      </p>
    </div>
  );
}

export default CadastrarTarefa;
