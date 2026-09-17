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
    <div>
      <h1>Tarefas</h1>

      <p>
        <Link to="/">Voltar</Link>
      </p>

      <p>
        <Link to="/cadastrar">Cadastrar tarefa</Link>
      </p>

      {tarefas.map((tarefa) => (
        <div key={tarefa.id}>
          <p>ID: {tarefa.id}</p>
          <p>Título: {tarefa.titulo}</p>
          <p>Descrição: {tarefa.descricao}</p>
          <p>Status: {tarefa.status}</p>
          <p>Prioridade: {tarefa.prioridade}</p>
          <p>Data limite: {tarefa.dataLimite}</p>

          <Link to={`/editar/${tarefa.id}`}>Editar</Link>

          <br />

          <button onClick={() => excluirTarefa(tarefa.id)}>
            Excluir
          </button>

          <hr />
        </div>
      ))}
    </div>
  )
}

export default Tarefas