import { useState } from "react";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import { GitHubLogoIcon } from "@radix-ui/react-icons";
import { buttonVariants } from "./ui/button";
import { Menu } from "lucide-react";
import { ModeToggle } from "./mode-toggle";
import Icon from "@mdi/react";
import Wallet from "./Wallet";
import { mdiRabbit } from "@mdi/js";
import { Coins } from "lucide-react";
import { useUserStorage } from "@/store/UserStorage";

interface NavbarProps {
  onOpenLogin: () => void;
  onOpenPayment: () => void;
}

export const Navbar = ({ onOpenLogin, onOpenPayment }: NavbarProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { user } = useUserStorage(); // Pegue o estado do usuário

  return (
    <header className="sticky border-b-[1px] top-0 z-40 w-full bg-white dark:border-b-slate-700 dark:bg-background">
      <NavigationMenu className="mx-auto">
        <NavigationMenuList className="container h-14 px-4 w-screen flex justify-between items-center">
          {/* Logo à esquerda */}
          <NavigationMenuItem className="font-bold">
            <a
              rel="noreferrer noopener"
              href="/"
              className="ml-2 font-bold text-xl flex items-center"
            >
              <Icon path={mdiRabbit} size={1.5} color="pink" />
              TchonBet
            </a>
          </NavigationMenuItem>

          {/* Itens de navegação centralizados */}
          <div className="hidden md:flex gap-8 text-lg font-medium">
            <a href="/apostar" className="hover:underline">Apostar</a>
            {user && <a href="/minhas-apostas" className="hover:underline">Minhas Apostas</a>}
            {user && <a href="/perfil" className="hover:underline">Perfil</a>}
          </div>

          {/* Botões à direita */}
          <div className="hidden md:flex gap-4 items-center">
            {/* Exibe o Wallet apenas se o usuário estiver logado */}
            {user && <Wallet onOpenPayment={() => onOpenPayment()} />}

            <button onClick={onOpenLogin} className={`border px-4 py-2 rounded-md ${buttonVariants({ variant: "default", })}`}>
              Login
            </button>

            <ModeToggle />
          </div>

          {/* Mobile Menu */}
          <span className="flex md:hidden">
            <ModeToggle />

            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger className="px-2">
                <Menu className="flex md:hidden h-5 w-5">
                  <span className="sr-only">Menu Icon</span>
                </Menu>
              </SheetTrigger>

              <SheetContent side="left">
                <SheetHeader>
                  <SheetTitle className="font-bold text-xl flex items-center">
                    <Icon path={mdiRabbit} size={1.5} color="pink" />
                    TchonBet
                  </SheetTitle>
                </SheetHeader>

                <nav className="flex flex-col justify-center items-center gap-4 mt-4">
                  <a href="/apostar" className="text-lg font-medium">Apostar</a>
                  {user &&  <a href="/minhas-apostas" className="text-lg font-medium">Minhas Apostas</a>}
                  {user && <a href="/perfil" className="text-lg font-medium">Perfil</a>}

                  {/* Exibe o Wallet apenas se o usuário estiver logado */}
                  {user && <Wallet onOpenPayment={() => onOpenPayment()} />}

                  <button onClick={onOpenLogin} className={`border px-4 py-2 rounded-md ${buttonVariants({ variant: "default", })}`}>
                    Login
                  </button>
                </nav>
              </SheetContent>
            </Sheet>
          </span>
        </NavigationMenuList>
      </NavigationMenu>
    </header>
  );
};
