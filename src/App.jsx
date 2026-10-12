import { useEffect, useState } from 'react'
import { Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import Detalhe from './pages/Detalhe'
import Cadastro from './pages/Cadastro'
import api from "./services/api"
import Cabecalho from "./components/Cabecalho"
import './App.css'

function App() {
  const [usuario, setUsuario] = useState(null);

  async function carregarUsuario() {
    try {
      const resposta = await api.get("/eu")
      setUsuario(resposta.data)
    } catch (erro) {
      console.log("Erro: ", erro)
    }
  };


  useEffect (() => {
    carregarUsuario();
  }, []);


  return (
    <div>
      <Cabecalho user={usuario} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/chamado/:id" element={<Detalhe />} />
        <Route path="/novo" element={<Cadastro />} />
        <Route path="/editar/:id" element={<Cadastro />} />
      </Routes>

      


    </div>
  )
}

export default App
