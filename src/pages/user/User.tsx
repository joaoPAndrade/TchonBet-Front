// pages/UserPage.tsx
import React, { useState } from "react";
import { Button } from "@/components/ui/button"; // Ajuste o caminho conforme sua estrutura
import { Navbar } from "@/components/Navbar";
import { AuthDrawer } from "../auth/AuthDrawer";
import { PaymentDrawer } from "../payment/Payment";

export const UserPage = () => {
    const [isLoginOpen, setIsLoginOpen] = useState(false);
    const [isPaymentOpen, setPaymentOpen] = useState(false);

    // Dados do usuário mockados
    const user = {
        name: "João da Silva",
        email: "joao@example.com",
    };

    return (
        <>
            <Navbar onOpenLogin={() => setIsLoginOpen(true)} onOpenPayment={() => setPaymentOpen(true)} />
            <div className="p-4">
                <h1 className="text-3xl font-bold mb-4">Perfil</h1>
                <div className="border rounded-lg p-4">
                    <p>
                        <strong>Nome:</strong> {user.name}
                    </p>
                    <p>
                        <strong>Email:</strong> {user.email}
                    </p>
                </div>
                <div className="mt-4 flex gap-4">
                    <Button>Alterar Dados</Button>
                    <Button>Alterar Senha</Button>
                </div>
            </div>
            <AuthDrawer isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />
            <PaymentDrawer isOpen={isPaymentOpen} onClose={() => setPaymentOpen(false)} />
        </>
    );
};
