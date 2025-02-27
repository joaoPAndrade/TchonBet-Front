import { useState, useEffect } from "react";
import { Coins, Wallet as WalletIcon } from "lucide-react";
import { buttonVariants } from "./ui/button";
import { useUserStorage } from "@/store/UserStorage";

interface WalletProps {
    onOpenPayment: () => void;
}

const Wallet = ({ onOpenPayment }: WalletProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const { user } = useUserStorage(); 
    const [saldo, setSaldo] = useState(user.user.wallet); // Estado para atualizar saldo

    // Atualiza o saldo sempre que o usuário mudar
    useEffect(() => {
        setSaldo(user.user.wallet);
    }, [user]); 

    return (
        <div className="relative">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-2 w-[110px] border px-4 py-2 rounded-md bg-white dark:bg-gray-900"
            >
                <WalletIcon className="w-5 h-5" />
                Carteira
            </button>

            {isOpen && (
                <div className="absolute right-0 mt-2 w-60 bg-white dark:bg-gray-800 shadow-lg rounded-lg p-4 border">
                    <p className="text-gray-700 dark:text-gray-200 font-semibold">
                        Saldo Atual:
                    </p>
                    <p className="text-lg font-bold text-green-600 dark:text-green-400">
                        R$ {saldo.toFixed(2)}
                    </p>
                    <br></br>
                    <button onClick={onOpenPayment} className={`border px-3 py-1 rounded-md ${ buttonVariants({ variant: "default", })}`}>
                        <Coins className="mr-2 w-5 h-5" />
                        Adicionar Fundos
                    </button>
                </div>
            )}
        </div>
    );
};

export default Wallet;
