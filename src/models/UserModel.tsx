// models/User.ts
export interface User {
    id: number;
    name: string;
    email: string;
    birthdate: string; // YYYY-MM-DD
    cpf: string;
    password: string;
    wallet: number; // Saldo do usuário
}
