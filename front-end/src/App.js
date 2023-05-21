import { Route, Routes } from "react-router-dom";
import { Cadastro } from "./cadastrarstudio"
import { Login } from './login'
import { Signup } from "./signup";
import { Home } from './home'
import {Studio_Register} from './pages/studio-register/index'
import {StudioList} from './listStudios'

function App() {

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/cadastro" element={<Studio_Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/liststudio" element={<StudioList />} />

      {/* <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} /> */}
    </Routes>
  )
}

export default App;
