
const loginForm = document.getElementById("loginForm");
const loginButton = document.getElementById("loginButton");
const loginMessage = document.getElementById("loginMessage");


loginForm.addEventListener("submit", async function (event) {

    event.preventDefault();

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;

    loginMessage.classList.add("hidden");

    if (!email || !password) {

        loginMessage.textContent =
            "E-mail e senha são obrigatórios.";

        loginMessage.classList.remove("hidden");

        return;
    }


    loginButton.disabled = true;
    loginButton.textContent = "ENTRANDO...";


    try {

        console.log("Tentando fazer login...");

        const response = await login(email, password);

        console.log("Resposta do Back-end:", response);


        if (!response.success) {

            throw new Error(
                response.message ||
                "E-mail ou senha inválidos."
            );
        }


        /*
         * A sua API retorna o usuário dentro de:
         *
         * response.data
         */

        const usuario = response.data;


        console.log("Usuário:", usuario);


        /*
         * Salvar usuário no navegador
         */

        localStorage.setItem(
            "user",
            JSON.stringify(usuario)
        );


        /*
         * Verificar se o usuário foi salvo
         */

        console.log(
            "Usuário salvo:",
            localStorage.getItem("user")
        );


        /*
         * REDIRECIONAMENTO
         */

        window.location.href = "./pages/dashboard.html";


    } catch (error) {

        console.error("Erro no login:", error);

        loginMessage.textContent =
            error.message ||
            "Erro ao realizar login.";

        loginMessage.classList.remove("hidden");


    } finally {

        loginButton.disabled = false;

        loginButton.textContent = "ENTRAR";

    }

});
