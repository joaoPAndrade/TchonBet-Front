// models/Bet.ts
export interface Bet {
    id?: number;
    idUser: number;
    idGame: number;
    amount: number;
    date: string; // YYYY-MM-DD
    time: string; // HH:MM
    status: string; // win, loss, waiting
    team: string; // Nome do time apostado
    betOdd: number; // Odd no momento da aposta
}
