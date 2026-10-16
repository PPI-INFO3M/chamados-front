import { useEffect, useState } from 'react'
import { Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import Detalhe from './pages/Detalhe'
import Cadastro from './pages/Cadastro'
import api from "./services/api"
import Cabecalho from "./components/Cabecalho"
import './App.css'
import { listarChamados } from './services/chamadosService'

function App() {
  const [usuario, setUsuario] = useState(null);
  const [chamados, setChamados] = useState(null);

  async function carregarUsuario() {
    try {
      const resposta = await api.get("/eu")
      setUsuario(resposta.data)
    } catch (erro) {
      console.log("Erro: ", erro)
    }
  };

  async function carregarChamados() {
    try {
      const dados = await listarChamados();
      setChamados(dados)
    } catch (e) {
      s
    }
  }


  useEffect (() => {
    carregarUsuario();
    carregarChamados();
  }, []);


  return (
    <div>
      <Cabecalho user={usuario} />
      <Routes>
        <Route path="/" element={<Home chamados={chamados} />} />
        <Route path="/chamado/:id" element={<Detalhe />} />
        <Route path="/novo" element={<Cadastro />} />
        <Route path="/editar/:id" element={<Cadastro />} />
      </Routes>

      


    </div>
  )
}

export default App
