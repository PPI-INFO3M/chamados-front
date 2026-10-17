import { Link } from "react-router-dom";
import "./Cabecalho.css"

function Cabecalho(props) {
    return (
        <header className="cabecalho">
            <div className="cab-left">
                <h1>Chamados de manuntenção</h1>
            </div>

            <nav className="menu">
                <Link to="/">Inicio</Link>
                <Link to="/novo-chamado">Novo chamado</Link>
            </nav>

            <div className="menu-user">
                <p>Olá, {props.user ? props.user.nome : "..." }</p>

                {props.user && (
                    <div className="menu-user-lista">
                        <p>Nome: {props.user.nome}</p>
                        <p>Matrícula: {props.user.matricula}</p>
                        <p>Total de chamados: {props.user.total_chamados}</p>
                    </div>
                )}
            </div>
        </header>
    )
}

export default Cabecalho