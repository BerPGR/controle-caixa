import { Link } from "react-router-dom";

export const Navbar = () => {
  return (
    <nav className="min-h-20 bg-white w-full flex items-center justify-between px-36">
      <h1 className="text-2xl font-bold">Controle de Caixa</h1>

      <div className="gap-5 flex">
        <Link
          to="/"
          className="relative px-7 py-2 text-[18px] font-medium rounded-lg border border-[#e8e8e8] bg-[#e8e8e8] text-[#090909] shadow-[6px_6px_12px_#c5c5c5,_-6px_-6px_12px_#ffffff] transition-all duration-300 ease-in hover:bg-[#009087] hover:text-white active:scale-95 active:shadow-inner"
        >
          Home
        </Link>
        <Link
          to="/cadastrar"
          className="relative px-7 py-2 text-[18px] font-medium rounded-lg border border-[#e8e8e8] bg-[#e8e8e8] text-[#090909] shadow-[6px_6px_12px_#c5c5c5,_-6px_-6px_12px_#ffffff] transition-all duration-300 ease-in hover:bg-[#009087] hover:text-white active:scale-95 active:shadow-inner"
        >
          Cadastrar Paciente
        </Link>
      </div>
    </nav>
  );
};
