import { useState } from "react";
import { toast } from "react-toastify";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import tchonBet from "@/components/images/tchonBet.png";
import UserService from "@/services/UserService";
import { User } from "@/models/UserModel";
import { useUserStorage } from "@/store/UserStorage";

interface AuthDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AuthDrawer = ({ isOpen, onClose }: AuthDrawerProps) => {
  const [isRegister, setIsRegister] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    cpf: "",
    birthdate: "",
    password: "",
    wallet: 0,
  });

  const { login } = useUserStorage(); // Utilizando o login do contexto

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async () => {
    try {
      await UserService.createUser(formData as User);
      toast.success("Usuário criado com sucesso!");
      setFormData({ name: "", email: "", cpf: "", birthdate: "", password: "", wallet: 0 });
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const handleLogin = async () => {
    try {
      if (!formData.cpf || !formData.password) {
        toast.warn("Preencha os campos de CPF e senha!");
        return;
      }
      const user = await UserService.authenticateUser(formData.cpf, formData.password);
      login(user);
      toast.success("Login realizado com sucesso!");
      onClose();
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const toggleRegister = () => {
    setIsRegister(!isRegister);
    setFormData({ name: "", email: "", cpf: "", birthdate: "", password: "", wallet: 0 });
  };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent side="right">
        <main className="text-5xl md:text-5xl font-bold">
          <h1>
            <span className="inline bg-gradient-to-r from-[#F596D3] to-[#D247BF] text-transparent bg-clip-text">
              TchonBet
            </span>
          </h1>
        </main>
        <img src={tchonBet} alt="Tchon Bet" className="w-80 h-65 object-cover rounded-l-xl" />
        <SheetHeader>
          <SheetTitle>{isRegister ? "Cadastro" : "Login"}</SheetTitle>
        </SheetHeader>
        <div className="mt-4 space-y-3">
          {isRegister && <Input name="name" placeholder="Nome" value={formData.name} onChange={handleChange} />}
          {isRegister && <Input name="email" placeholder="Email" value={formData.email} onChange={handleChange} />}
          <Input name="cpf" placeholder="CPF" value={formData.cpf} onChange={handleChange} />
          {isRegister && <Input name="birthdate" placeholder="Data de Nascimento" type="date" value={formData.birthdate} onChange={handleChange} />}
          <Input name="password" placeholder="Senha" type="password" value={formData.password} onChange={handleChange} />
          {isRegister && <Input name="confirmPassword" placeholder="Confirme a senha" type="password" onChange={handleChange} />}
          <Button className="w-full mt-2" onClick={isRegister ? handleRegister : handleLogin}>
            {isRegister ? "Cadastrar" : "Entrar"}
          </Button>
          <button className="text-sm text-pink-500 w-full" onClick={toggleRegister}>
            {isRegister ? "Já tem uma conta? Faça login" : "Criar uma conta"}
          </button>
        </div>
      </SheetContent>
    </Sheet>
  );
};
