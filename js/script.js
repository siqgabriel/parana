// Mudança de cor do cabeçalho 
window.addEventListener('scroll', function(){
    var menu = document.querySelector('.menu', '.logo', '.menu-mobile-item', 'icone-menu');
    menu.classList.toggle('sticky', window.scrollY > 10);
  })

// Menu hamburguer
function menuShow() {
    let menuMobile = document.querySelector('.menu-mobile');
    if (menuMobile.classList.contains('open')) {
        menuMobile.classList.remove('open');
    }  
     
    else {
        menuMobile.classList.add('open')
    }
}

// Formulário de Contato

let mensagens = [];

function validaLogin(event) {
    event.preventDefault();
    const nome = document.getElementById('idNome').value;
    const email = document.getElementById('idEmail').value;
    const mensagem = document.getElementById('idMsg').value;
    const lembrar = document.getElementById('idLembrar').checked;

    const novaMensagem = {
        nome: nome,
        email: email,
        mensagem: mensagem,
        lembrar: lembrar
    };

    mensagens.push(novaMensagem);

    alert('Mensagem enviada com sucesso!');

    document.getElementById('loginForm').reset();


    console.log(mensagens);
}

// Fomulário de Login/Cadastro

let listaUsuarios = [
    {nome: "Gabriel", email: "gabriel@email.com", senha: "123"},
    {nome: "Hadassa", email: "hadassa@email.com", senha: "123"},
    {nome: "Pedro", email: "pedro@email.com", senha: "123"},
    {nome: "Alexandre", email: "ale@email.com", senha: "123"},
];

function validaLogin(event) {
    event.preventDefault();

    let inputEmail = document.getElementById("idEmail");
    let inputSenha = document.getElementById("idSenha");
    let msgStatus = document.getElementById("popUpMessage");
    let modal = document.getElementById("popUp");

    try {
        let usuarioValido = listaUsuarios.find(usuario => usuario.email === inputEmail.value && usuario.senha === inputSenha.value);

        if (usuarioValido) {
            if (msgStatus) {
                msgStatus.setAttribute("class", "sucesso");
                msgStatus.innerText = "Login bem-sucedido!";
            }

            localStorage.setItem("usuarioLogado", JSON.stringify(usuarioValido));

            modal.style.display = "block";

            setTimeout(() => {
                modal.style.display = "none";
                window.location.href = "../paginas/dashboard.html";
            }, 3000);
        } else {
            if (msgStatus) {
                msgStatus.setAttribute("class", "erro");
                msgStatus.innerText = "Email ou senha incorretos.";
            }

            modal.style.display = "block";
        }

    } catch (error) {
        console.error("Erro ao validar login: ", error);
    }

    return false;
}

function closePopup() {
    let modal = document.getElementById("popUp");
    modal.style.display = "none";
}

function getNameFromEmail(email) {
    const namePart = email.split('@')[0];
    return namePart.charAt(0).toUpperCase() + namePart.slice(1);
}

function displayUserName() {
    const loggedUser = JSON.parse(localStorage.getItem("usuarioLogado"));
    if (loggedUser) {
        const userName = loggedUser.nome;
        const userEmail = loggedUser.email;
        const userSenha = loggedUser.senha;
        const welcomeMessageElement = document.getElementById("welcomeMessage");
        if (welcomeMessageElement) {
            welcomeMessageElement.textContent = `${userName}! e-mail: ${userEmail} senha: ${userSenha}`;
        }
    }
}

function logout() {
    localStorage.removeItem("usuarioLogado");
    window.location.href = "../paginas/cadastro.html";
}

window.onload = displayUserName;

function cadastrarUsuario(event) {
    event.preventDefault();

    let inputNome = document.getElementById("idNome");
    let inputEmail = document.getElementById("idEmailCadastro");
    let inputSenha = document.getElementById("idSenhaCadastro");
    let inputConfirmaSenha = document.getElementById("idConfirmaSenha");
    let msgStatus = document.getElementById("popUpMessageCadastro");
    let modal = document.getElementById("popUpCadastro");

    try {
        if (inputSenha.value !== inputConfirmaSenha.value) {
            msgStatus.setAttribute("class", "erro");
            msgStatus.innerText = "As senhas não conferem.";
            modal.style.display = "block";
            return;
        }

        let usuarioExistente = listaUsuarios.find(usuario => usuario.email === inputEmail.value);

        if (usuarioExistente) {
            msgStatus.setAttribute("class", "erro");
            msgStatus.innerText = "Email já cadastrado.";
            modal.style.display = "block";
            return;
        }

        let novoUsuario = {
            nome: inputNome.value,
            email: inputEmail.value,
            senha: inputSenha.value
        };

        listaUsuarios.push(novoUsuario);

        msgStatus.setAttribute("class", "sucesso");
        msgStatus.innerText = "Usuário cadastrado com sucesso!";
        modal.style.display = "block";

        setTimeout(() => {
            modal.style.display = "none";
            window.location.href = "/login.html";
        }, 3000);

    } catch (error) {
        console.error("Erro ao cadastrar usuário: ", error);
    }

    return false;
}
