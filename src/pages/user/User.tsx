import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Navbar } from "@/components/Navbar";
import { AuthDrawer } from "../auth/AuthDrawer";
import { PaymentDrawer } from "../payment/Payment";
import { useUserStorage } from "@/store/UserStorage";
import UserService from "@/services/UserService";
import { User } from "@/models/UserModel";
import { toast } from "react-toastify";


export const UserPage = () => {
  const navigate = useNavigate();
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isPaymentOpen, setPaymentOpen] = useState(false);
  const [isEditPopupOpen, setIsEditPopupOpen] = useState(false);
  const [editedUser, setEditedUser] = useState<User | null>(null);

  const { user, logout, updateUser } = useUserStorage();

  const openEditPopup = () => {
    if (user?.user) {
      setEditedUser({ ...user.user });
      setIsEditPopupOpen(true);
    }
  };

  const handleLogout = () => {
    logout();
    toast.success("Você saiu com sucesso!");
    navigate("/"); // Redireciona para a home
  };

  const handleSaveUser = async () => {
    if (!editedUser) return;

    try {
      await UserService.updateUser(editedUser);
      updateUser(editedUser);
      setIsEditPopupOpen(false);
      toast.success("Dados atualizados com sucesso!");
    } catch (error) {
      console.error("Erro ao atualizar usuário:", error);
      toast.error("Erro ao atualizar usuário. Tente novamente.");
    }
  };

  if (!user) {
    return <div>Carregando...</div>;
  }

  return (
    <>
      <Navbar onOpenLogin={() => setIsLoginOpen(true)} onOpenPayment={() => setPaymentOpen(true)} />
      <div className="p-4">
        <h1 className="text-3xl font-bold mb-4">Perfil</h1>
        <div className="border rounded-lg p-4">
          <p><strong>Nome:</strong> {user.user.name}</p>
          <p><strong>Email:</strong> {user.user.email}</p>
        </div>
        <div className="mt-4 flex gap-4">
          <Button onClick={openEditPopup}>Alterar Dados</Button>
          <Button onClick={handleLogout}>Sair</Button>
        </div>
      </div>

      {isEditPopupOpen && editedUser && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-lg w-80">
            <h2 className="text-xl font-bold mb-4">Editar Perfil</h2>
            <div className="space-y-3">
              <Input
                placeholder="Nome"
                value={editedUser.name}
                onChange={(e) => setEditedUser({ ...editedUser, name: e.target.value })}
              />
              <Input
                placeholder="Email"
                value={editedUser.email}
                onChange={(e) => setEditedUser({ ...editedUser, email: e.target.value })}
              />
              <Input
                placeholder="Senha"
                type="password"
                onChange={(e) => setEditedUser({ ...editedUser, password: e.target.value })}
              />
            </div>
            <div className="mt-4 flex gap-2">
              <Button className="w-full" onClick={handleSaveUser}>
                Salvar
              </Button>
              <Button variant="outline" className="w-full" onClick={() => setIsEditPopupOpen(false)}>
                Cancelar
              </Button>
            </div>
          </div>
        </div>
      )}

      <AuthDrawer isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />
      <PaymentDrawer isOpen={isPaymentOpen} onClose={() => setPaymentOpen(false)} />
    </>
  );
};
