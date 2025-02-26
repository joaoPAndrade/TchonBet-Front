import React from "react";
import { AuthDrawer } from "../auth/AuthDrawer";
import { PaymentDrawer } from "../payment/Payment";
import { Navbar } from "@/components/Navbar";
import tchonBet from "@/components/images/tchonBet.png";

// Mock de apostas com status
const mockBets = [
  {
    id: 44059,
    date: "2023-07-15",
    time: "18:30",
    amount: 50,
    team: "Time A",
    betOdd: 2.5,
    status: "win",
  },
  {
    id: 44060,
    date: "2023-07-16",
    time: "20:00",
    amount: 30,
    team: "Time B",
    betOdd: 1.5,
    status: "waiting",
  },
  {
    id: 44061,
    date: "2023-07-17",
    time: "19:15",
    amount: 40,
    team: "Time C",
    betOdd: 3.5,
    status: "loss",
  },
];

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
  const [isLoginOpen, setIsLoginOpen] = React.useState(false);
  const [isPaymentOpen, setPaymentOpen] = React.useState(false);

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

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          {mockBets.map((bet) => (
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
      </div>

      <AuthDrawer isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />
      <PaymentDrawer isOpen={isPaymentOpen} onClose={() => setPaymentOpen(false)} />
    </>
  );
};
