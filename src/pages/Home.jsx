import { Link } from 'react-router-dom'

function Home() {
  return (
    <div>
      <h1>Gerenciamento de Tarefas</h1>

      <p>
        <Link to="/tarefas">Consultar tarefas</Link>
      </p>

      <p>
        <Link to="/cadastrar">Cadastrar tarefa</Link>
      </p>
    </div>
  )
}

export default Home