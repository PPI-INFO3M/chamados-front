import CampoTexto from "./CampoTexto"
import { Link } from "react-router-dom"

function Formulario(props) {

    return (
        <form className="forms" onSubmit={props.aoEnviar}>
            <CampoTexto rotulo="Titulo" valor={props.titulo} aoAlterar={props.setTitulo} />
            <CampoTexto rotulo="Descrição" valor={props.descricao} aoAlterar={props.setDescricao} />
            <div className="select">
                <label>Tipo</label>
                <select
                    value={props.tipo}
                    onChange={function (e) {
                        props.setTipo(e.target.value)
                    }}>
                        <option value=""></option>
                        {props.tipos.map((tipo, i) => (
                            <option key={i} value={tipo}>{tipo}</option>
                        ))}
                </select>
            </div>
            <div className="select">
                <label>Local</label>
                <select
                    value={props.local}
                    onChange={function (i) {
                        props.setLocal(i.target.value)
                    }}>
                        <option value=""></option>
                        {props.locais.map((local, i) => (
                            <option key={i} value={local}>{local}</option>
                        ))}
                </select>
            </div>
            
            <div className="select">
                <label>Prioridade</label>
                <select
                    value={props.prioridade}
                    onChange={function (o) {
                        props.setPrioridade(o.target.value)
                    }}>
                        <option value=""></option>
                        {props.prioridades.map((prioridade, i) => (
                            <option key={i} value={prioridade}>{prioridade}</option>
                        ))}
                </select>
            </div>
            <p>Data de abertura: {props.dataAbertura}</p>

            {props.mensagem && (
                <p className={props.sucesso ? "mensagem-sucesso" : "mensagem-erro"}>
                    {props.mensagem}
                </p>
            )}
            <div className="buttons">
                <button type="submit" className="btn-seguir">Salvar</button>
                <Link to="/">Cancelar</Link>
            </div>
        </form>
    )
}

export default Formulario;