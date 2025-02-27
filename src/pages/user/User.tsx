import React, { useState } from "react";
import { Button } from "@/components/ui/button"; // Ajuste o caminho conforme sua estrutura
import { Navbar } from "@/components/Navbar";
import { AuthDrawer } from "../auth/AuthDrawer";
import { PaymentDrawer } from "../payment/Payment";
import { useUserStorage } from "@/store/UserStorage";

export const UserPage = () => {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isPaymentOpen, setPaymentOpen] = useState(false);

  // Acessa o usuário do contexto
  const { user, logout } = useUserStorage();


  if (!user) {
    return <div>Carregando...</div>; // Ou redireciona para a página de login
  }

  return (
    <>
      <Navbar onOpenLogin={() => setIsLoginOpen(true)} onOpenPayment={() => setPaymentOpen(true)} />
      <div className="p-4">
        <h1 className="text-3xl font-bold mb-4">Perfil</h1>
        <div className="border rounded-lg p-4">
          <p>
            <strong>Nome:</strong> {user.user.name}
          </p>
          <p>
            <strong>Email:</strong> {user.user.email}
          </p>
        </div>
        <div className="mt-4 flex gap-4">
          <Button onClick={logout}>Sair</Button> {/* Função de logout */}
        </div>
      </div>
      <AuthDrawer isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />
      <PaymentDrawer isOpen={isPaymentOpen} onClose={() => setPaymentOpen(false)} />
    </>
  );
};
