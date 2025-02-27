import axios from "axios";
import { User } from "src/models/UserModel";

const API_URL = "http://localhost:3000/users";

class UserService {
    async createUser(user: User) {
        try {
            const response = await axios.post(`${API_URL}`, user);
            return response.data;
        } catch (error: any) {
            throw new Error(error.response?.data?.message || "Erro ao criar usuário");
        }
    }

    async updateUser(user: User) {
        try {
            const response = await axios.put(`${API_URL}/${user.id}`, user);
            return response.data;
        } catch (error: any) {
            throw new Error(error.response?.data?.message || "Erro ao atualizar usuário");
        }
    }

    async authenticateUser(cpf: string, senha: string) {
        try {
            const response = await axios.post(`http://localhost:3000/auth/login`, { cpf, senha });
            return response.data;
        } catch (error: any) {
            throw new Error(error.response?.data?.message || "Erro ao autenticar usuário");
        }
    }

    async getUserById(userId: number) {
        try {
            const response = await axios.get(`${API_URL}/${userId}`);
            return response.data;
        } catch (error: any) {
            throw new Error(error.response?.data?.message || "Erro ao buscar usuário");
        }
    }
}

export default new UserService();
