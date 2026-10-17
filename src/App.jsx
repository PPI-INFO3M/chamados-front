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
  const [usuario, setUsuario] = useState([]);
  const [chamados, setChamados] = useState([]);
  const [erro, setErro] = useState(null)

  const [busca, setBusca] = useState("")

  async function carregarUsuario() {
    try {
      const resposta = await api.get("/eu")
      setUsuario(resposta.data)
    } catch (e) {
      setErro("Erro")
    }
  };

  async function carregarChamados() {
    try {
      const filtros = {}
      if (busca) {
        filtros.busca = busca
      }
      const dados = await listarChamados(filtros);
      setChamados(dados)
    } catch (e) {
      setErro("Erro")
    }
  }


  useEffect (() => {
    carregarUsuario();
  }, []);

  useEffect (() => {
    const temporizador = setTimeout(() => {
      carregarChamados()
    }, 500)

    return (() => {
      clearTimeout(temporizador)
    })
  }, [busca]);


  return (
    <div>
      <Cabecalho user={usuario} />
      <Routes>
        <Route path="/" element={<Home chamados={chamados} busca={busca} setBusca={setBusca} />} />
        <Route path="/chamado/:id" element={<Detalhe />} />
        <Route path="/novo-chamado" element={<Cadastro />} />
        <Route path="/editar/:id" element={<Cadastro />} />
      </Routes>

      


    </div>
  )
}

export default App
