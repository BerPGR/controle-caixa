import { useEffect, useState } from "react";
import { Navbar } from "../components/Navbar";
import { usePacienteService } from "../hooks/usePacienteService";
import { useNavigate } from "react-router-dom";

export const RegisterPayment = () => {
  //const [pacientes, setPacientes] = useState<any[]>([]);
  //const [pacienteSelecionado, setPacienteSelecionado] = useState("");
  const [paciente, setPaciente] = useState("");
  const [valorTotal, setValorTotal] = useState("");
  const [diaPagamento, setDiaPagamento] = useState("");
  const [tipoPagamento, setTipoPagamento] = useState("PIX");
  const [valorParcelado, setValorParcelado] = useState("");
  const [observacoes, setObservacoes] = useState("");

  const { createPayment } = usePacienteService();
  const navigate = useNavigate();

 /* useEffect(() => {
    const buscarPacientes = async () => {
      const data = await getPacientes();
      setPacientes(data);
    };
    buscarPacientes();
  }, []);*/

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!paciente || !valorTotal || !diaPagamento) {
      alert("Preencha todos os campos obrigatórios.");
      return;
    }

    const pagamento = {
      pacienteId: paciente,
      valorTotal,
      diaPagamento: new Date(diaPagamento),
      tipoPagamento,
      valorParcelado: tipoPagamento.includes("Crédito") ? valorParcelado : "",
      observacoes,
    };

    try {
      const res = await createPayment(pagamento);
      if (res?.status === "success") {
        alert(res.message);
        navigate("/");
      }
    } catch (err) {
      alert("Erro ao registrar pagamento.");
    }
  };

  return (
    <div className="flex flex-col font-[montserrat] min-h-screen bg-gray-100">
      <Navbar />
      <div className="container mx-auto mt-10 p-8 bg-white shadow-lg rounded-xl max-w-3xl">
        <h1 className="text-3xl font-semibold mb-6 text-center">
          Registrar Pagamento
        </h1>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block font-medium mb-1">Paciente</label>
            {/*<select
              value={pacienteSelecionado}
              onChange={(e) => setPacienteSelecionado(e.target.value)}
              className="w-full border border-gray-300 rounded px-4 py-2"
            >
              <option value="">Selecione um paciente</option>
              {pacientes.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.nome} - {p.email}
                </option>
              ))}
            </select>*/}
             <input
              type="text"
              value={paciente}
              onChange={(e) => setPaciente(e.target.value)}
              placeholder="Fulando da Silva"
              className="w-full border border-gray-300 rounded px-4 py-2"
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Valor total (R$)</label>
            <input
              type="number"
              value={valorTotal}
              onChange={(e) => setValorTotal(e.target.value)}
              placeholder="Ex: 300.00"
              className="w-full border border-gray-300 rounded px-4 py-2"
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Dia do pagamento</label>
            <input
              type="date"
              value={diaPagamento}
              onChange={(e) => setDiaPagamento(e.target.value)}
              className="w-full border border-gray-300 rounded px-4 py-2"
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Tipo de pagamento</label>
            <select
              value={tipoPagamento}
              onChange={(e) => setTipoPagamento(e.target.value)}
              className="w-full border border-gray-300 rounded px-4 py-2"
            >
              <option>PIX</option>
              <option>Dinheiro</option>
              <option>Cartão de Crédito</option>
              <option>Cartão de Débito</option>
            </select>
          </div>

          {tipoPagamento === "Cartão de Crédito" && (
            <div>
              <label className="block font-medium mb-1">
                Parcelamento
              </label>
              <input
                type="text"
                value={valorParcelado}
                onChange={(e) => setValorParcelado(e.target.value)}
                placeholder="Ex: 3x de R$100,00"
                className="w-full border border-gray-300 rounded px-4 py-2"
              />
            </div>
          )}

          <div>
            <label className="block font-medium mb-1">Observações</label>
            <textarea
              rows={3}
              value={observacoes}
              onChange={(e) => setObservacoes(e.target.value)}
              className="w-full border border-gray-300 rounded px-4 py-2 resize-none"
            />
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="cursor-pointer px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
            >
              Registrar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
