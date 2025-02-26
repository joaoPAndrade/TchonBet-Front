import { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import tchonBet from "@/components/images/tchonBetDinheiro.png";

interface PaymentDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PaymentDrawer = ({ isOpen, onClose }: PaymentDrawerProps) => {
  const [paymentMethod, setPaymentMethod] = useState<"pix" | "card" | null>(null);

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent side="right">
        <img
          src={tchonBet}
          alt="Tchon Bet"
          className="w-80 h-65 object-cover rounded-l-xl"
        />
        <br></br>
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
          <Input placeholder="Nome" />
          <Input placeholder="Email" />
          <Input placeholder="CPF" />

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
          <Button className="w-full mt-4" disabled={!paymentMethod}>
            Confirmar Pagamento
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
};
