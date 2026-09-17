import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

function CadastrarTarefa() {
  const [titulo, setTitulo] = useState('')
  const [descricao, setDescricao] = useState('')
  const [status, setStatus] = useState('pendente')
  const [prioridade, setPrioridade] = useState('media')
  const [dataLimite, setDataLimite] = useState('')

  const navigate = useNavigate()

  function cadastrarTarefa(evento) {
    evento.preventDefault()

    const tarefa = {
      titulo: titulo,
      status: status,
      prioridade: prioridade,
    }

    if (descricao !== '') {
      tarefa.descricao = descricao
    }

    if (dataLimite !== '') {
      tarefa.dataLimite = dataLimite
    }

    fetch('/api/tarefas', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(tarefa),
    })
      .then((resposta) => {
        if (resposta.ok) {
          navigate('/tarefas')
        }
      })
      .catch((erro) => {
        console.log(erro)
      })
  }

  return (
    <div>
      <h1>Cadastrar Tarefa</h1>

      <form onSubmit={cadastrarTarefa}>
        <p>
          <label>Título (obrigatório):</label>
          <br />
          <input
            type="text"
            value={titulo}
            onChange={(evento) => setTitulo(evento.target.value)}
            required
          />
        </p>

        <p>
          <label>Descrição (opcional):</label>
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
          <select
            value={status}
            onChange={(evento) => setStatus(evento.target.value)}
          >
            <option value="pendente">Pendente</option>
            <option value="em_andamento">Em andamento</option>
            <option value="concluida">Concluída</option>
          </select>
        </p>

        <p>
          <label>Prioridade:</label>
          <br />
          <select
            value={prioridade}
            onChange={(evento) => setPrioridade(evento.target.value)}
          >
            <option value="baixa">Baixa</option>
            <option value="media">Média</option>
            <option value="alta">Alta</option>
          </select>
        </p>

        <p>
          <label>Data limite (opcional):</label>
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
  )
}

export default CadastrarTarefa