import { useQuery } from "@tanstack/react-query"

export function About(){


    const {data, isFetching} = useQuery({queryKey: ["version-app"], queryFn: async () => {
        const response = await window.api.getVersionApp()
        
        return response
    }})

    return(
        <div className="flex-1 flex flex-col py-12 px-10 text-white">
            <h1 className="text-white text-xl lg:text-2xl font-semibold mb-4">
                Sobre
            </h1>

            <p>Projeto Criado no Curso <b>Sujeito Programador</b></p>
            <p>Versão do Projeto: <b>{!isFetching && data && data}</b></p>
        </div>
    )
}