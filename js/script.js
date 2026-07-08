document.addEventListener('DOMContentLoaded', () => {
    
    // ==========================================
    // ETAPA 1 - CADASTRO
    // ==========================================
    const formCadastro = document.getElementById('formCadastro');
    if (formCadastro) {
        formCadastro.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Remoção de espaços com trim()
            const usuario = document.getElementById('cadUsuario').value.trim();
            const senha = document.getElementById('cadSenha').value.trim();
            const mensagem = document.getElementById('mensagemCadastro');

            // Regex para checar se possui ao menos um caractere especial
            const regexEspecial = /[!@#$%^&*(),.?":{}|<>_\-+=\\/[\]]/;
            
            if (!regexEspecial.test(senha)) {
                exibirMensagem(mensagem, 'A senha precisa de pelo menos um caractere especial!', 'danger');
                return;
            }

            // Armazena temporariamente para simular banco de dados
            localStorage.setItem('usuarioCadastrado', usuario);
            localStorage.setItem('senhaCadastrada', senha);

            exibirMensagem(mensagem, 'Cadastro efetuado! Abrindo Login...', 'success');
            
            setTimeout(() => {
                window.location.href = 'login.html';
            }, 2000);
        });
    }

    // ==========================================
    // ETAPA 2 - LOGIN
    // ==========================================
    const formLogin = document.getElementById('formLogin');
    if (formLogin) {
        formLogin.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Remoção de espaços com trim()
            const usuarioInput = document.getElementById('loginUsuario').value.trim();
            const senhaInput = document.getElementById('loginSenha').value.trim();
            const mensagem = document.getElementById('mensagemLogin');

            const usuarioSalvo = localStorage.getItem('usuarioCadastrado');
            const senhaSalva = localStorage.getItem('senhaCadastrada');

            if (usuarioInput === usuarioSalvo && senhaInput === senhaSalva && usuarioSalvo !== null) {
                localStorage.setItem('usuarioLogado', usuarioInput);
                exibirMensagem(mensagem, 'Autenticado com sucesso!', 'success');
                setTimeout(() => {
                    window.location.href = 'home.html';
                }, 1500);
            } else {
                exibirMensagem(mensagem, 'Usuário ou senha inválidos.', 'danger');
            }
        });
    }

    // ==========================================
    // ETAPA 3 - HOME (Boas-vindas)
    // ==========================================
    const boasVindas = document.getElementById('boasVindas');
    if (boasVindas) {
        const usuarioAtivo = localStorage.getItem('usuarioLogado') || 'Usuário';
        boasVindas.textContent = `Olá, ${usuarioAtivo}!`;
    }

    // ==========================================
    // ETAPA 4 - PRODUTOS
    // ==========================================
    const formProduto = document.getElementById('formProduto');
    if (formProduto) {
        let arrayProdutos = JSON.parse(localStorage.getItem('produtosSalvos')) || [];

        const inputProduto = document.getElementById('nomeProduto');
        const containerLista = document.getElementById('listaProdutos');
        const contador = document.getElementById('contadorProdutos');
        const msgProd = document.getElementById('mensagemProduto');

        // Renderizar a lista na tela
        const atualizarListaInterface = () => {
            containerLista.innerHTML = '';
            arrayProdutos.forEach(prod => {
                const li = document.createElement('li');
                li.className = 'list-group-item bg-white text-dark border-secondary';
                li.textContent = prod;
                containerLista.appendChild(li);
            });
            contador.textContent = `Cadastrados: ${arrayProdutos.length}`;
            localStorage.setItem('produtosSalvos', JSON.stringify(arrayProdutos));
        };

        // Adicionar novo produto
        formProduto.addEventListener('submit', (e) => {
            e.preventDefault();
            const valorInput = inputProduto.value.trim(); // Aplicação de trim()

            if (valorInput === "") {
                exibirMensagem(msgProd, 'Não é permitido cadastrar com o campo vazio.', 'warning');
                return;
            }

            arrayProdutos.push(valorInput);
            inputProduto.value = '';
            exibirMensagem(msgProd, `Produto "${valorInput}" cadastrado!`, 'success');
            atualizarListaInterface();
        });

        // Excluir último produto cadastrado
        document.getElementById('btnExcluir').addEventListener('click', () => {
            if (arrayProdutos.length === 0) {
                exibirMensagem(msgProd, 'Nenhum produto em estoque para excluir.', 'warning');
                return;
            }
            const deletado = arrayProdutos.pop();
            exibirMensagem(msgProd, `Produto "${deletado}" removido do sistema.`, 'info');
            atualizarListaInterface();
        });

        // Ordenar em Ordem Alfabética
        document.getElementById('btnOrdenar').addEventListener('click', () => {
            if (arrayProdutos.length <= 1) {
                exibirMensagem(msgProd, 'Adicione mais produtos para organizar.', 'warning');
                return;
            }
            arrayProdutos.sort((x, y) => x.localeCompare(y));
            exibirMensagem(msgProd, 'Catálogo ordenado em ordem alfabética.', 'success');
            atualizarListaInterface();
        });

        // Inicializar mostrando o que já está salvo
        atualizarListaInterface();
    }
});

// Função Utilitária para Feedback Visual
function exibirMensagem(alvo, texto, classeBootstrap) {
    alvo.textContent = texto;
    alvo.className = `alert alert-${classeBootstrap} d-block`;
    setTimeout(() => {
        alvo.className = 'alert d-none';
    }, 4000);
}