import { Link } from "react-router-dom";

export function Home(){

    async function handleAdd() {
        const response = await window.api.fetchAllCustomers()
        
        console.log(response);
        
    }

    async function handleCustomerById(){
        const id = "bdcbcbaf-fde9-4e0e-9489-75cc5d27753a"
        const response = await window.api.fetchCustomerById(id)
        
        console.log(response);
    }
   
    async function handlerDeleteCustomer(){
        const id = "bdcbcbaf-fde9-4e0e-9489-75cc5d27753a"
        const response = await window.api.deleteCustomer(id)
        
        console.log(response);
    }
    return(
        <div>
            <h1>Pagina Home</h1>
            <Link to={'/create'}>Ir para Pagina create</Link>
            <br/><br/>

            <button onClick={handleAdd}>
                TESTAR
            </button>
            <br/><br/>
            
            <button onClick={handleCustomerById}>
                BUSCAR USER PELO ID
            </button>
            <br/><br/>

            <button onClick={handlerDeleteCustomer}>
                DELETE USER PELO ID
            </button>
        </div>
    )
}