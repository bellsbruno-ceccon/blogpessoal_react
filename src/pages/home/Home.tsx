import ListaPostagens from '../../componentes/postagem/listapostagens/ListaPostagens'

function Home() {
  return (
    <>
      <div className="bg-indigo-900 text-white flex flex-col items-center justify-center py-4">

        <div className="container flex flex-col items-center justify-center py-4">

          <h1 className="text-5xl font-bold">
            Seja Bem Vinde!
          </h1>

          <p className="text-xl py-4">
            Expresse aqui seus pensamentos e opiniões
          </p>

          <button className="px-4 py-2 border-white border-solid border-2 rounded">
            Nova Postagem
          </button>

          <div className="py-4">

            <img
              src="https://i.imgur.com/fyfri1v.png"
              alt="Imagem da página inicial do Blog Pessoal"
              className="w-2/3"
            />

          </div>

        </div>

      </div>

      <ListaPostagens />

    </>
  )
}

export default Home