import axios from "axios";
import { Bet } from "src/models/BetModel";

const API_URL = "http://localhost:3000/api/bet";

class GameService {
    async createBet(bet: Bet) {
        try {
            const response = await axios.post(`${API_URL}/create`, bet);
            return response.data;
        } catch (error: any) {
            throw new Error(error.response?.data?.message || "Erro ao criar uma aposta");
        }
    }

    async getBetsByIdGame(gameId: number) {
        try {
            const response = await axios.get(`${API_URL}/gameId/${gameId}`);
            return response.data;
        } catch (error: any) {
            throw new Error(error.response?.data?.message || "Erro ao buscar as bets do jogo");
        }
    }

    async getBetsByIdUser(userId: number) {
        try {
            const response = await axios.get(`${API_URL}/userId/${userId}`);
            return response.data;
        } catch (error: any) {
            throw new Error(error.response?.data?.message || "Erro ao buscar as bets do usuário");
        }
    }
}

export default new GameService();
