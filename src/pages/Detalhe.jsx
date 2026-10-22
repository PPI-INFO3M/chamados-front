import { Link, useParams } from "react-router-dom"
import { useEffect, useState } from "react"

function Detalhe(props) {
    const { id } = useParams()

    const [inputControlado, setInputControlado] = useState("")

    useEffect(() => {
        props.carregarChamado(id)
    }, [id])

    if (!props.chamado) {
        return <p>Carregando chamado...</p>
    }

    async function aoClicarIniciar() {
        await props.aoInciar(id, inputControlado)
        setInputControlado("")
    }
    async function aoClicarResolver() {
        await props.aoResolver(id, inputControlado)
        setInputControlado("")
    }

    return (
        <div className="page-detalhe">
            <Link to="/">Voltar</Link>

            <div className="ctn-top">
                <h3>{props.chamado.titulo}</h3>
                <span>{props.chamado.status}</span>
                <span>{props.chamado.prioridade}</span>
            </div>

            <div>
                <p><strong>Descrição: </strong>{props.chamado.descricao}</p>
                <p><strong>Tipo: </strong>{props.chamado.tipo}</p>
                <p><strong>Local: </strong>{props.chamado.local}</p>
                <p><strong>Aberto em: </strong>{props.chamado.data_abertura}</p>

                {props.chamado.responsavel && <p><strong>Responsável: </strong>{props.chamado.responsavel}</p>}

                {props.chamado.solucao && <p><strong>Solução: </strong>{props.chamado.solucao}</p>}

                {props.chamado.data_resolucao && <p><strong>Resolvido em: </strong>{props.chamado.data_resolucao}</p>}
            </div>

            <Link to="/editar/:id">Editar</Link>
            <button onClick={() => props.aoExcluir(id)}>Excluir</button>

            {(props.chamado.status !== "resolvido") &&
            <div>
                <h3>Próxima etapa</h3>
                <input 
                    type="text" 
                    placeholder={props.chamado.status === "aberto" ? "Responsável" : "Solução"}
                    value={inputControlado} 
                    onChange={(e) => {
                        setInputControlado(e.target.value)
                    }} />
                {props.chamado.status === "aberto" ? 
                    <button onClick={aoClicarIniciar}>Iniciar</button> : 
                    <button onClick={aoClicarResolver}>Resolver</button>
                }
            </div>
            }
        </div>
    )
}

export default Detalhe