import { NewCustomer } from "../../../shared/types/ipc"

export function Create(){

    async function handleAddCustomer() {

        const doc: NewCustomer = {
            name: "matheus f",
            email: "matheus@gmail.com",
            phone: "11999999999",
            address: "Rua A, 123",
            role: "FrontEnd",
            status: true
        }

        const response = await window.api.addCustomer(doc)
        console.log(response);
        
    }

    return(
        <div>
            <h1>Pagina Novo Cliente</h1>

            <button onClick={handleAddCustomer}>CADASTRAR</button>
        </div>
    )
}