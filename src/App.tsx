import './App.css'
import 'react-toastify/dist/ReactToastify.css'

import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'

import Navbar from './componentes/navbar/Navbar'
import Home from './pages/home/Home'
import Footer from './componentes/footer/Footer'
import Cadastro from './pages/cadastro/Cadastro'
import Login from './pages/login/Login'
import Perfil from './pages/perfil/Perfil'

import ListaTemas from './componentes/tema/listatemas/ListaTemas'
import FormTema from './componentes/tema/formtema/FormTema'
import DeletarTema from './componentes/tema/deletartema/DeletarTema'

import ListaPostagens from './componentes/postagem/listapostagens/ListaPostagens'
import FormPostagem from './componentes/postagem/formpostagem/FormPostagem'
import DeletarPostagem from './componentes/postagem/deletarpostagem/DeletarPostagem'

function App() {

  return (
    <BrowserRouter>

      <ToastContainer />

      <Navbar />

      <div className="min-h-[80vh]">

        <Routes>

          <Route path="/" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/cadastro" element={<Cadastro />} />
          <Route path="/perfil" element={<Perfil />} />

          <Route path="/temas" element={<ListaTemas />} />

          <Route path="/cadastrartema" element={<FormTema />} />
          <Route path="/editartema/:id" element={<FormTema />} />
          <Route path="/deletartema/:id" element={<DeletarTema />} />

          <Route path="/postagens" element={<ListaPostagens />} />
          <Route path="/cadastrarpostagem" element={<FormPostagem />} />
          <Route path="/editarpostagem/:id" element={<FormPostagem />} />
          <Route
            path="/deletarpostagem/:id"
            element={<DeletarPostagem />}
          />

        </Routes>

      </div>

      <Footer />

    </BrowserRouter>
  )
}

export default App