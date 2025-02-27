import React, { useEffect, useState } from "react";
import { AuthDrawer } from "../auth/AuthDrawer";
import { PaymentDrawer } from "../payment/Payment";
import { Navbar } from "@/components/Navbar";
import tchonBet from "@/components/images/tchonBet.png";
import { useUserStorage } from "@/store/UserStorage";
import BetService from "@/services/BetService";
import { Bet } from "@/models/BetModel";

// Função para obter a cor do status
const getStatusColor = (status: string) => {
  switch (status) {
    case "waiting":
      return "bg-yellow-400";
    case "loss":
      return "bg-red-500";
    case "win":
      return "bg-green-500";
    default:
      return "bg-gray-400";
  }
};

// Função para calcular o valor ganho ou perdido
const getResultText = (status: string, amount: number, betOdd: number) => {
  if (status === "win") {
    return `Ganho: R$ ${(amount * betOdd).toFixed(2)}`;
  } else if (status === "loss") {
    return `Perca: R$ ${amount.toFixed(2)}`;
  }
  return null;
};

export const UserBets = () => {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isPaymentOpen, setPaymentOpen] = useState(false);
  const [userBets, setUserBets] = useState<Bet[]>([]); // Estado para armazenar as apostas
  const { user } = useUserStorage(); // Acessa o usuário logado

  // Buscar as apostas do usuário ao carregar a página
  useEffect(() => {
    const fetchUserBets = async () => {
      if (user?.user?.id) {
        try {
          const bets = await BetService.getBetsByIdUser(user.user.id); // Busca as apostas do usuário
          setUserBets(bets); // Atualiza o estado com as apostas
        } catch (error) {
          console.error("Erro ao buscar apostas:", error);
        }
      }
    };

    fetchUserBets();
  }, [user?.user?.id]); // Executa sempre que o ID do usuário mudar

  return (
    <>
      <Navbar onOpenLogin={() => setIsLoginOpen(true)} onOpenPayment={() => setPaymentOpen(true)} />
      <div className="p-4">
        <main className="flex items-center gap-4">
          <h1 className="text-5xl md:text-4xl font-bold inline">
            <span className="bg-gradient-to-r from-[#61DAFB] via-[#1fc0f1] to-[#03a3d7] text-transparent bg-clip-text">
              Minhas Apostas
            </span>
          </h1>

          <div className="w-1/4">
            <img src={tchonBet} alt="Tchon Bet" className="w-40 h-40 object-cover rounded-lg" />
          </div>
        </main>

        {/* Lista de Apostas */}
        {userBets.length === 0 ? (
          <div className="text-center mt-6">Carregando apostas...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
            {userBets.map((bet) => (
              <div key={bet.id} className="border rounded-lg p-4 flex flex-col">
                <div className="flex items-center justify-between mb-2">
                  <h2 className="font-bold">Aposta #{bet.id}</h2>
                  <div className="flex flex-col items-start">
                    <div className="flex items-center gap-2">
                      <span className={`w-4 h-4 rounded-full ${getStatusColor(bet.status)}`} />
                      <span className="text-sm font-medium capitalize">{bet.status}</span>
                    </div>
                    {getResultText(bet.status, bet.amount, bet.betOdd) && (
                      <p>{getResultText(bet.status, bet.amount, bet.betOdd)}</p>
                    )}
                  </div>
                </div>
                <p>
                  <strong>Data:</strong> {bet.date} {bet.time}
                </p>
                <p>
                  <strong>Valor:</strong> R$ {bet.amount.toFixed(2)}
                </p>
                <p>
                  <strong>Time:</strong> {bet.team}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>

      <AuthDrawer isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />
      <PaymentDrawer isOpen={isPaymentOpen} onClose={() => setPaymentOpen(false)} />
    </>
  );
};