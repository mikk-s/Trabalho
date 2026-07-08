const form = document.getElementById('cadastro-form');
const usuarioInput = document.getElementById('usuario');
const senhaInput = document.getElementById('senha');

form.addEventListener('submit', (event) => {
    event.preventDefault();

    const usuario = usuarioInput.value.trim();
    const senha = senhaInput.value.trim();

    if (senha.length < 8) {
        alert('A senha deve ter no mínimo 8 caracteres.');
        return;
    }

    const specialCharRegex = /[!@#$%^&*(),.?":{}|<>]/;
    if (!specialCharRegex.test(senha)) {
        alert('A senha deve conter pelo menos um caractere especial.');
        return;
    }

    // Se o cadastro for bem-sucedido
    alert('Cadastro realizado com sucesso!');
    window.location.href = 'login.html';
});
