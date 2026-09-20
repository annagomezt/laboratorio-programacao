import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'

function EditarTarefa() {
  const { id } = useParams()
  const navigate = useNavigate()

  const [titulo, setTitulo] = useState('')
  const [descricao, setDescricao] = useState('')
  const [status, setStatus] = useState('pendente')
  const [prioridade, setPrioridade] = useState('media')
  const [dataLimite, setDataLimite] = useState('')

  useEffect(() => {
    fetch(`/api/tarefas/${id}`)
      .then((resposta) => resposta.json())
      .then((dados) => {
        setTitulo(dados.titulo)
        setDescricao(dados.descricao || '')
        setStatus(dados.status || 'pendente')
        setPrioridade(dados.prioridade || 'media')
        setDataLimite(dados.dataLimite || '')
      })
      .catch((erro) => {
        console.log(erro)
      })
  }, [id])

  function editarTarefa(evento) {
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
    <main className="container">
      <div className="header">
        <h1>Editar Tarefa</h1>
        <p>Altere os dados da tarefa</p>
      </div>

      <form className="formulario" onSubmit={editarTarefa}>
        <div className="campo">
          <label>
            Título <span className="obrigatorio">*</span>
          </label>

          <input
            type="text"
            value={titulo}
            onChange={(evento) => setTitulo(evento.target.value)}
            required
          />
        </div>

        <div className="campo">
          <label>Descrição</label>

          <input
            type="text"
            value={descricao}
            onChange={(evento) => setDescricao(evento.target.value)}
          />
        </div>

        <div className="campo">
          <label>Status</label>

          <select
            value={status}
            onChange={(evento) => setStatus(evento.target.value)}
          >
            <option value="pendente">Pendente</option>
            <option value="em_andamento">Em andamento</option>
            <option value="concluida">Concluída</option>
          </select>
        </div>

        <div className="campo">
          <label>Prioridade</label>

          <select
            value={prioridade}
            onChange={(evento) => setPrioridade(evento.target.value)}
          >
            <option value="baixa">Baixa</option>
            <option value="media">Média</option>
            <option value="alta">Alta</option>
          </select>
        </div>

        <div className="campo">
          <label>Data limite</label>

          <input
            type="date"
            value={dataLimite}
            onChange={(evento) => setDataLimite(evento.target.value)}
          />
        </div>

        <button type="submit">Salvar alterações</button>
      </form>

      <Link className="voltar" to="/tarefas">
        Voltar
      </Link>
    </main>
  )
}

export default EditarTarefa 