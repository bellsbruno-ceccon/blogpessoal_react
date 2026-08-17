import { useCallback, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CardPostagem from "../cardpostagem/CardPostagem";
import type Postagem from "../../../models/Postagem";
import { AuthContext } from "../../../contexts/AuthContext";
import { buscar } from "../../../services/Service";

function ListaPostagens() {

    const navigate = useNavigate();

    const [postagens, setPostagens] = useState<Postagem[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const { usuario, handleLogout } = useContext(AuthContext);

    const token = usuario.token;

    const buscarPostagens = useCallback(async () => {

        try {

            const resposta = await buscar<Postagem[]>(
                "/postagens",
                setPostagens,
                {
                    headers: {
                        Authorization: token
                    }
                }
            );

            return resposta;

        } catch (error: unknown) {

            if (String(error).includes("401")) {
                handleLogout();
            }

        }

    }, [token, handleLogout]);

    useEffect(() => {

        if (token === "") {

            navigate("/");

        }

    }, [token, navigate]);

    useEffect(() => {

        if (token !== "") {

            const carregarPostagens = async () => {

                setIsLoading(true);

                await buscarPostagens();

                setIsLoading(false);

            };

            carregarPostagens();

        }

    }, [token, buscarPostagens]);

    return (
        <div className="flex justify-center w-full my-4">

            <div className="container flex flex-col mx-2">

                <h2 className="text-3xl font-bold text-center mb-4">
                    Postagens
                </h2>

                {isLoading && (
                    <div className="flex justify-center">
                        <span className="text-lg">
                            Carregando postagens...
                        </span>
                    </div>
                )}

                {!isLoading && postagens.length === 0 && (
                    <div className="flex justify-center">
                        <span className="text-lg">
                            Nenhuma postagem encontrada.
                        </span>
                    </div>
                )}

                <div className="container mx-auto my-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">

                    {postagens.map((postagem) => (
                        <CardPostagem
                            key={postagem.id}
                            postagem={postagem}
                        />
                    ))}

                </div>

            </div>

        </div>
    );
}

export default ListaPostagens;