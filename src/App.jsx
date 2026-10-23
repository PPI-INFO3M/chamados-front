import { useEffect, useState } from 'react'
import { Routes, Route, useNavigate } from "react-router-dom"
import Home from "./pages/Home"
import Detalhe from './pages/Detalhe'
import Cadastro from './pages/Cadastro'
import Editar from './pages/Editar'
import api from "./services/api"
import Cabecalho from "./components/Cabecalho"
import MensagemErro from './components/MensagemErro'
import './App.css'

import { listarChamados, listarTipos, listarLocais, listarPrioridades, buscarChamado, criarChamado, editarChamado, excluirChamado, iniciarChamado, resolverChamado } from './services/chamadosService'

function App() {
  const [usuario, setUsuario] = useState("");

  const [chamados, setChamados] = useState([]);
  const [chamado, setChamado] = useState(null);

  const [status, setStatus] = useState("")
  const [filtroTipo, setFiltroTipo] = useState("")
  const [filtroLocal, setFiltroLocal] = useState("")
  const [filtroPrioridade, setFiltroPrioridade] = useState("")

  const [tipos, setTipos] = useState([])
  const [locais, setLocais] = useState([])
  const [prioridades, setPrioridades] = useState([])

  const [erro, setErro] = useState(null)

  const [busca, setBusca] = useState("")

  const navigate = useNavigate()

  const [carregando, setCarregando] = useState(true)

  async function carregarUsuario() {
    try {
      const resposta = await api.get("/eu")
      setUsuario(resposta.data)
    } catch (e) {
      setErro(pegarMensagemErro(e))
    }
  };

  async function carregarListas() {
    try {
      setTipos(await listarTipos())
      setLocais(await listarLocais())
      setPrioridades(await listarPrioridades())
    } catch (e) {
      setErro(pegarMensagemErro(e))
    }
  }

  async function carregarChamados() {
    try {
      setCarregando(true)
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
      setErro(pegarMensagemErro(e))
    } finally {
      setCarregando(false)
    }
  }

  async function carregarChamado(id) {
    try {
      setChamado(null)
      const dados = await buscarChamado(id);
      setChamado(dados)
    } catch (e) {
      setErro(pegarMensagemErro(e))
    }
  }

  async function aoCadastrar(chamado) {
    try {
      await criarChamado(chamado)
      await carregarChamados();
      return ""
    } catch (e) {
      return pegarMensagemErro(e)
    }
  };

  async function aoEditar(id, chamado) {
    try {
      await editarChamado(id, chamado);
      await carregarChamados();
      return ""
    } catch (e) {
      return pegarMensagemErro(e)
    }
  }

  async function aoExcluir(id) {
    try {
      await excluirChamado(id);
      await carregarChamados();
      navigate("/")
    } catch(e) {
      setErro(pegarMensagemErro(e))
    }
  }

  async function aoIniciar(id, responsavel) {
    try {
      await iniciarChamado(id, responsavel);
      await carregarChamado(id);
      await carregarChamados();
    } catch(e) {
      setErro(pegarMensagemErro(e))
    }
  }

  async function aoResolver(id, solucao) {
    try {
      await resolverChamado(id, solucao);
      await carregarChamado(id);
      await carregarChamados();
    } catch(e) {
      setErro(pegarMensagemErro(e));
    }
  }

  function pegarMensagemErro(e) {
    if (e.response && e.response.data) {
      const detalhe = e.response.data.detail
      if (typeof detalhe === "string") {
        return detalhe
      }
      if (Array.isArray(detalhe)) {
        return detalhe.map((item) => item.msg).join(", ")
      }
    }
    return "Não foi possível salvar. Tente novamente."
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
    <div className="app">
      <Cabecalho user={usuario} />
      <MensagemErro mensagem={erro} />
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

        <Route path="/chamado/:id" element={
          <Detalhe
            chamado={chamado}
            carregarChamado={carregarChamado}
            aoExcluir={aoExcluir}
            aoIniciar={aoIniciar}
            aoResolver={aoResolver}
          />} />

        <Route path="/novo" element={
          <Cadastro
            tipos={tipos}
            locais={locais}
            prioridades={prioridades}
            aoCadastrar={aoCadastrar}
          />} />

        <Route path="/editar/:id" element={
          <Editar 
            aoEditar={aoEditar}
            tipos={tipos}
            locais={locais}
            prioridades={prioridades}
          />} />
      </Routes>

      


    </div>
  )
}

export default App
