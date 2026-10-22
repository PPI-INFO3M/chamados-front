import { useEffect, useState } from 'react'
import { Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import Detalhe from './pages/Detalhe'
import Cadastro from './pages/Cadastro'
import api from "./services/api"
import Cabecalho from "./components/Cabecalho"
import './App.css'

import { listarChamados, listarTipos, listarLocais, listarPrioridades } from './services/chamadosService'

function App() {
  const [usuario, setUsuario] = useState("");

  const [chamados, setChamados] = useState([]);

  const [status, setStatus] = useState("")
  const [filtroTipo, setFiltroTipo] = useState("")
  const [filtroLocal, setFiltroLocal] = useState("")
  const [filtroPrioridade, setFiltroPrioridade] = useState("")
  const [tipos, setTipos] = useState([])
  const [locais, setLocais] = useState([])
  const [prioridades, setPrioridades] = useState([])

  const [erro, setErro] = useState(null)

  const [busca, setBusca] = useState("")

  async function carregarUsuario() {
    try {
      const resposta = await api.get("/eu")
      setUsuario(resposta.data)
    } catch (e) {
      console.log("Erro:", e)
      setErro("Erro")
    }
  };

  async function carregarListas() {
    try {
      setTipos(await listarTipos())
      setLocais(await listarLocais())
      setPrioridades(await listarPrioridades())
    } catch (e) {
      console.log("Erro:", e)
      setErro("Erro")
    }
  }

  async function carregarChamados() {
    try {
      const filtros = {}
      if (busca) {
        filtros.busca = busca
      }
      if (status) {
        filtros.status = status
      }
      if (filtroTipo) {
        filtros.tipo = filtroTipo
      }
      if (filtroLocal) {
        filtros.local = filtroLocal
      }
      if (filtroPrioridade) {
        filtros.prioridade = filtroPrioridade
      }
      const dados = await listarChamados(filtros);
      setChamados(dados)
    } catch (e) {
      console.log("Erro:", e)
      setErro("Erro")
    }
  }


  useEffect (() => {
    carregarUsuario();
    carregarListas()
  }, []);

  useEffect (() => {
    const temporizador = setTimeout(() => {
      carregarChamados()
    }, 500)

    return (() => {
      clearTimeout(temporizador)
    })
  }, [busca, status, filtroTipo, filtroLocal, filtroPrioridade]);


  return (
    <div>
      <Cabecalho user={usuario} />
      <Routes>
        <Route path="/" element={
          <Home
            chamados={chamados}
            busca={busca} setBusca={setBusca}
            status={status} setStatus={setStatus}
            filtroTipo={filtroTipo} setFiltroTipo={setFiltroTipo}
            filtroLocal={filtroLocal} setFiltroLocal={setFiltroLocal}
            filtroPrioridade={filtroPrioridade} setFiltroPrioridade={setFiltroPrioridade}
            tipos={tipos} locais={locais} prioridades={prioridades}
          />}/>
        <Route path="/chamado/:id" element={<Detalhe  />} />
        <Route path="/novo" element={<Cadastro />} />
        <Route path="/editar/:id" element={<Cadastro />} />
      </Routes>

      


    </div>
  )
}

export default App
