import { Badge } from "./ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Check } from "lucide-react";
import tchonBet from "./images/tchonBet.png";
import { Link } from "react-router-dom";

export const MainCard = () => {
  return (
    <div className="hidden lg:flex flex-row flex-wrap gap-8 relative w-[800px] h-[500px]">
      {/* Pricing */}
      <Card className="absolute top-[110px] ml-12 left[120px] w-90 drop-shadow-xl shadow-black/10 dark:shadow-white/10 flex flex-row">
        {/* Imagem na esquerda */}
        <div className="w-1/4 mt-4">
          <img
            src={tchonBet}
            alt="Tchon Bet"
            className="w-65 h-80 object-cover rounded-l-xl"
          />
        </div>

        {/* Conteúdo na direita */}
        <div className="w-3/4 p-4">
          <CardHeader>
            <CardTitle className="flex items-center justify-between text-2xl">
              Apostas Esportivas sem jogo sujo!
            </CardTitle>
            <div>
              <span className="text-2xl font-bold">R$ 0</span>
              <span className="text-2xl font-light"> de custo de depósito</span>
            </div>

            <CardDescription>
              Saque apenas presencialmente mediante a provas de identidade
            </CardDescription>
          </CardHeader>

          <CardContent>
            <Link to={"/apostar"}>
              <Button className="w-full">Quero apostar na TchonBet!</Button>
            </Link>
          </CardContent>

          <hr className="w-4/5 m-auto mb-4" />

          <CardFooter className="flex">
            <div className="space-y-4">
              {["Aposta Justa", "Saque imediato", "Controle de Perda"].map(
                (benefit: string) => (
                  <span key={benefit} className="flex">
                    <Check className="text-pink-500" />{" "}
                    <h3 className="ml-1">{benefit}</h3>
                  </span>
                )
              )}
            </div>
          </CardFooter>
        </div>
      </Card>
    </div>
  );
};
