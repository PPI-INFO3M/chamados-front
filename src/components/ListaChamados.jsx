import CardChamado from "./CardChamado";

function ListaChamados(props) {
    const cards = []

    if (props.carregando) {
        return <p>Carregando chamados...</p>
    }

    if (props.chamados.length === 0) {
        return <p>Nenhum chamado encontrado.</p>
    }

    for (let i = 0; i < props.chamados.length; i++) {
        const chamado = props.chamados[i];
        cards.push(
            <CardChamado 
                key={chamado.id}
                chamado={chamado}
            />
        );
    }

    return (
        <div className="lista">
            {cards}
        </div>
    )
}

export default ListaChamados