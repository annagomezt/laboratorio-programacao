import { Link } from 'react-router-dom'

function Home() {
  return (
    <main className="container">
      <div className="header">
        <h1>Gerenciador de Tarefas</h1>
        <p>Cadastro e acompanhamento de tarefas</p>
      </div>

      <div className="menu">
        <Link className="botao" to="/tarefas">
          Consultar tarefas
        </Link>

        <Link className="botao" to="/cadastrar">
          Cadastrar tarefa
        </Link>
      </div>
    </main>
  )
}

export default Home