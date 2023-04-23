import {Route, Routes } from "react-router-dom";
import { Cadastro } from "./cadastrarstudio"
import {Navegacao} from "./navegacao"


function App() {
  return <Routes>
    <Route/>
    <Route path="/" element={<Navegacao/> }/>
    <Route path="/cadastro" element={<Cadastro/> }/>

  </Routes>
}

export default App;
