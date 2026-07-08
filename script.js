// Login
const nome = document.getElementById("Cnome").value.trim();
const usuario = document.getElementById("Cusuario").value.trim();
const senha = document.getElementById("Csenha").value.trim();

let msg = document.getElementById("msg");

let button = document.getElementById("btn").addEventListener("click", function(event){
    event.preventDefault();

if(nome === "" || usuario === "" || senha === ""){
    msg.innerHTML("Preencha todos os campos!");
}else if(senha.length < 6){
    msg.innerHTML("A senha deve ter pelo menos 6 caracteres!");
}else{
    msg.innerHTML   ("Cadastro realizado com sucesso!");
}
})