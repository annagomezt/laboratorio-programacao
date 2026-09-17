import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Tarefas from './pages/Tarefas'
import CadastrarTarefa from './pages/CadastrarTarefa'
import EditarTarefa from './pages/EditarTarefa'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/tarefas" element={<Tarefas />} />
      <Route path="/cadastrar" element={<CadastrarTarefa />} />
      <Route path="/editar/:id" element={<EditarTarefa />} />
    </Routes>
  )
}

export default App