import {
    useCallback,
    useContext,
    useEffect,
    useState,
    type ChangeEvent,
    type FormEvent
} from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ClipLoader } from "react-spinners";

import type Postagem from "../../../models/Postagem";
import type Tema from "../../../models/Tema";
import { AuthContext } from "../../../contexts/AuthContext";
import {
    atualizar,
    buscar,
    cadastrar
} from "../../../services/Service";
import { ToastAlerta } from "../../../utils/ToastAlerta";

function FormPostagem() {

    const navigate = useNavigate();

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [temas, setTemas] = useState<Tema[]>([]);
    const [tema, setTema] = useState<Tema>({} as Tema);
    const [postagem, setPostagem] = useState<Postagem>({} as Postagem);

    const { usuario, handleLogout } = useContext(AuthContext);

    const token = usuario.token;

    const { id } = useParams<{ id: string }>();

    const buscarPostagemPorId = useCallback(async (idPostagem: string) => {

        try {

            await buscar(
                `/postagens/${idPostagem}`,
                setPostagem,
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

    }, [token, handleLogout]);

    const buscarTemaPorId = useCallback(async (idTema: string) => {

        try {

            await buscar(
                `/temas/${idTema}`,
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

    }, [token, handleLogout]);

    const buscarTemas = useCallback(async () => {

        try {

            await buscar(
                "/temas",
                setTemas,
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

    }, [token, handleLogout]);

    useEffect(() => {

        if (token === "") {

            ToastAlerta(
                "Você precisa estar logado!",
                "info"
            );

            navigate("/");
        }

    }, [token, navigate]);

    useEffect(() => {

        buscarTemas();

        if (id !== undefined) {
            buscarPostagemPorId(id);
        }

    }, [id, buscarTemas, buscarPostagemPorId]);

    function atualizarEstado(
        e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) {

        setPostagem({
            ...postagem,
            [e.target.name]: e.target.value,
            tema: tema,
            usuario: usuario
        });

    }

    function retornar() {
        navigate("/postagens");
    }

    async function gerarNovaPostagem(
        e: FormEvent<HTMLFormElement>
    ) {

        e.preventDefault();

        setIsLoading(true);

        if (id !== undefined) {

            try {

                await atualizar(
                    `/postagens/${id}`,
                    postagem,
                    setPostagem,
                    {
                        headers: {
                            Authorization: token
                        }
                    }
                );

                ToastAlerta(
                    "Postagem atualizada com sucesso!",
                    "sucesso"
                );

            } catch (error: unknown) {

                if (String(error).includes("401")) {

                    handleLogout();

                } else {

                    ToastAlerta(
                        "Erro ao atualizar a Postagem!",
                        "erro"
                    );

                }

            }

        } else {

            try {

                await cadastrar(
                    "/postagens",
                    postagem,
                    setPostagem,
                    {
                        headers: {
                            Authorization: token
                        }
                    }
                );

                ToastAlerta(
                    "Postagem cadastrada com sucesso!",
                    "sucesso"
                );

            } catch (error: unknown) {

                if (String(error).includes("401")) {

                    handleLogout();

                } else {

                    ToastAlerta(
                        "Erro ao cadastrar a Postagem!",
                        "erro"
                    );

                }

            }

        }

        setIsLoading(false);

        retornar();
    }

    const carregandoTema = tema.id === undefined;

    return (
        <div className="container flex flex-col mx-auto items-center">

            <h2 className="text-slate-900 text-3xl font-bold mb-4">
                {id === undefined
                    ? "Cadastrar Postagem"
                    : "Editar Postagem"}
            </h2>

            <form
                className="flex flex-col w-2/3 gap-4"
                onSubmit={gerarNovaPostagem}
            >

                <div className="flex flex-col gap-2">

                    <label htmlFor="titulo">
                        Título da Postagem
                    </label>

                    <input
                        type="text"
                        id="titulo"
                        name="titulo"
                        placeholder="Título"
                        value={postagem.titulo || ""}
                        onChange={atualizarEstado}
                        required
                        className="border-2 border-slate-700 rounded p-2"
                    />

                </div>

                <div className="flex flex-col gap-2">

                    <label htmlFor="texto">
                        Texto da Postagem
                    </label>

                    <textarea
                        id="texto"
                        name="texto"
                        placeholder="Texto"
                        value={postagem.texto || ""}
                        onChange={atualizarEstado}
                        required
                        className="border-2 border-slate-700 rounded p-2"
                    />

                </div>

                <div className="flex flex-col gap-2">

                    <label htmlFor="tema">
                        Tema da Postagem
                    </label>

                    <select
                        id="tema"
                        name="tema"
                        value={tema.id || ""}
                        onChange={(e) => buscarTemaPorId(e.currentTarget.value)}
                        className="border-2 border-slate-700 rounded p-2"
                    >

                        <option value="">
                            Selecione um tema
                        </option>

                        {temas.map((tema) => (
                            <option
                                value={tema.id}
                                key={tema.id}
                            >
                                {tema.descricao}
                            </option>
                        ))}

                    </select>

                </div>

                <button
                    type="submit"
                    disabled={carregandoTema}
                    className="rounded bg-indigo-400 hover:bg-indigo-900 disabled:bg-slate-400 text-white font-bold py-2"
                >

                    {isLoading ? (
                        <ClipLoader
                            color="#ffffff"
                            size={20}
                        />
                    ) : (
                        id === undefined
                            ? "Cadastrar"
                            : "Atualizar"
                    )}

                </button>

            </form>

        </div>
    );
}

export default FormPostagem;