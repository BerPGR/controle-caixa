import { Link } from "react-router-dom";
import { Navbar } from "../components/Navbar";
import { usePacienteService } from "../hooks/usePacienteService";
import { useEffect, useState } from "react";

export const Home = () => {
  const { getPayments, getPacientes } = usePacienteService();
  const [pagamentos, setPagamentos] = useState<any[]>([]);
  //const [pacientesMap, setPacientesMap] = useState<Record<string, string>>({});

  useEffect(() => {
    const buscarDados = async () => {
      const [pagamentosData, pacientesData] = await Promise.all([
        getPayments(),
        getPacientes(),
      ]);

      const mapaPacientes: Record<string, string> = {};
      pacientesData.forEach((p: any) => {
        mapaPacientes[p.id] = p.nome;
      });

      const pagamentosOrdenados = pagamentosData.sort((a: any, b: any) => {
        const dateA = new Date(
          a.diaPagamento?.seconds
            ? a.diaPagamento.seconds * 1000
            : a.diaPagamento
        );
        const dateB = new Date(
          b.diaPagamento?.seconds
            ? b.diaPagamento.seconds * 1000
            : b.diaPagamento
        );
        return dateB.getTime() - dateA.getTime(); // ordem decrescente
      });

      setPagamentos(pagamentosOrdenados);
      //setPacientesMap(mapaPacientes);
    };

    buscarDados();
  }, []);

  return (
    <div className="min-h-screen font-[montserrat]">
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
            <table className="min-w-full table-auto border-collapse text-sm">
              <thead className="bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 uppercase text-xs">
                <tr>
                  <th className="px-4 py-3 text-left border-b">Paciente</th>
                  <th className="px-4 py-3 text-left border-b">Valor</th>
                  <th className="px-4 py-3 text-left border-b">Data</th>
                  <th className="px-4 py-3 text-left border-b">Tipo</th>
                  <th className="px-4 py-3 text-left border-b">Parcelamento</th>
                  <th className="px-4 py-3 text-left border-b">Observações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-gray-800">
                {pagamentos.map((p: any) => (
                  <tr
                    key={p.id}
                    className="hover:bg-gray-50 transition duration-200"
                  >
                    <td className="px-4 py-2">
                      {p.pacienteId || "Desconhecido"}
                    </td>
                    <td className="px-4 py-2">
                      R$ {parseFloat(p.valorTotal).toFixed(2)}
                    </td>
                    <td className="px-4 py-2">
                      {new Date(
                        p.diaPagamento?.seconds
                          ? p.diaPagamento.seconds * 1000
                          : p.diaPagamento
                      ).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-2">{p.tipoPagamento}</td>
                    <td className="px-4 py-2">{p.valorParcelado || "-"}</td>
                    <td className="px-4 py-2">{p.observacoes || "-"}</td>
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
