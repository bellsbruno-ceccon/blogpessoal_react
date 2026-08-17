import { GithubLogoIcon, LinkedinLogoIcon, ArrowLeftIcon } from "@phosphor-icons/react";
import { Link } from "react-router-dom";

function Perfil() {

    return (
        <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">

            <div className="w-full max-w-5xl">

                <div className="relative overflow-hidden rounded-3xl bg-slate-900 shadow-2xl">

                    <div className="absolute -top-24 -right-24 w-72 h-72 bg-indigo-600 rounded-full blur-3xl opacity-30">
                    </div>

                    <div className="absolute -bottom-32 -left-24 w-72 h-72 bg-purple-600 rounded-full blur-3xl opacity-20">
                    </div>

                    <div className="relative p-8 md:p-12">

                        <div className="max-w-3xl">

                            <p className="text-indigo-400 font-semibold text-lg mb-3">
                                &lt; desenvolvedora /&gt;
                            </p>

                            <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight mb-4">
                                Olá, eu sou
                                <span className="text-indigo-400">
                                    {" "}Isabella.
                                </span>
                            </h1>

                            <h2 className="text-2xl md:text-3xl font-semibold text-slate-200 mb-6">
                                Desenvolvedora Frontend em formação.
                            </h2>

                            <p className="text-slate-400 text-lg leading-relaxed max-w-2xl">
                                Estou construindo minha jornada na tecnologia,
                                desenvolvendo projetos com foco em interfaces web,
                                experiência do usuário e evolução constante em
                                desenvolvimento Frontend.
                            </p>

                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-10">

                            <div className="rounded-xl border border-slate-700 bg-slate-800/70 p-4 text-center">
                                <span className="text-indigo-400 font-bold">
                                    React
                                </span>
                            </div>

                            <div className="rounded-xl border border-slate-700 bg-slate-800/70 p-4 text-center">
                                <span className="text-indigo-400 font-bold">
                                    TypeScript
                                </span>
                            </div>

                            <div className="rounded-xl border border-slate-700 bg-slate-800/70 p-4 text-center">
                                <span className="text-indigo-400 font-bold">
                                    Tailwind CSS
                                </span>
                            </div>

                            <div className="rounded-xl border border-slate-700 bg-slate-800/70 p-4 text-center">
                                <span className="text-indigo-400 font-bold">
                                    JavaScript
                                </span>
                            </div>

                        </div>

                        <div className="grid md:grid-cols-2 gap-4 mt-8">

                            <a
                                href="https://github.com/bellsbruno-ceccon"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group flex items-center gap-4 rounded-2xl border border-slate-700 bg-slate-800 p-5 hover:bg-slate-700 transition"
                            >

                                <GithubLogoIcon
                                    size={42}
                                    weight="bold"
                                    className="text-white"
                                />

                                <div>

                                    <p className="text-slate-400 text-sm">
                                        Código e projetos
                                    </p>

                                    <p className="text-white text-xl font-bold">
                                        GitHub
                                    </p>

                                </div>

                                <span className="ml-auto text-indigo-400 text-xl group-hover:translate-x-1 transition">
                                    →
                                </span>

                            </a>

                            <a
                                href="https://www.linkedin.com/in/isabellabruno97"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group flex items-center gap-4 rounded-2xl border border-slate-700 bg-slate-800 p-5 hover:bg-slate-700 transition"
                            >

                                <LinkedinLogoIcon
                                    size={42}
                                    weight="bold"
                                    className="text-white"
                                />

                                <div>

                                    <p className="text-slate-400 text-sm">
                                        Perfil profissional
                                    </p>

                                    <p className="text-white text-xl font-bold">
                                        LinkedIn
                                    </p>

                                </div>

                                <span className="ml-auto text-indigo-400 text-xl group-hover:translate-x-1 transition">
                                    →
                                </span>

                            </a>

                        </div>

                        <div className="flex justify-center md:justify-start mt-8">

                            <Link
                                to="/home"
                                className="flex items-center gap-2 rounded-xl bg-indigo-500 hover:bg-indigo-600 text-white font-bold px-6 py-3 transition"
                            >

                                <ArrowLeftIcon
                                    size={20}
                                    weight="bold"
                                />

                                Voltar ao Blog

                            </Link>

                        </div>

                    </div>

                </div>

            </div>

        </div>
    );
}

export default Perfil;