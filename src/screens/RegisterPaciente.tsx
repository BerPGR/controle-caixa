import { useState } from "react";
import { Navbar } from "../components/Navbar";
import { InputMask } from "@react-input/mask";
import axios from "axios";
import { usePacienteService } from "../hooks/usePacienteService";
import { useNavigate } from "react-router-dom";

export const RegisterPaciente = () => {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [cpf, setCpf] = useState("");
  const [cep, setCep] = useState("");
  const [endereco, setEndereco] = useState("");
  const [tipoPagamento, setTipoPagamento] = useState("PIX");
  const [diaPagamento, setDiaPagamento] = useState("");
  const [valorParcelado, setValorParcelado] = useState("");
  const [observacoes, setObservacoes] = useState("");

  const { createPaciente } = usePacienteService();
  const navigate = useNavigate()

  const buscarEndereco = async (cepLimpo: string) => {
    try {
      const response = await axios.get(
        `https://viacep.com.br/ws/${cepLimpo}/json/`
      );
      const data = response.data;
      if (!data.erro) {
        setEndereco(
          `${data.logradouro}, ${data.bairro}, ${data.localidade} - ${data.uf}`
        );
      } else {
        setEndereco("CEP não encontrado");
      }
    } catch (err) {
      console.error("Erro ao buscar endereço:", err);
      setEndereco("Erro ao buscar CEP");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const dadosPaciente = {
      nome,
      email,
      cpf,
      cep,
      endereco,
      tipoPagamento,
      diaPagamento,
      valorParcelado,
      observacoes,
    };

    console.log("Paciente:", dadosPaciente);
    try {
      const data = await createPaciente(dadosPaciente);
      if (data?.status === "success") {
        alert(data.message)
        setTimeout(() => {
          navigate("/")
        }, 2000)
      }
    } catch (e) {
      throw `Erro ao criar paciente: ${e}`;
    }
  };

  return (
    <div className="flex flex-col font-[montserrat] min-h-screen bg-gray-100">
      <Navbar />
      <div className="container mx-auto mt-10 p-8 bg-white shadow-lg rounded-xl max-w-3xl">
        <h1 className="text-3xl font-semibold mb-6 text-center">
          Cadastro de Paciente
        </h1>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block font-medium mb-1">Nome completo</label>
            <input
              type="text"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block font-medium mb-1">CPF</label>
            <InputMask
              mask="###.###.###-##"
              replacement={{ "#": /\d/ }}
              value={cpf}
              onChange={(e) => setCpf(e.target.value)}
              placeholder="000.000.000-00"
              type="text"
              className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block font-medium mb-1">CEP</label>
            <InputMask
              mask="#####-###"
              replacement={{ "#": /\d/ }}
              value={cep}
              onChange={(e) => {
                const value = e.target.value;
                setCep(value);

                const onlyNumbers = value.replace(/\D/g, "");
                if (onlyNumbers.length === 8) {
                  buscarEndereco(onlyNumbers);
                }
              }}
              placeholder="00000-000"
              type="text"
              className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Endereço</label>
            <input
              type="text"
              value={endereco}
              onChange={(e) => setEndereco(e.target.value)}
              className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="cursor-pointer px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
            >
              Cadastrar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
