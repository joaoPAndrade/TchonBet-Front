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
import { mdiRabbit } from "@mdi/js";
import { Wallet } from "lucide-react";

interface NavbarProps {
  onOpenLogin: () => void;
}

export const Navbar = ({ onOpenLogin }: NavbarProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

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
            <a href="/minhas-apostas" className="hover:underline">Minhas Apostas</a>
            <a href="/perfil" className="hover:underline">Perfil</a>
          </div>


          {/* Botões à direita */}
          <div className="hidden md:flex gap-4 items-center">
            <a
              rel="noreferrer noopener"
              target="_blank"
              className={`w-[110px] border ${buttonVariants({
                variant: "secondary",
              })}`}
            >
              <Wallet className="mr-2 w-5 h-5" />
              Carteira
            </a>

            <button
              onClick={onOpenLogin}
              className={`border px-4 py-2 rounded-md ${buttonVariants({
                variant: "default",
              })}`}
            >
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
                  <a href="/minhas-apostas" className="text-lg font-medium">Minhas Apostas</a>
                  <a href="/perfil" className="text-lg font-medium">Perfil</a>

                  <a
                    rel="noreferrer noopener"
                    href="https://github.com/joaoPAndrade/TchonBet-Front"
                    target="_blank"
                    className={`w-[110px] border ${buttonVariants({
                      variant: "secondary",
                    })}`}
                  >
                    <Wallet className="mr-2 w-5 h-5" />
                    Github
                  </a>

                  <button
                    onClick={onOpenLogin}
                    className={`border px-4 py-2 rounded-md w-full ${buttonVariants({
                      variant: "default",
                    })}`}
                  >
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
