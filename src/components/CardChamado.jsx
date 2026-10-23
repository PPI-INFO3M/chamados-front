import { Link } from "react-router-dom"

function CardChamado(props) {
    return (
        <div className="card">
            <div className="card-top">
                <span className={"tag status-" + props.chamado.status.replace(" ", "-")}>
                    ● {props.chamado.status}
                </span>
                <p>{props.chamado.data_abertura}</p>
            </div>
            <h3>{props.chamado.titulo}</h3>
            <p className="descr">{props.chamado.descricao}</p>
            <div className="ctn-left">
                <div className="ctn-local">
                    <span class="material-symbols-outlined">location_on</span>
                    <p>{props.chamado.local}</p>
                </div>

                <span className={"tag prioridade-" + props.chamado.prioridade}>
                    {props.chamado.prioridade}
                </span>
            </div>
        </div>
    )
}

export default CardChamado