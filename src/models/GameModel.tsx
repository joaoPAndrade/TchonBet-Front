// models/Game.ts
export interface Game {
    id: number;
    teamA: string;
    teamB: string;
    oddA: number;
    oddB: number;
    date: string; // YYYY-MM-DD
    isFinished: boolean; // Indica se o jogo já terminou
    winnerTeam: string; // Time vencedor
}
