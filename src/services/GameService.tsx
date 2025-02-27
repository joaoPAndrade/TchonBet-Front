import axios from "axios";
import { Game } from "src/models/GameModel";

const API_URL = "http://localhost:3000/games";

class GameService {
    async createGame(game: any) {
        try {
            const response = await axios.post(`${API_URL}/create`, game);
            return response.data;
        } catch (error: any) {
            throw new Error(error.response?.data?.message || "Erro ao criar um jogo");
        }
    }

    async updateGameStatus(gameId: number, team: string) {
        try {
            const response = await axios.put(`${API_URL}/finish/${gameId}`, {"team": team});
            return response.data;
        } catch (error: any) {
            throw new Error(error.response?.data?.message || "Erro ao atualizar um jogo");
        }
    }

    async getAllGames() {
        try {
            const response = await axios.get(API_URL);
            return response.data;
        } catch (error: any) {
            throw new Error(error.response?.data?.message || "Erro ao buscar jogos");
        }
    }

    async getGameById(gameId: number) {
        try {
            const response = await axios.get(`${API_URL}/${gameId}`);
            return response.data;
        } catch (error: any) {
            throw new Error(error.response?.data?.message || "Erro ao buscar jogo");
        }
    }

    async deleteGame(gameId: number) {
        try {
            const response = await axios.delete(`${API_URL}/delete/${gameId}`);
            return response.data;
        } catch (error: any) {
            throw new Error(error.response?.data?.message || "Erro ao deletar jogo");
        }
    }
}

export default new GameService();
