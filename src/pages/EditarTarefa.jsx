import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'

function EditarTarefa() {
  const { id } = useParams()
  const navigate = useNavigate()

  const [titulo, setTitulo] = useState('')
  const [descricao, setDescricao] = useState('')
  const [status, setStatus] = useState('')
  const [prioridade, setPrioridade] = useState('')
  const [dataLimite, setDataLimite] = useState('')

  useEffect(() => {
    fetch(`/api/tarefas/${id}`)
      .then((resposta) => resposta.json())
      .then((dados) => {
        setTitulo(dados.titulo)
        setDescricao(dados.descricao)
        setStatus(dados.status)
        setPrioridade(dados.prioridade)
        setDataLimite(dados.dataLimite)
      })
      .catch((erro) => {
        console.log(erro)
      })
  }, [id])

  function editarTarefa(evento) {
    evento.preventDefault()

    const tarefa = {
      titulo: titulo,
      descricao: descricao,
      status: status,
      prioridade: prioridade,
      dataLimite: dataLimite,
    }

    fetch(`/api/tarefas/${id}`, {
      method: 'PUT',
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
      <h1>Editar Tarefa</h1>

      <form onSubmit={editarTarefa}>
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

        <button type="submit">Salvar</button>
      </form>

      <p>
        <Link to="/tarefas">Voltar</Link>
      </p>
    </div>
  )
}

export default EditarTarefa