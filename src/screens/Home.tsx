import { Link } from "react-router-dom";
import { Navbar } from "../components/Navbar";
import { usePacienteService } from "../hooks/usePacienteService";
import { useEffect, useState } from "react";

export const Home = () => {
  const { getPayments, getPacientes } = usePacienteService();
  const [pagamentos, setPagamentos] = useState<any[]>([]);
  const [pacientesMap, setPacientesMap] = useState<Record<string, string>>({});

  useEffect(() => {
    const buscarDados = async () => {
      const [pagamentosData, pacientesData] = await Promise.all([
        getPayments(),
        getPacientes(),
      ]);

      // Cria um mapa id → nome
      const mapaPacientes: Record<string, string> = {};
      pacientesData.forEach((p: any) => {
        mapaPacientes[p.id] = p.nome;
      });

      setPagamentos(pagamentosData);
      setPacientesMap(mapaPacientes);
    };

    buscarDados();
  }, []);

  return (
    <div className="min-h-screenfont-[montserrat]">
      <Navbar />
      <div className="container mx-auto mt-10 p-8 bg-white shadow-lg rounded-xl max-w-6xl">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-semibold">Seus Pagamentos</h1>
          <Link
            to="/registrar-pagamento"
            className="relative px-7 py-2 text-[18px] font-medium rounded-lg border border-[#e8e8e8] bg-[#e8e8e8] text-[#090909] shadow-[6px_6px_12px_#c5c5c5,_-6px_-6px_12px_#ffffff] transition-all duration-300 ease-in hover:bg-[#009087] hover:text-white active:scale-95 active:shadow-inner"
          >
            Registrar Pagamento
          </Link>
        </div>

        {pagamentos.length == 0 ? (
          <>
            <h1 className="text-center text-4xl font-medium pt-30">
              Você não tem pagamentos registrados!
            </h1>
            <p className="text-center pt-8">
              Registre um pagamento para ver os dados
            </p>
          </>
        ) : (
          <div className="overflow-x-auto mt-6">
            <table className="min-w-full text-left border">
              <thead>
                <tr className="bg-gray-200">
                  <th className="py-2 px-4 border">Paciente ID</th>
                  <th className="py-2 px-4 border">Valor</th>
                  <th className="py-2 px-4 border">Data</th>
                  <th className="py-2 px-4 border">Tipo</th>
                  <th className="py-2 px-4 border">Parcelamento</th>
                  <th className="py-2 px-4 border">Observações</th>
                </tr>
              </thead>
              <tbody>
                {pagamentos.map((p: any) => (
                  <tr key={p.id} className="border-t hover:bg-gray-50">
                    <td className="py-2 px-4 border">{pacientesMap[p.pacienteId] || "Desconhecido"}</td>
                    <td className="py-2 px-4 border">R$ {p.valorTotal}</td>
                    <td className="py-2 px-4 border">
                      {new Date(
                        p.diaPagamento.seconds * 1000
                      ).toLocaleDateString()}
                    </td>
                    <td className="py-2 px-4 border">{p.tipoPagamento}</td>
                    <td className="py-2 px-4 border">
                      {p.valorParcelado || "-"}
                    </td>
                    <td className="py-2 px-4 border">{p.observacoes}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};
