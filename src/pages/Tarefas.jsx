import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

function Tarefas() {
  const [tarefas, setTarefas] = useState([])

  useEffect(() => {
    fetch('/api/tarefas')
      .then((resposta) => resposta.json())
      .then((dados) => {
        setTarefas(dados)
      })
      .catch((erro) => {
        console.log(erro)
      })
  }, [])

  function buscarTarefas() {
    fetch('/api/tarefas')
      .then((resposta) => resposta.json())
      .then((dados) => {
        setTarefas(dados)
      })
      .catch((erro) => {
        console.log(erro)
      })
  }

  function excluirTarefa(id) {
    fetch(`/api/tarefas/${id}`, {
      method: 'DELETE',
    })
      .then((resposta) => {
        if (resposta.ok) {
          buscarTarefas()
        }
      })
      .catch((erro) => {
        console.log(erro)
      })
  }

  return (
    <main className="container">
      <div className="header">
        <h1>Tarefas</h1>
        <p>Lista de tarefas cadastradas</p>
      </div>

      <div className="menu">
        <Link className="botao botao-secundario" to="/">
          Início
        </Link>

        <Link className="botao" to="/cadastrar">
          Nova tarefa
        </Link>
      </div>

      <div className="lista-tarefas">
        {tarefas.map((tarefa) => (
          <div className="tarefa" key={tarefa.id}>
            <h2>{tarefa.titulo}</h2>

            <p>
              <strong>Descrição:</strong> {tarefa.descricao}
            </p>

            <p>
              <strong>Status:</strong> {tarefa.status}
            </p>

            <p>
              <strong>Prioridade:</strong> {tarefa.prioridade}
            </p>

            <p>
              <strong>Data limite:</strong> {tarefa.dataLimite}
            </p>

            <div className="acoes">
              <Link
                className="botao"
                to={`/editar/${tarefa.id}`}
              >
                Editar
              </Link>

              <button
                className="botao-excluir"
                onClick={() => excluirTarefa(tarefa.id)}
              >
                Excluir
              </button>
            </div>
          </div>
        ))}
      </div>
    </main>
  )
}

export default Tarefas