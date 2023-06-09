import { Route, Routes } from "react-router-dom";
import { Login } from './pages/signin/index'
import { Signup } from "./pages/signup/index";
import { Home } from './home'
import { Studio_Register } from './pages/studio-register/index'
import { StudioList } from "./pages/studio-listing/index.js";
import { StudioDetails } from "./pages/studio-view";
import Instrument_Register from "./pages/instruments-register";
import { StudioSchedule } from "./pages/studio-scheduling";
import { UserProfile } from "./pages/user-page";
import PrivateRoute from "./helpers/PrivateRoute";
import { UserStudios } from "./pages/user-studios";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

function App() {

  return (
    <>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cadastrar" element={<Signup />} />
        <Route path="/criar-estudio" element={<Studio_Register />} />
        <Route path="/perfil" element={<UserProfile />} />
        <Route path="/meus-estudios" element={<UserStudios />} />
        <Route path="/detalhes-estudio/:id" element={<StudioDetails />} />
        <Route path="/estudios/:estudio_id/cadastrar-agenda" element={<StudioSchedule />} />
        <Route path="/estudios/:estudio_id/cadastrar-instrumentos" element={<Instrument_Register />} />
        <Route path="/listar-estudios" element={
          <PrivateRoute>
            <StudioList />
          </PrivateRoute>
        }
        />
      </Routes>
    </>
  )
}

export default App;
