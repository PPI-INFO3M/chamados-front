import ListaChamados from "../components/ListaChamados"
import { Link } from "react-router-dom"

import { listarTipos, listarLocais, listarPrioridades } from "../services/chamadosService"
import {  CarregarListas } from "../components/FormularioChamado"
import { useEffect, useState } from "react"

function Home(props) {
    const [status, setStatus] = useState([])
    const [tipos, setTipos] = useState([])
    const [locais, setLocais] = useState([])
    const [prioridades, setPrioridades] = useState([])

    const [erro, setErro] = useState(null)

    useEffect(() => {
        async function CarregarListas() {
            try {
                setTipos(await listarTipos())
                setLocais(await listarLocais)
                setPrioridades(await listarPrioridades())
            } catch (e) {
                setErro("Erro")
            }
        };
        CarregarListas()
    }, [])

    return (
        <div className="page-home">
            <div className="ctn-top">
                <h2>Chamados</h2>
                <Link to="/novo-chamado">+ Abrir chamado</Link>
            </div>
            <div className="ctn-busca">
                <input 
                    type="text"
                    placeholder="Buscar por título ou descrição..."
                    value={props.busca}
                    onChange={(e) => {
                        props.setBusca(e.target.value)
                    }}
                />

                <select>
                    <option value="">Status</option>
                </select>
                <select>
                    <option value="">Tipo</option>
                </select>

                
            </div>

            <ListaChamados chamados={props.chamados} />
        </div>
    )

}

export default Home