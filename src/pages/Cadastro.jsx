import FormularioChamado from "../components/FormularioChamado"

function Formulario(props) {
    return (
        <div>
            <h2>Cadastrar Chamado</h2>
            <FormularioChamado aoSalvar={props.aoSalvar} />
        </div>
    );
}

export default Formulario;