import axios from "axios";

const API_BASE_URL = "http://64.23.136.87:8000";

export const authAPI = {
    async login(username: string, password: string): Promise<{ accessToken: string; user: any }> {
        const userData = new URLSearchParams();
        userData.append("username", username);
        userData.append("password", password);

        try {
            const response = await axios.post(`${API_BASE_URL}/auth/login`, userData, {
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
            });

            const { accessToken, user } = response.data;

            localStorage.setItem("accessToken", accessToken);

            return { accessToken, user };
        } catch (error) {
            throw error;
        }
    },

    async register(name: string, surname: string, middleName: string, email: string, password: string): Promise<any> {
        const userData = {
            email: email,
            password: password,
            name: name,
            surname: surname,
            middle_name: middleName,
        };

        try {
            const response = await axios.post(`${API_BASE_URL}/auth/register`, userData, {
                headers: {
                    "Content-Type": "application/json",
                },
            });

            return response.data;
        } catch (error) {
            throw error;
        }
    },

    async recovery(email: string): Promise<void> {
        const userData = {
            email,
        };

        try {
            const response = await axios.post(`${API_BASE_URL}/recovery`, userData, {
                headers: {
                    "Content-Type": "application/json",
                },
            });
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    async getUserData(): Promise<any> {
        try {
            const token = localStorage.getItem("accessToken");

            const response = await axios.get(`${API_BASE_URL}/users/me`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            });

            return response.data;
        } catch (error) {
            throw error;
        }
    },

    async postUserData(name: string, surname: string, middleName: string, email: string, password: string): Promise<any> {
        try {
            const token = localStorage.getItem("accessToken");

            const userData = {
                email,
                password,
                name,
                surname,
                middleName,
            };

            const response = await axios.patch(`${API_BASE_URL}/users/me`, userData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            });

            return response.data;
        } catch (error) {
            throw error;
        }
    },

    async logout(): Promise<void> {
        const token = localStorage.getItem("accessToken");

        try {
            await axios.post(`${API_BASE_URL}/auth/logout`, {}, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
        } catch (error) {
            throw error;
        }
    },
};

