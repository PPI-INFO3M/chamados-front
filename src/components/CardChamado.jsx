function CardChamado(props) {
    return (
        <div className="card">
            <h3>{props.chamado.titulo}</h3>
            <p>{props.chamado.descricao}</p>
            <p>{props.chamado.tipo}</p>
            <p>{props.chamado.local}</p>
            <p>{props.chamado.prioridade}</p>
            <p>{props.chamado.dataAbertura}</p>
            <p>{props.chamado.status}</p>
            <p>{props.chamado.responsavel}</p>
        </div>
    )
}

export default CardChamado