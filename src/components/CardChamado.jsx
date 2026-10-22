import { Link } from "react-router-dom"

function CardChamado(props) {
    return (
        <div className="card">
            <h3>{props.chamado.titulo}</h3>
            <p>{props.chamado.descricao}</p>
            <p>{props.chamado.prioridade}</p>
            <p>{props.chamado.status}</p>
            <Link to={"/chamado/" + props.chamado.id}>Detalhes</Link>
        </div>
    )
}

export default CardChamado