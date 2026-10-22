import Formulario from "../components/Formulario"
import { useState, useEffect } from "react";
import { listarTipos, listarLocais, listarPrioridades } from "../services/chamadosService"

function Cadastro(props) {
    const [titulo, setTitulo] = useState("")
    const [descricao, setDescricao] = useState("")
    const [tipo, setTipo] = useState("");
    const [local, setLocal] = useState("");
    const [prioridade, setPrioridade] = useState("");
    const dataAbertura = new Date().toLocaleDateString("sv-SE")

    const [tipos, setTipos] = useState([]);
    const [locais, setLocais] = useState([]);
    const [prioridades, setPrioridades] = useState([]);

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

        const erro = await props.aoCadastrar(chamado)

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
        async function carregarListas() {
            try {
                setTipos(await listarTipos())
                setLocais(await listarLocais())
                setPrioridades(await listarPrioridades())
            } catch(e) {
                console.log("Erro:", e)
            }
        }
        carregarListas()
    }, []);

    return (
        <div>
            <h2>Cadastrar Chamado</h2>
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

export default Cadastro;