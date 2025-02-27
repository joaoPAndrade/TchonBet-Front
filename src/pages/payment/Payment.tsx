import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { useUserStorage } from "@/store/UserStorage";
import UserService from "@/services/UserService";
import tchonBet from "@/components/images/tchonBetDinheiro.png";

interface PaymentDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PaymentDrawer = ({ isOpen, onClose }: PaymentDrawerProps) => {
  const [paymentMethod, setPaymentMethod] = useState<"pix" | "card" | null>(null);
  const [formData, setFormData] = useState({
    value: "",
  });
  const [message, setMessage] = useState<string | null>(null); // Estado para feedback ao usuário

  const { user } = useUserStorage();

  // Função para atualizar o estado do formulário
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Função para adicionar fundos
  const handleAddFunds = async () => {
    if (!formData.value) {
      setMessage("Por favor, insira um valor.");
      return;
    }

    if (!user?.user?.id) {
      setMessage("Usuário não autenticado.");
      return;
    }

    try {
      await UserService.addWallet(user.user.id, parseFloat(formData.value)); // Converte o valor para número
      setMessage("Fundos adicionados com sucesso!");
      onClose(); // Fecha o drawer após o sucesso
    } catch (error: any) {
      setMessage(error.message || "Erro ao adicionar fundos.");
    }
  };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent side="right">
        <img
          src={tchonBet}
          alt="Tchon Bet"
          className="w-70 h-50 object-cover rounded-l-xl"
        />
        <br />
        <SheetHeader>
          <SheetTitle>Adicionar Fundos</SheetTitle>
        </SheetHeader>

        {/* Seletor de Método de Pagamento */}
        <div className="mt-4 space-y-3">
          <p className="text-gray-700 dark:text-gray-300">Escolha um método de pagamento:</p>
          <div className="flex gap-4">
            <Button
              className={`w-1/2 ${paymentMethod === "pix" ? "bg-blue-500" : "bg-gray-300"}`}
              onClick={() => setPaymentMethod("pix")}
            >
              Pix
            </Button>
            <Button
              className={`w-1/2 ${paymentMethod === "card" ? "bg-blue-500" : "bg-gray-300"}`}
              onClick={() => setPaymentMethod("card")}
            >
              Cartão
            </Button>
          </div>

          {/* Formulário Base */}
          <Input
            placeholder="Valor R$"
            name="value"
            value={formData.value}
            onChange={handleInputChange}
            type="number" // Garante que apenas números sejam digitados
          />

          {/* Formulário específico para Pix */}
          {paymentMethod === "pix" && (
            <div className="space-y-3">
              <p className="text-gray-700 dark:text-gray-300">Dados para pagamento via Pix:</p>
              <Input placeholder="Chave Pix (CPF, CNPJ, Email ou Aleatória)" />
            </div>
          )}

          {/* Formulário específico para Cartão */}
          {paymentMethod === "card" && (
            <div className="space-y-3">
              <p className="text-gray-700 dark:text-gray-300">Dados do cartão:</p>
              <Input placeholder="Número do Cartão" />
              <div className="flex gap-2">
                <Input placeholder="Validade (MM/AA)" className="w-1/2" />
                <Input placeholder="CVV" className="w-1/2" type="password" />
              </div>
              <Input placeholder="Nome no Cartão" />
            </div>
          )}

          {/* Botão de Finalizar Pagamento */}
          <Button className="w-full mt-4" disabled={!paymentMethod} onClick={handleAddFunds}>
            Confirmar Pagamento
          </Button>

          {/* Feedback para o usuário */}
          {message && (
            <p className={`mt-4 text-sm ${message.includes("sucesso") ? "text-green-500" : "text-red-500"}`}>
              {message}
            </p>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};