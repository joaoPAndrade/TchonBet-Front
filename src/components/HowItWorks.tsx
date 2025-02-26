import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { MedalIcon, MapIcon, PlaneIcon, GiftIcon } from "../components/Icons";
import { Ticket, Wallet, BellDot, HandCoins } from "lucide-react";

interface FeatureProps {
  icon: JSX.Element;
  title: string;
  description: string;
}

const features: FeatureProps[] = [
  {
    icon: <Ticket  className="text-pink-500 size-8" />,
    title: "Escolha a Aposta",
    description:
      "Entre nas opções de jogos disponiveis e escolha o seu time!",
  },
  {
    icon: <Wallet className="text-pink-500 size-8"  />,
    title: "Adicione crédito a carteira",
    description:
      "Deposite da forma que preferir, Pix, Cartão, Boleto.",
  },
  {
    icon: <BellDot className="text-pink-500 size-8"  />,
    title: "Espere o resultado",
    description:
      "Após o termino de algum jogo, você é automaticamente notificado do resultado",
  },
  {
    icon: <HandCoins className="text-pink-500 size-8"  />,
    title: "Receba os seus ganhos!",
    description:
      "Aproveite os ganhos infinitos na TchonBET!!!",
  },
];

export const HowItWorks = () => {
  return (
    <section
      id="howItWorks"
      className="container text-center py-24 sm:py-32"
    >
      <h2 className="text-3xl md:text-4xl font-bold ">
        Como começar a {" "}
        <span className="bg-gradient-to-b from-primary/60 to-primary text-transparent bg-clip-text">
          Apostar ?{" "}
        </span>
        Guia passo a passo
      </h2>
      <p className="md:w-3/4 mx-auto mt-4 mb-8 text-xl text-muted-foreground"></p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {features.map(({ icon, title, description }: FeatureProps) => (
          <Card
            key={title}
            className="bg-muted/50"
          >
            <CardHeader>
              <CardTitle className="grid gap-4 place-items-center">
                {icon}
                {title}
              </CardTitle>
            </CardHeader>
            <CardContent>{description}</CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};
