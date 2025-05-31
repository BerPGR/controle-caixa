import { getFirestore, addDoc, collection, getDocs } from "firebase/firestore";
import { app } from "../firebase";

const db = getFirestore(app);

interface PacienteProps {
  nome: string;
  email: string;
  cpf: string;
  cep: string;
  endereco: string;
}

interface PagamentoProps {
  tipoPagamento: string;
  diaPagamento: Date;
  valorParcelado: string | undefined;
  observacoes: string;
}

export function usePacienteService() {
  const getPacientes = async () => {
    const snapshot = await getDocs(collection(db, "pacientes"));
    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  };

  const createPaciente = async (paciente: PacienteProps) => {
    try {
      const docRef = await addDoc(collection(db, "pacientes"), paciente);
      if (docRef != null || docRef != undefined) {
        return {
          status: "success",
          message: "Paciente criado com sucesso!",
        };
      }
    } catch (e) {
      alert(`Erro ao cadastrar paciente: ${e}`);
      throw e;
    }
  };

  const createPayment = async (pagamento: any) => {
    try {
      const docRef = await addDoc(collection(db, "pagamentos"), pagamento)
      if (docRef) {
        return {
          status: "success",
          message: "Pagamento registrado com sucesso!",
        }
      }
    } catch (e) {
      console.error("Erro ao registrar pagamento:", e)
      throw e
    }
  }

  const getPayments = async () => {
    try {
      const snapshot = await getDocs(collection(db, "pagamentos"));
      const pagamentos = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      return pagamentos;
    } catch (e) {
      throw e;
    }
  };

  return { createPaciente, createPayment, getPayments, getPacientes };
}
