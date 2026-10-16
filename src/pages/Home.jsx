import ListaChamados from "../components/ListaChamados"

function Home(props) {
    return (
        <div>
            <ListaChamados chamados={props.chamados} />
        </div>
    )

}

export default Home