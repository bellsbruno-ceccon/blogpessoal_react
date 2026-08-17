import { Link } from "react-router-dom";
import type Tema from "../../../models/Tema";

interface CardTemaProps {
    tema: Tema;
}

function CardTema({ tema }: CardTemaProps) {

    return (
        <div className="border-slate-900 border rounded-lg overflow-hidden flex flex-col">

            <p className="p-8 text-3xl bg-slate-200 h-full">
                {tema.descricao}
            </p>

            <div className="flex">

                <Link
                    to={`/editartema/${tema.id}`}
                    className="w-1/2 bg-indigo-400 hover:bg-indigo-900 text-white font-bold py-2 px-4 flex justify-center"
                >
                    Editar
                </Link>

                <Link
                    to={`/deletartema/${tema.id}`}
                    className="w-1/2 bg-red-400 hover:bg-red-900 text-white font-bold py-2 px-4 flex justify-center"
                >
                    Deletar
                </Link>

            </div>

        </div>
    );
}

export default CardTema;