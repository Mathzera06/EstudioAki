import { Route, Routes } from "react-router-dom";
import { Login } from './login'
import { Signup } from "./signup";
import { Home } from './home'
import { Studio_Register } from './pages/studio-register/index'
import { StudioList } from './listStudios'
import { StudioDetails } from "./pages/studio-view";
import Instrument_Register from "./pages/instruments-register";
import PrivateRoute from "./helpers/PrivateRoute";

function App() {

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/cadastrar" element={<Signup />} />
      <Route path="/criar-estudio" element={<Studio_Register />} />
      <Route path="/detalhes-estudio/:id" element={<StudioDetails />} />
      <Route path="/cadastrar-instrumentos/:id" element={<Instrument_Register />} />
      <Route path="/listar-estudios" element={
        <PrivateRoute>
          <StudioList />
        </PrivateRoute>
      }
      />
    </Routes>
  )
}

export default App;
