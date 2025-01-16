import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { ArrowLeft, Trash } from "phosphor-react";
import { Link, useNavigate, useParams } from "react-router-dom"

export function Detail(){
    const {id} = useParams<{id:string}>()
    const navigate = useNavigate()

    const queryClient = useQueryClient();

    const {data, isFetching} = useQuery({queryKey: ["customer"], queryFn: async () => {
        const response = await window.api.fetchCustomerById(id!)
        
        return response
    }})

    const {isPending, mutateAsync: handlerDeleteCustomer} = useMutation({
        mutationFn: async (id: string) => {
            try{
                await window.api.deleteCustomer(id)
                
            }catch(err){
                console.log(err);
            }
        },
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: 'customers'})
            navigate("/")
        }
    })

    return(
        <main className="flex-1 flex flex-col py-12 px-10 text-white">
            <Link to="/" className="flex items-center gap-2 mb-2">
                <ArrowLeft className="w-6 h-6 text-white"/>
                <span>Voltar</span>
            </Link>

            <h1 className="text-white text-xl lg:text-3xl font-semibold mb-4">
                Detalhes do Cliente
            </h1>

            <section className="flex flex-col gap-6 w-full">
                {!isFetching && data && (
                    <article className="w-full relative flex flex-col gap-1">
                        <section className="bg-gray-800 rounded px-4 py-3">
                            <p className="mb-2 font-semibold text-lg">
                                {data.name}
                            </p>
                            <p>
                                <span className="font-semibold">Email: {data.email}</span>
                            </p>
                            {data.address && (
                                <p>
                                    <span className="font-semibold">Endereço: {data.address}</span>
                                </p>
                            )}
                            {data.phone && (
                                <p>
                                    <span className="font-semibold">Telefone: {data.phone}</span>
                                </p>
                            )}

                            <div className="absolute -top-3 right-2 z-20">
                                <button className="bg-red-500 hover:bg-red-600 p-2 rounded-full"
                                    onClick={() => handlerDeleteCustomer(data._id)}
                                    disabled={isPending}
                                >
                                    <Trash className="text-white h-6 w-6"/>
                                </button>
                            </div>
                        </section>

                        <section className="bg-gray-800 rounded px-4 py-3">
                            <p>
                                <span className="font-semibold">Cargo: {data.role}</span>
                            </p> 
                            <p>
                                <span className="font-semibold">Status Atual: {data.status ? "Ativo" : "Inativo"}</span>
                            </p>      
                        </section>
                    </article>
                )}
            </section>
        </main>
    )
}