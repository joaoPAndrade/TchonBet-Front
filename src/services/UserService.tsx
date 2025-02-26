import axios from "axios";
import { User } from "src/models/UserModel";

const API_URL = "http://localhost:3000/api/users";

class UserService {
    async createUser(user: User) {
        try {
            const response = await axios.post(`${API_URL}/create`, user);
            return response.data;
        } catch (error: any) {
            throw new Error(error.response?.data?.message || "Erro ao criar usuário");
        }
    }

    async updateUser(user: User) {
        try {
            const response = await axios.put(`${API_URL}/update/${user.id}`, user);
            return response.data;
        } catch (error: any) {
            throw new Error(error.response?.data?.message || "Erro ao atualizar usuário");
        }
    }

    async authenticateUser(username: string, password: string) {
        try {
            const response = await axios.post(`${API_URL}/login`, { username, password });
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
