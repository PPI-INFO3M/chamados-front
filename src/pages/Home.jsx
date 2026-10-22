import ListaChamados from "../components/ListaChamados"
import { Link } from "react-router-dom"

function Home(props) {

    return (
        <div className="page-home">
            <div className="ctn-top">
                <h2>Chamados</h2>
                <Link to="/novo">+ Abrir chamado</Link>
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
                        <option value="">Status</option>
                        {props.status.map((statu) => (
                            <option key={statu} value={statu}>{statu}</option>
                        ))}
                    </select>

                
            </div>

            <ListaChamados chamados={props.chamados} />
        </div>
    )

}

export default Home