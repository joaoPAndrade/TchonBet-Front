// pages/UserBets.tsx
import React from "react";
import { AuthDrawer } from "../auth/AuthDrawer";
import { PaymentDrawer } from "../payment/Payment";
import { Navbar } from "@/components/Navbar";
import tchonBet from "@/components/images/tchonBet.png";

const mockBets = [
  {
    id: 44059,
    date: "2023-07-15",
    time: "18:30",
    amount: 50,
    team: "Time A",
  },
  {
    id: 44060,
    date: "2023-07-16",
    time: "20:00",
    amount: 30,
    team: "Time B",
  },
  {
    id: 44061,
    date: "2023-07-17",
    time: "19:15",
    amount: 40,
    team: "Time C",
  },
  // Adicione mais apostas se necessário
];

export const UserBets = () => {
  const [isLoginOpen, setIsLoginOpen] = React.useState(false);
  const [isPaymentOpen, setPaymentOpen] = React.useState(false);

  return (
    <>
      <Navbar onOpenLogin={() => setIsLoginOpen(true)} onOpenPayment={() => setPaymentOpen(true)} />
      <div className="p-4">

        <main className="flex items-center gap-4">
          {/* Texto */}
          <h1 className="text-5xl md:text-4xl font-bold inline">
            <span className="bg-gradient-to-r from-[#61DAFB] via-[#1fc0f1] to-[#03a3d7] text-transparent bg-clip-text">
              Minhas Apostas
            </span>
          </h1>

          {/* Imagem ao lado */}
          <div className="w-1/4">
            <img
              src={tchonBet}
              alt="Tchon Bet"
              className="w-40 h-40 object-cover rounded-lg"
            />
          </div>
        </main>
        <br></br>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {mockBets.map((bet) => (
            <div key={bet.id} className="border rounded-lg p-4">
              <h2 className="font-bold mb-2">Aposta #{bet.id}</h2>
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
