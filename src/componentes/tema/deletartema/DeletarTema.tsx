import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ClipLoader } from "react-spinners";

import { AuthContext } from "../../../contexts/AuthContext";
import type Tema from "../../../models/Tema";
import { buscar, deletar } from "../../../services/Service";
import { ToastAlerta } from "../../../utils/ToastAlerta";

function DeletarTema() {

    const navigate = useNavigate();

    const [tema, setTema] = useState<Tema>({} as Tema);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const { usuario, handleLogout } = useContext(AuthContext);
    const token = usuario.token;

    const { id } = useParams<{ id: string }>();

    useEffect(() => {

        if (token === "") {

            ToastAlerta(
                "Você precisa estar logado!",
                "info"
            );

            navigate("/");

            return;
        }

        if (id === undefined) {
            return;
        }

        const buscarTema = async () => {

            try {

                await buscar(
                    `/temas/${id}`,
                    setTema,
                    {
                        headers: {
                            Authorization: token
                        }
                    }
                );

            } catch (error: unknown) {

                if (String(error).includes("401")) {
                    handleLogout();
                }

            }

        };

        buscarTema();

    }, [token, id, navigate, handleLogout]);

    async function deletarTema() {

        setIsLoading(true);

        try {

            await deletar(
                `/temas/${id}`,
                {
                    headers: {
                        Authorization: token
                    }
                }
            );

            ToastAlerta(
                "Tema deletado com sucesso!",
                "sucesso"
            );

        } catch (error: unknown) {

            if (String(error).includes("401")) {

                handleLogout();

            } else {

                ToastAlerta(
                    "Erro ao deletar o tema.",
                    "erro"
                );

            }

        }

        setIsLoading(false);
        navigate("/temas");
    }

    function retornar() {
        navigate("/temas");
    }

    return (
        <div className="container mx-auto my-4">

            <h1 className="text-4xl text-center my-4">
                Deletar Tema
            </h1>

            <div className="flex justify-center">

                <div className="flex flex-col rounded-2xl overflow-hidden w-2/3 shadow-lg">

                    <header className="py-4 px-6 bg-indigo-900 text-white text-2xl">
                        Você tem certeza que deseja deletar este tema?
                    </header>

                    <div className="p-8 text-3xl bg-slate-200 h-full">
                        {tema.descricao}
                    </div>

                    <div className="flex">

                        <button
                            className="w-1/2 py-2 bg-slate-400 hover:bg-slate-500 text-white flex justify-center"
                            onClick={retornar}
                        >
                            Não
                        </button>

                        <button
                            className="w-1/2 py-2 bg-red-500 hover:bg-red-700 text-white flex justify-center"
                            onClick={deletarTema}
                        >
                            {isLoading ? (
                                <ClipLoader
                                    color="#ffffff"
                                    size={24}
                                />
                            ) : (
                                <span>Sim</span>
                            )}
                        </button>

                    </div>

                </div>

            </div>

        </div>
    );
}

export default DeletarTema;