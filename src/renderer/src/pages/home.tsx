import { Link } from "react-router-dom";

export function Home(){
    return(
        <div>
            <h1>Pagina Home</h1>

            <Link to={'/create'}>Ir para Pagina create</Link>
        </div>
    )
}