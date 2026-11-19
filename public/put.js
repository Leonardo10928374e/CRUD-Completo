//Função para buscar a pessoa pelo CPF e preencher TODOS os campos
function buscarDados() {
    var cpf = document.getElementById('identificadorCPF').value

    fetch('/pessoas', {
        method: 'GET'
    })
        .then(resposta => resposta.json())
        .then(dados => {
            let pessoaEncontrada = dados.find(pessoa => pessoa.cpf == cpf)

            if (pessoaEncontrada) {
                document.getElementById('identificador').value = pessoaEncontrada.id
                document.getElementById('identificadorCPF').value = pessoaEncontrada.cpf
                document.getElementById('nomeAtualizar').value = pessoaEncontrada.nome
                document.getElementById('sobrenomeAtualizar').value = pessoaEncontrada.sobrenome
                document.getElementById('emailAtualizar').value = pessoaEncontrada.email
                document.getElementById('senhaAtualizar').value = pessoaEncontrada.senha
                document.getElementById('ruaAtualizar').value = pessoaEncontrada.rua
                document.getElementById('cepAtualizar').value = pessoaEncontrada.cep
                document.getElementById('cidadeAtualizar').value = pessoaEncontrada.cidade
                document.getElementById('estadoAtualizar').value = pessoaEncontrada.estado
                document.getElementById('telefoneAtualizar').value = pessoaEncontrada.telefone
            } else {
                alert("Pessoa não encontrada.")
            }
        })
}

//Função para enviar TODOS os campos atualizados - UPDATE
function atualizarDados() {
    var id = document.getElementById('identificador').value
    var cpf = document.getElementById('identificadorCPF').value
    var nome = document.getElementById('nomeAtualizar').value
    var sobrenome = document.getElementById('sobrenomeAtualizar').value
    var email = document.getElementById('emailAtualizar').value
    var senha = document.getElementById('senhaAtualizar').value
    var rua = document.getElementById('ruaAtualizar').value
    var cep = document.getElementById('cepAtualizar').value
    var cidade = document.getElementById('cidadeAtualizar').value
    var estado = document.getElementById('estadoAtualizar').value
    var telefone = document.getElementById('telefoneAtualizar').value

    //Sem ID significa que a pessoa ainda não foi buscada
    if (!id) {
        alert('Busque a pessoa pelo CPF antes de atualizar.')
        return
    }

    fetch(`/pessoas/${id}`, {
        method: 'PATCH', //PATCH atualiza só os campos enviados e mantém o resto
        headers: {
            'Content-Type': 'application/json' //Tipo de conteudo enviado JSON
        },
        body: JSON.stringify({ //Dados a serem enviados e convertidos
            nome: nome,
            sobrenome: sobrenome,
            cpf: cpf,
            email: email,
            senha: senha,
            rua: rua,
            cep: cep,
            cidade: cidade,
            estado: estado,
            telefone: telefone
        })
    })
        .then(resposta => {
            if (resposta.ok) {
                alert('Cadastro atualizado com sucesso!')
            } else {
                alert('Não foi possível atualizar o cadastro.')
            }
        })
}