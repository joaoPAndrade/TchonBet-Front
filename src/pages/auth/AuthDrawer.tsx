import { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import tchonBet from "@/components/images/tchonBet.png";

interface AuthDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AuthDrawer = ({ isOpen, onClose }: AuthDrawerProps) => {
  const [isRegister, setIsRegister] = useState(false);

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent side="right">
        <main className="text-5xl md:text-5xl font-bold">
          <h1>
            <span className="inline bg-gradient-to-r from-[#F596D3]  to-[#D247BF] text-transparent bg-clip-text">
              TchonBet
            </span>{" "}
            <br></br>
          </h1>{" "}
        </main>
        <img
          src={tchonBet}
          alt="Tchon Bet"
          className="w-80 h-65 object-cover rounded-l-xl"
        />
        <SheetHeader>
          <SheetTitle>{isRegister ? "Cadastro" : "Login"}</SheetTitle>
        </SheetHeader>

        <div className="mt-4 space-y-3">
          {isRegister && <Input placeholder="Nome" />}
          <Input placeholder="Email" />
          {isRegister && <Input placeholder="CPF" />}
          {isRegister && <Input placeholder="CEP" />}
          <Input placeholder="Senha" type="password" />
          {isRegister && <Input placeholder="Confirme a senha" type="password" />}

          <Button className="w-full mt-2">
            {isRegister ? "Cadastrar" : "Entrar"}
          </Button>

          <button
            className="text-sm text-blue-500 w-full"
            onClick={() => setIsRegister(!isRegister)}
          >
            {isRegister ? "Já tem uma conta? Faça login" : "Criar uma conta"}
          </button>
        </div>
      </SheetContent>
    </Sheet>
  );
};
