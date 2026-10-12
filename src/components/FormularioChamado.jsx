import { use, useEffect, useState } from "react"
import CampoTexto from "./CampoTexto"
import { listarTipos, listarLocais, listarPrioridades } from "../services/chamadosService"

function Formulario(props) {
    const [titulo, setTitulo] = useState("")
    const [descricao, setDescricao] = useState("")
    const [tipo, setTipo] = useState("");
    const [local, setLocal] = useState("");
    const [prioridade, setPrioridade] = useState("");
    const dataAbertura = new Date().toLocaleDateString("sv-SE")

    const [tipos, setTipos] = useState([]);
    const [locais, setLocais] = useState([]);
    const [prioridades, setPrioridades] = useState([]);

    useEffect(() => {
        async function CarregarListas() {
            try {
                setTipos(await listarTipos())
                setLocais(await listarLocais())
                setPrioridades(await listarPrioridades())
            } catch(e) {
                console.log("Erro:", e)
            }
        }
        CarregarListas()
    }, []);

    function aoEnviar(e) {
        e.preventDefault();
        const chamado = {
            titulo: titulo,
            descricao: descricao,
            tipo: tipo, 
            local: local,
            prioridade: prioridade,
            data_abertura: dataAbertura
        };
        props.aoSalvar(chamado);
        setTitulo("");
        setDescricao("");
        setTipo("");
        setLocal("");
        setPrioridade("");
    };

    return (
        <form className="forms" onSubmit={aoEnviar}>
            <CampoTexto rotulo="Titulo" type={titulo} value={setTitulo} />
            <CampoTexto rotulo="Descrição" type={descricao} value={setDescricao} />
            <div className="select">
                <label>Tipo</label>
                <select
                    value={tipo}
                    onChange={function (e) {
                        setTipo(e.target.value)
                    }}>
                        <option value=""></option>
                        {tipos.map((tipo, i) => (
                            <option key={i} value={tipo}>{tipo}</option>
                        ))}
                </select>
            </div>
            <div className="select">
                <label>Local</label>
                <select
                    value={local}
                    onChange={function (e) {
                        setTipo(e.target.value)
                    }}>
                        <option value=""></option>
                        {locais.map((local, i) => (
                            <option key={i} value={local}>{local}</option>
                        ))}
                </select>
            </div>
            
            <div className="select">
                <label>Prioridade</label>
                <select
                    value={prioridade}
                    onChange={function (e) {
                        setTipo(e.target.value)
                    }}>
                        <option value=""></option>
                        {prioridades.map((prioridade, i) => (
                            <option key={i} value={prioridade}>{prioridade}</option>
                        ))}
                </select>
            </div>
            <p>Data de abertura: {dataAbertura}</p>
        </form>
    )
}

export default Formulario;