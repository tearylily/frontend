const API_URL = "http://192.168.0.119:3000";

async function apiRequest(endpoint, options = {}) {

    const response = await fetch(
        `${API_URL}${endpoint}`,
        {
            ...options,

            headers: {
                "Content-Type": "application/json",
                ...(options.headers || {})
            }
        }
    );

    let data = null;

    try {
        data = await response.json();
    } catch (error) {
        data = null;
    }

    if (!response.ok) {
        throw new Error(
            data?.message ||
            "Erro ao conectar com o servidor."
        );
    }

    return data;
}


async function login(email, password) {

    return await apiRequest(
        "/api/auth/login",
        {
            method: "POST",

            body: JSON.stringify({
                email: email,
                password: password
            })
        }
    );

}
