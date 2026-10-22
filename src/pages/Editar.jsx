import Formulario from "../components/Formulario"
import { useState, useEffect } from "react";
import { listarTipos, listarLocais, listarPrioridades, buscarChamado } from "../services/chamadosService"

import { useParams } from "react-router-dom";

function Editar(props) {
    const [titulo, setTitulo] = useState("")
    const [descricao, setDescricao] = useState("")
    const [tipo, setTipo] = useState("");
    const [local, setLocal] = useState("");
    const [prioridade, setPrioridade] = useState("");
    const [dataAbertura, setDataAbertura] = useState("")
    const [status, setStatus] = useState("")

    const [tipos, setTipos] = useState([]);
    const [locais, setLocais] = useState([]);
    const [prioridades, setPrioridades] = useState([]);

    const { id } = useParams()

    const [mensagem, setMensagem] = useState("")
    const [sucesso, setSucesso] = useState(false)

    async function aoEnviar(e) {
        e.preventDefault()
        const chamado = {
            titulo: titulo,
            descricao: descricao,
            tipo: tipo,
            local: local,
            prioridade: prioridade,
            data_abertura: dataAbertura
        }

        const erro = await props.aoEditar(id, chamado)

        if (erro) {
            setMensagem(erro)
            setSucesso(false)
        } else {
            setMensagem("Chamado cadastrado com sucesso!")
            setSucesso(true)
            setTitulo("")
            setDescricao("")
            setTipo("")
            setLocal("")
            setPrioridade("")
        }
    };

    useEffect(() => {
    async function carregarChamado() {
        try {
            const dados = await buscarChamado(id)
            setTitulo(dados.titulo)
            setDescricao(dados.descricao)
            setTipo(dados.tipo)
            setLocal(dados.local)
            setPrioridade(dados.prioridade)
            setDataAbertura(dados.data_abertura)
            setStatus(dados.status)
        } catch (e) {
            console.log("Erro:", e)
        }
    }
    carregarChamado()
    }, [id])

    if (status === "resolvido") {
        return <p>Chamados resolvidos não podem ser editados...</p>
    }
    return (
        <div>
            <h2>Editar Chamado</h2>
            <p>Chamado: {}</p>
            <Formulario aoEnviar={aoEnviar}
                titulo={titulo} setTitulo={setTitulo}
                descricao={descricao} setDescricao={setDescricao}
                tipo={tipo} setTipo={setTipo}
                local={local} setLocal={setLocal}
                prioridade={prioridade} setPrioridade={setPrioridade}
                dataAbertura={dataAbertura}
                tipos={tipos} setTipos={setTipos}
                locais={locais} setLocais={setLocais}
                prioridades={prioridades} setPrioridades={setPrioridades}  
                mensagem={mensagem}
                sucesso={sucesso}   
            />
        </div>
    );
}

export default Editar;