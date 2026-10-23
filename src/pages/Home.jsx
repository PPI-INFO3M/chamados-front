import ListaChamados from "../components/ListaChamados"
import { Link } from "react-router-dom"
import "./pages.css"

function Home(props) {

    return (
        <div className="page-home">
            <div className="ctn-top">
                <h2>Chamados</h2>
                <Link to="/novo" className="btn-seguir">+ Abrir chamado</Link>
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

                <select
                    value={props.filtroTipo}
                    onChange={(e) => {
                        props.setFiltroTipo(e.target.value)
                    }}>
                        <option value="">Tipos</option>
                        {props.tipos.map((item) => (
                            <option key={item} value={item}>{item}</option>
                        ))}
                </select>
                <select
                    value={props.status}
                    onChange={(e) => {
                        props.setStatus(e.target.value)
                    }}>
                        <option value="" key="status">Status</option>
                        <option value="aberto" key="aberto">aberto</option>
                        <option key="em-andamento" value="em andamento">em andamento</option>
                        <option key="" value="resolvido">resolvido</option>
                </select>
                <select
                    value={props.filtroLocal}
                    onChange={(e) => {
                        props.setFiltroLocal(e.target.value)
                    }}>
                    <option value="">Local</option>
                    {props.locais.map((local) => (
                        <option key={local} value={local}>{local}</option>
                    ))}
                </select>
                <select
                    value={props.filtroPrioridade}
                    onChange={(e) => {
                        props.setFiltroPrioridade(e.target.value)
                    }}>
                        <option value="">Prioridade</option>
                        {props.prioridades.map((prioridade) => (
                            <option key={prioridade} value={prioridade}>{prioridade}</option>
                        ))}
                    </select>

                
            </div>

            <ListaChamados chamados={props.chamados} carregando={props.carregando} />
        </div>
    )

}

export default Home