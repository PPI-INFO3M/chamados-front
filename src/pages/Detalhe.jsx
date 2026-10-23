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
        await props.aoIniciar(id, inputControlado)
        setInputControlado("")
    }
    async function aoClicarResolver() {
        await props.aoResolver(id, inputControlado)
        setInputControlado("")
    }

    function aoClicarExcluir() {
    if (window.confirm("Tem certeza que deseja excluir este chamado?")) {
        props.aoExcluir(id)
    }
    }

    return (
        <div className="page-detalhe">
            <Link to="/" className="voltar">← Voltar</Link>

            <div className="detalhe-topo">
                <h2>{props.chamado.titulo}</h2>
                <div className="detalhe-tags">
                    <span className={"tag status-" + props.chamado.status.replace(" ", "-")}>
                        {props.chamado.status}
                    </span>
                    <span className={"tag prioridade-" + props.chamado.prioridade}>
                        {props.chamado.prioridade}
                    </span>
                </div>
            </div>

            <div className="detalhe-campos">
                <div className="detalhe-linha">
                    <strong>Descrição:</strong>
                    <span>{props.chamado.descricao}</span>
                </div>
                <div className="detalhe-linha">
                    <strong>Tipo:</strong>
                    <span>{props.chamado.tipo}</span>
                </div>
                <div className="detalhe-linha">
                    <strong>Local:</strong>
                    <span>{props.chamado.local}</span>
                </div>
                <div className="detalhe-linha">
                    <strong>Aberto em:</strong>
                    <span>{props.chamado.data_abertura}</span>
                </div>

                {props.chamado.responsavel && (
                    <div className="detalhe-linha">
                        <strong>Responsável:</strong>
                        <span>{props.chamado.responsavel}</span>
                    </div>
                )}
                {props.chamado.solucao && (
                    <div className="detalhe-linha">
                        <strong>Solução:</strong>
                        <span>{props.chamado.solucao}</span>
                    </div>
                )}
                {props.chamado.data_resolucao && (
                    <div className="detalhe-linha">
                        <strong>Resolvido em:</strong>
                        <span>{props.chamado.data_resolucao}</span>
                    </div>
                )}
            </div>

            {props.chamado.status !== "resolvido" && (
                <div className="detalhe-acoes">
                    <Link to={"/editar/" + props.chamado.id} className="btn botao-secundario">Editar</Link>
                    <button className="btn botao-perigo" onClick={aoClicarExcluir}>Excluir</button>
                </div>
            )}

            {props.chamado.status !== "resolvido" && (
                <div className="proxima-etapa">
                    <h3>Próxima etapa</h3>
                    <div className="proxima-etapa-campos">
                        <input
                            type="text"
                            placeholder={props.chamado.status === "aberto" ? "Responsável" : "Solução"}
                            value={inputControlado}
                            onChange={(e) => {
                                setInputControlado(e.target.value)
                            }}
                        />
                        {props.chamado.status === "aberto"
                            ? <button className="btn" onClick={aoClicarIniciar}>Iniciar</button>
                            : <button className="btn" onClick={aoClicarResolver}>Resolver</button>
                        }
                    </div>
                </div>
            )}
        </div>
    )
}

export default Detalhe