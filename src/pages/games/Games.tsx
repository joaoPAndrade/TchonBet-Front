import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/Navbar";
import { AuthDrawer } from "../auth/AuthDrawer";
import { PaymentDrawer } from "../payment/Payment";
import esportsImg from "@/components/images/esports.jpg"; // Imagem de fundo

const mockGames = [
    { id: 1, teamA: "Time A", teamB: "Time B", oddsA: 2.0, oddsB: 4.5 },
    { id: 2, teamA: "Time C", teamB: "Time D", oddsA: 1.8, oddsB: 5.0 },
    { id: 3, teamA: "Time E", teamB: "Time F", oddsA: 2.2, oddsB: 3.9 },
];

export const GamesPage = () => {
    const [isLoginOpen, setIsLoginOpen] = useState(false);
    const [isPaymentOpen, setPaymentOpen] = useState(false);

    return (
        <>
            <Navbar onOpenLogin={() => setIsLoginOpen(true)} onOpenPayment={() => setPaymentOpen(true)} />

            <div className="relative flex h-screen">
                {/* Imagem lateral */}
                <div
                    className="hidden md:block w-1/5 h-full bg-cover bg-center"
                    style={{ backgroundImage: `url(${esportsImg})` }}
                />

                {/* Conteúdo principal */}
                <div className="w-full md:w-4/5 p-6 bg-white dark:bg-gray-900">
                    <main className="text-5xl md:text-4xl font-bold">
                        <h1 className="inline">
                            <span className="inline bg-gradient-to-r from-[#F596D3]  to-[#D247BF] text-transparent bg-clip-text">
                                Jogos Disponíveis
                            </span>{" "}
                            <br></br>
                        </h1>{" "}
                    </main>
                    <br></br>

                    {mockGames.map((game, index) => (
                        <div key={game.id}>
                            <div className="flex justify-between items-center py-3">

                                <div className="flex gap-6 font-extrabold size-2xl">
                                    {game.teamA} <span className="text-green-500 font-bold">🏆 {game.oddsA}x</span> vs  <span className="text-red-500 font-bold">🔥 {game.oddsB}x</span> {game.teamB}
                                </div>

                                <Button variant="default">Apostar</Button>
                            </div>

                            {/* Divider entre jogos */}
                            {index < mockGames.length - 1 && <hr className="border-gray-300 dark:border-gray-700" />}
                        </div>
                    ))}
                </div>
            </div>

            <AuthDrawer isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />
            <PaymentDrawer isOpen={isPaymentOpen} onClose={() => setPaymentOpen(false)} />
        </>
    );
};
