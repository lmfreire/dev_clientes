import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Link } from "react-router-dom";

export function Home(){
    const queryClient = useQueryClient();

    const {data} = useQuery({queryKey: ["customers"], queryFn: async () => {
        const response = await window.api.fetchAllCustomers()
        
        return response
    }})

    // async function handleAdd() {
    //     const response = await window.api.fetchAllCustomers()
        
    //     console.log(response);
        
    // }

    // async function handleCustomerById(){
    //     const id = "bdcbcbaf-fde9-4e0e-9489-75cc5d27753a"
    //     const response = await window.api.fetchCustomerById(id)
        
    //     console.log(response);
    // }
   
    // async function handlerDeleteCustomer(){
    //     const id = "bdcbcbaf-fde9-4e0e-9489-75cc5d27753a"
    //     const response = await window.api.deleteCustomer(id)
        
    //     console.log(response);
    // }

    return(
        <div className="flex-1 flex flex-col py-12 text-white">
            <div className="px-10">
                <h1 className="text-white text-xl lg:text-2xl font-semibold mb-4">
                    Todos Clientes
                </h1>
            </div>

            <section className="flex flex-col gap-6 w-full h-screen overflow-y-auto px-10 pb-[200px]">
                {data?.map((customer) => (
                    <Link to="/" key={customer._id} className="
                        bg-gray-800 px-4 py-3 rounded
                    ">
                        <p className="mb-2 font-semibold text-lg">{customer.name}</p>
                        <p><span className="font-semibold">Email: </span>{customer.email}</p>
                        {customer.phone && (
                            <p>
                                <span className="font-semibold">Telefone: </span>
                                {customer.phone}
                            </p>
                        )}
                    </Link>
                ))}
            </section>
        </div>
    )
}