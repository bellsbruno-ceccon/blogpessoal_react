import {
    useContext,
    useEffect,
    useState,
    type ChangeEvent,
    type FormEvent
} from "react";

import { Link, useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";

import type UsuarioLogin from "../../models/UsuarioLogin";
import { AuthContext } from "../../contexts/AuthContext";

function Login() {

    const navigate = useNavigate();

    const { usuario, handleLogin, isLoading } = useContext(AuthContext);

    const [usuarioLogin, setUsuarioLogin] = useState<UsuarioLogin>(
        {} as UsuarioLogin
    );

    useEffect(() => {

        if (usuario.token !== "") {
            navigate("/home");
        }

    }, [usuario, navigate]);

    function atualizarEstado(
        e: ChangeEvent<HTMLInputElement>
    ) {

        setUsuarioLogin({
            ...usuarioLogin,
            [e.target.name]: e.target.value
        });

    }

    async function login(
        e: FormEvent<HTMLFormElement>
    ) {

        e.preventDefault();

        await handleLogin(usuarioLogin);

    }

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 h-screen place-items-center font-bold">

            <form
                className="flex justify-center items-center flex-col w-2/3 gap-4"
                onSubmit={login}
            >

                <h2 className="text-5xl text-slate-900">
                    Login
                </h2>

                <div className="flex flex-col w-full">

                    <label htmlFor="usuario">
                        Usuário
                    </label>

                    <input
                        type="text"
                        id="usuario"
                        name="usuario"
                        placeholder="Usuário"
                        className="border-2 border-slate-700 rounded p-2"
                        value={usuarioLogin.usuario || ""}
                        onChange={(e) => atualizarEstado(e)}
                    />

                </div>

                <div className="flex flex-col w-full">

                    <label htmlFor="senha">
                        Senha
                    </label>

                    <input
                        type="password"
                        id="senha"
                        name="senha"
                        placeholder="Senha"
                        className="border-2 border-slate-700 rounded p-2"
                        value={usuarioLogin.senha || ""}
                        onChange={(e) => atualizarEstado(e)}
                    />

                </div>

                <button
                    type="submit"
                    className="rounded bg-indigo-400 flex justify-center hover:bg-indigo-900 text-white w-1/2 py-2"
                >

                    {isLoading ? (
                        <ClipLoader
                            color="#ffffff"
                            size={24}
                        />
                    ) : (
                        "Entrar"
                    )}

                </button>

                <hr className="border-slate-800 w-full" />

                <p>
                    Ainda não tem uma conta?
                    <br />

                    <Link
                        to="/cadastro"
                        className="text-indigo-900 hover:underline"
                    >
                        Cadastre-se
                    </Link>

                </p>

            </form>

            <div
                className="bg-[url('https://i.imgur.com/ZZFAmzo.jpg')] lg:block hidden bg-no-repeat w-full h-screen bg-cover bg-center"
            />

        </div>
    );
}

export default Login;