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
import { useUserStorage } from "@/store/UserStorage";
import GameService from "@/services/GameService";
import BetService from "@/services/BetService"; // Importe o BetService
import { Bet } from "@/models/BetModel"; // Importe o modelo Bet
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


export const GamesPage = () => {
    // Estados para controle de UI
    const [isLoginOpen, setIsLoginOpen] = useState(false);
    const [isPaymentOpen, setPaymentOpen] = useState(false);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isBettingOpen, setIsBettingOpen] = useState(false);
    const [isEditWinnerOpen, setIsEditWinnerOpen] = useState(false);

    // Estados para apostas e vencedores
    const [selectedBet, setSelectedBet] = useState<"teamA" | "teamB" | "none">("none");
    const [selectedWinner, setSelectedWinner] = useState<"teamA" | "teamB" | "none">("none");
    const [selectedGame, setSelectedGame] = useState<Game | null>(null);
    const [betAmount, setBetAmount] = useState<number>(0); // Estado para o valor da aposta

    // Estado para adicionar/editar jogos
    const [newGame, setNewGame] = useState({ teamA: "", teamB: "", oddA: 0.0, oddB: 0.0, date: "" });

    // Estado para armazenar a lista de jogos
    const [games, setGames] = useState<Game[]>([]);

    // Obter o usuário atual
    const { user } = useUserStorage();

    // Buscar jogos ao carregar a página
    useEffect(() => {
        const fetchGames = async () => {
            try {
                const games = await GameService.getAllGames();
                setGames(games);
            } catch (error) {
                console.error("Erro ao buscar jogos:", error);
            }
        };

        fetchGames();
    }, []);

    // Função para lidar com mudanças nos inputs do formulário
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewGame({ ...newGame, [e.target.name]: e.target.value });
    };

    // Função para adicionar ou editar um jogo
    const handleAddGame = async () => {
        try {
            const game = await GameService.createGame(newGame);
            setGames([...games, game]);
            setNewGame({ teamA: "", teamB: "", oddA: 0.0, oddB: 0.0, date: "" });
            toast.success("Jogo adicionado com sucesso!");
            setIsSidebarOpen(false);
        } catch (error) {
            console.error("Erro ao adicionar jogo:", error);
            toast.error("Erro ao adicionar jogo. Tente novamente.");
        }
    };


    // Função para abrir o pop-up de edição de vencedor
    const handleEditWinner = (game: Game) => {
        setSelectedGame(game);
        setSelectedWinner(game.winnerTeam === "false" ? "none" : game.winnerTeam as "teamA" | "teamB");
        setIsEditWinnerOpen(true);
    };

    // Função para confirmar o vencedor
    const handleConfirmWinner = async () => {
        if (selectedWinner === "none" || !selectedGame) {
            toast.error("Selecione um time vencedor!");
            return;
        }

        try {
            const updatedGame = await GameService.updateGameStatus(selectedGame.id, selectedWinner);
            setGames(games.map(g => g.id === updatedGame.id ? updatedGame : g));
            setIsEditWinnerOpen(false);
            toast.success("Vencedor atualizado com sucesso!");
        } catch (error) {
            console.error("Erro ao atualizar o vencedor:", error);
            toast.error("Erro ao atualizar o vencedor. Tente novamente.");
        }
    };

    // Função para lidar com a aposta
    const handleBet = (game: Game) => {
        setSelectedGame(game); // Define o jogo selecionado
        setIsBettingOpen(true); // Abre o pop-up de aposta
    };

    // Função para confirmar a aposta
    const handleConfirmBet = async () => {
        if (selectedBet === "none" || !selectedGame || !user?.user?.id) {
            toast.error("Selecione um time para apostar e insira um valor!");
            return;
        }

        if (betAmount <= 0) {
            toast.error("O valor da aposta deve ser maior que zero!");
            return;
        }

        try {
            const newBet: Bet = {
                idUser: user.user.id,
                idGame: selectedGame.id,
                amount: betAmount,
                date: new Date().toISOString().split("T")[0],
                time: new Date().toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" }),
                status: "waiting",
                team: selectedBet === "teamA" ? selectedGame.teamA : selectedGame.teamB,
                betOdd: selectedBet === "teamA" ? selectedGame.oddA : selectedGame.oddB,
            };

            await BetService.createBet(newBet);

            toast.success("Aposta realizada com sucesso!");
            setIsBettingOpen(false);
            setSelectedBet("none");
            setBetAmount(0);
        } catch (error) {
            console.error("Erro ao realizar aposta:", error);
            toast.error("Erro ao realizar aposta. Tente novamente.");
        }
    };

    // Verificar se o usuário é admin
    const isAdmin = user?.user?.name === "admin";

    if (!user) {
        return <div>Carregando...</div>;
    }

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
                    {games.map((game) => (
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
                                    {!isAdmin && user.user && (
                                        <Button variant="default" onClick={() => handleBet(game)}>Apostar</Button>
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
                        <Input
                            type="number"
                            placeholder="Valor da Aposta"
                            value={betAmount}
                            onChange={(e) => setBetAmount(parseFloat(e.target.value))}
                            className="w-full mb-4"
                        />
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
            {isEditWinnerOpen && selectedGame && (
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

            {/* Drawer de Autenticação e Pagamento */}
            <AuthDrawer isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />
            <PaymentDrawer isOpen={isPaymentOpen} onClose={() => setPaymentOpen(false)} />

            {/* Sidebar para Adicionar Jogo */}
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
                        <Input name="date" placeholder="Data" type="date" value={newGame.date} onChange={handleChange} />
                        <Button className="w-full mt-2" onClick={handleAddGame}>Adicionar</Button>
                    </div>
                </SheetContent>
            </Sheet>
        </>
    );
};