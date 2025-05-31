import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home } from "../screens/Home";
import { RegisterPaciente } from "../screens/RegisterPaciente";
import { RegisterPayment } from "../screens/RegisterPayment";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cadastrar" element={<RegisterPaciente />} />
        <Route path="/registrar-pagamento" element={<RegisterPayment />} />
      </Routes>
    </BrowserRouter>
  );
}
