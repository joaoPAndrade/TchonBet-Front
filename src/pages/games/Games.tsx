import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/Navbar";
import { AuthDrawer } from "../auth/AuthDrawer";
import { PaymentDrawer } from "../payment/Payment";
import esportsImg from "@/components/images/esports.jpg";
import { Game } from "@/models/GameModel";

import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
} from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";

const mockGames: Game[] = [
    { id: 1, teamA: "Time A", teamB: "Time B", oddA: 2.0, oddB: 4.5, date: "2025-03-01", isFinished: false, winnerTeam: "false" },
    { id: 2, teamA: "Time C", teamB: "Time D", oddA: 1.8, oddB: 5.0, date: "2025-03-02", isFinished: false, winnerTeam: "false" },
    { id: 3, teamA: "Time E", teamB: "Time F", oddA: 2.2, oddB: 3.9, date: "2025-03-03", isFinished: false, winnerTeam: "false" },
];

export const GamesPage = () => {
    const [isLoginOpen, setIsLoginOpen] = useState(false);
    const [isPaymentOpen, setPaymentOpen] = useState(false);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isBettingOpen, setIsBettingOpen] = useState(false);
    const [isEditWinnerOpen, setIsEditWinnerOpen] = useState(false); // New state for edit winner popup
    const [selectedBet, setSelectedBet] = useState<"teamA" | "teamB" | "none">("none");
    const [selectedWinner, setSelectedWinner] = useState<"teamA" | "teamB" | "none">("none"); // Track selected winner
    const [newGame, setNewGame] = useState({ teamA: "", teamB: "", oddA: "", oddB: "", data: "" });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewGame({ ...newGame, [e.target.name]: e.target.value });
    };

    const handleEditWinner = (game: Game) => {
        setSelectedWinner(game.winnerTeam === "false" ? "none" : game.winnerTeam as "teamA" | "teamB");
        setIsEditWinnerOpen(true); // Open winner edit popup
    };

    const handleBet = () => {
        setIsBettingOpen(true);
    };

    const handleConfirmBet = () => {
        if (selectedBet === "none") {
            alert("Selecione um time para apostar!");
            return;
        }
        console.log(`Aposta confirmada no ${selectedBet === "teamA" ? "Time A" : "Time B"}`);
        setIsBettingOpen(false);
    };

    const handleConfirmWinner = () => {
        if (selectedWinner === "none") {
            alert("Selecione um time vencedor!");
            return;
        }
        console.log(`Time vencedor confirmado: ${selectedWinner === "teamA" ? "Time A" : "Time B"}`);
        setIsEditWinnerOpen(false); // Close winner edit popup
    };

    const handleAddGame = () => {
        console.log("Jogo adicionado ou editado:", newGame);
        setIsSidebarOpen(false);
    };

    // Check user role from localStorage
    const userName = localStorage.getItem("userName");
    const hasUser = (userName !== null);
    const isAdmin = userName === "admin"; // Only show buttons for 'admin'

    return (
        <>
            <Navbar onOpenLogin={() => setIsLoginOpen(true)} onOpenPayment={() => setPaymentOpen(true)} />
            <div className="relative flex h-screen">
                <div className="hidden md:block w-1/5 h-full bg-cover bg-center" style={{ backgroundImage: `url(${esportsImg})` }} />
                <div className="w-full md:w-4/5 p-6 bg-white dark:bg-gray-900">
                    <div className="flex justify-between items-center mb-4">
                        <h1 className="text-4xl font-bold bg-gradient-to-r from-[#F596D3] to-[#D247BF] text-transparent bg-clip-text">
                            Jogos Disponíveis
                        </h1>
                        {isAdmin && (
                            <Button onClick={() => setIsSidebarOpen(true)}>Adicionar Jogo</Button>
                        )}
                    </div>
                    {mockGames.map((game, index) => (
                        <div key={game.id}>
                            <div className="flex justify-between items-center py-3">
                                <div className="flex gap-6 font-extrabold text-lg">
                                    {isAdmin && (
                                        <Button variant="outline" onClick={() => handleEditWinner(game)}>Editar</Button>
                                    )}
                                    {game.teamA} <span className="text-green-500">🔥 {game.oddA}x</span> vs
                                    <span className="text-red-500">🔥 {game.oddB}x</span> {game.teamB}
                                </div>
                                <div className="flex gap-2">
                                    {hasUser && (
                                        <Button variant="default" onClick={() => handleBet()}>Apostar</Button>
                                    )}
                                </div>
                            </div>
                            <hr className="border-gray-300 dark:border-gray-700" />
                        </div>
                    ))}
                </div>
            </div>

            {/* Pop-up de Aposta */}
            {isBettingOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-lg w-80">
                        <h2 className="text-xl font-bold mb-4">Faça sua Aposta</h2>
                        <div className="mb-4">
                            <Button
                                variant={selectedBet === "teamA" ? "default" : "outline"}
                                onClick={() => setSelectedBet("teamA")}
                                className="w-full mb-2"
                            >
                                Apostar no Time A
                            </Button>
                            <Button
                                variant={selectedBet === "teamB" ? "default" : "outline"}
                                onClick={() => setSelectedBet("teamB")}
                                className="w-full"
                            >
                                Apostar no Time B
                            </Button>
                        </div>
                        <Button
                            variant="default"
                            className="w-full mt-4"
                            onClick={handleConfirmBet}
                        >
                            Confirmar Aposta
                        </Button>
                        <Button
                            variant="outline"
                            className="w-full mt-2"
                            onClick={() => setIsBettingOpen(false)}
                        >
                            Cancelar
                        </Button>
                    </div>
                </div>
            )}

            {/* Pop-up de Identificação do Vencedor */}
            {isEditWinnerOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-lg w-80">
                        <h2 className="text-xl font-bold mb-4">Identificar o Vencedor</h2>
                        <div className="mb-4">
                            <Button
                                variant={selectedWinner === "teamA" ? "default" : "outline"}
                                onClick={() => setSelectedWinner("teamA")}
                                className="w-full mb-2"
                            >
                                Time A
                            </Button>
                            <Button
                                variant={selectedWinner === "teamB" ? "default" : "outline"}
                                onClick={() => setSelectedWinner("teamB")}
                                className="w-full"
                            >
                                Time B
                            </Button>
                        </div>
                        <Button
                            variant="default"
                            className="w-full mt-4"
                            onClick={handleConfirmWinner}
                        >
                            Confirmar Vencedor
                        </Button>
                        <Button
                            variant="outline"
                            className="w-full mt-2"
                            onClick={() => setIsEditWinnerOpen(false)}
                        >
                            Cancelar
                        </Button>
                    </div>
                </div>
            )}

            <AuthDrawer isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />
            <PaymentDrawer isOpen={isPaymentOpen} onClose={() => setPaymentOpen(false)} />
            <Sheet open={isSidebarOpen} onOpenChange={setIsSidebarOpen}>
                <SheetContent side="right">
                    <SheetHeader>
                        <SheetTitle>Adicionar ou Editar Jogo</SheetTitle>
                    </SheetHeader>
                    <div className="mt-4 space-y-3">
                        <Input name="teamA" placeholder="Time A" value={newGame.teamA} onChange={handleChange} />
                        <Input name="teamB" placeholder="Time B" value={newGame.teamB} onChange={handleChange} />
                        <Input name="oddA" placeholder="Odd Time A" value={newGame.oddA} onChange={handleChange} />
                        <Input name="oddB" placeholder="Odd Time B" value={newGame.oddB} onChange={handleChange} />
                        <Input name="data" placeholder="Data" type="date" value={newGame.data} onChange={handleChange} />
                        <Button className="w-full mt-2" onClick={handleAddGame}>Adicionar</Button>
                    </div>
                </SheetContent>
            </Sheet>
        </>
    );
};
