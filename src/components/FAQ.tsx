import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import tchonBet from "./images/tchonBetDuvida.png";

interface FAQProps {
  question: string;
  answer: string;
  value: string;
}

const FAQList: FAQProps[] = [
  {
    question: "Posso recuperar o meu dinheiro perdido?",
    answer: "Não. Ele fica pra plataforma",
    value: "item-1",
  },
  {
    question: "Ao depositar, como eu retiro o meu dinheiro?",
    answer:
      "Apenas presencialmente, mediante a apresentação de identificação.",
    value: "item-2",
  },
  {
    question:
      "Tenho que ter minimo de ganhos para retirar?",
    answer:
      "Sim, pelo menos deve ser ganho 2x o valor do 1° depósito.",
    value: "item-3",
  },
];

export const FAQ = () => {
  return (
    <section
      id="faq"
      className="container py-24 sm:py-32"
    >
      <h2 className="flex items-center text-3xl md:text-4xl font-bold mb-4">
        <img
          src={tchonBet}
          alt="Tchon Bet"
          className="w-40 h-30 object-cover rounded-l-xl mr-4"
        />
        Perguntas{" "}
        <span className="bg-gradient-to-b from-primary/60 to-primary text-transparent bg-clip-text">
          Frequentes
        </span>
      </h2>


      <Accordion
        type="single"
        collapsible
        className="w-full AccordionRoot"
      >
        {FAQList.map(({ question, answer, value }: FAQProps) => (
          <AccordionItem
            key={value}
            value={value}
          >
            <AccordionTrigger className="text-left">
              {question}
            </AccordionTrigger>

            <AccordionContent>{answer}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
};
