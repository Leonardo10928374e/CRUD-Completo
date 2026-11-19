//Lista de categorias e filmes do catálogo
//Para usar uma imagem de capa, adicione  img: 'imagens/nome.jpg'  no filme
var categorias = [
    {
        nome: 'Em alta',
        filmes: [
            { titulo: 'Interestelar', ano: 2014, genero: 'Ficção' },
            { titulo: 'Matrix', ano: 1999, genero: 'Ficção' },
            { titulo: 'Gladiador', ano: 2000, genero: 'Ação' },
            { titulo: 'O Poderoso Chefão', ano: 1972, genero: 'Drama' },
            { titulo: 'Pulp Fiction', ano: 1994, genero: 'Crime' },
            { titulo: 'Clube da Luta', ano: 1999, genero: 'Drama' }
        ]
    },
    {
        nome: 'Ação e aventura',
        filmes: [
            { titulo: 'Mad Max: Estrada da Fúria', ano: 2015, genero: 'Ação' },
            { titulo: 'John Wick', ano: 2014, genero: 'Ação' },
            { titulo: 'Indiana Jones', ano: 1981, genero: 'Aventura' },
            { titulo: 'Top Gun: Maverick', ano: 2022, genero: 'Ação' },
            { titulo: 'O Senhor dos Anéis', ano: 2001, genero: 'Fantasia' },
            { titulo: 'Jurassic Park', ano: 1993, genero: 'Aventura' }
        ]
    },
    {
        nome: 'Comédia',
        filmes: [
            { titulo: 'Se Beber, Não Case!', ano: 2009, genero: 'Comédia' },
            { titulo: 'Super Bad', ano: 2007, genero: 'Comédia' },
            { titulo: 'Debi & Lóide', ano: 1994, genero: 'Comédia' },
            { titulo: 'Escola de Rock', ano: 2003, genero: 'Comédia' },
            { titulo: 'Os Caça-Fantasmas', ano: 1984, genero: 'Comédia' },
            { titulo: 'Entrando numa Fria', ano: 2000, genero: 'Comédia' }
        ]
    },
    {
        nome: 'Animação',
        filmes: [
            { titulo: 'Toy Story', ano: 1995, genero: 'Animação' },
            { titulo: 'Shrek', ano: 2001, genero: 'Animação' },
            { titulo: 'Up: Altas Aventuras', ano: 2009, genero: 'Animação' },
            { titulo: 'Divertida Mente', ano: 2015, genero: 'Animação' },
            { titulo: 'Procurando Nemo', ano: 2003, genero: 'Animação' },
            { titulo: 'Rei Leão', ano: 1994, genero: 'Animação' }
        ]
    },
    {
        nome: 'Terror e suspense',
        filmes: [
            { titulo: 'O Iluminado', ano: 1980, genero: 'Terror' },
            { titulo: 'Corra!', ano: 2017, genero: 'Suspense' },
            { titulo: 'Psicose', ano: 1960, genero: 'Suspense' },
            { titulo: 'Invocação do Mal', ano: 2013, genero: 'Terror' },
            { titulo: 'Seven', ano: 1995, genero: 'Suspense' },
            { titulo: 'O Silêncio dos Inocentes', ano: 1991, genero: 'Suspense' }
        ]
    }
]

var botao = document.getElementById('btnAssistir')
var catalogo = document.getElementById('catalogo')
var montado = false

//Cria o HTML do catálogo uma única vez
function montarCatalogo() {
    var indice = 0

    categorias.forEach(function (categoria) {
        var secao = document.createElement('div')
        secao.className = 'categoria'

        var titulo = document.createElement('h3')
        titulo.innerText = categoria.nome
        secao.appendChild(titulo)

        var fileira = document.createElement('div')
        fileira.className = 'fileira'

        categoria.filmes.forEach(function (filme) {
            var cartao = document.createElement('article')
            cartao.className = 'filme'

            //Cada filme recebe uma cor diferente (matiz do gradiente)
            var matiz = (indice * 47) % 360
            cartao.style.setProperty('--matiz', matiz)

            //Se tiver imagem, usa como capa
            if (filme.img) {
                cartao.style.backgroundImage = 'url(' + filme.img + ')'
                cartao.classList.add('com-imagem')
            }

            var nome = document.createElement('strong')
            nome.innerText = filme.titulo

            var info = document.createElement('span')
            info.innerText = filme.ano + ' • ' + filme.genero

            cartao.appendChild(nome)
            cartao.appendChild(info)
            fileira.appendChild(cartao)

            indice++
        })

        secao.appendChild(fileira)
        catalogo.appendChild(secao)
    })

    montado = true
}

//Clique no botão: mostra ou esconde o catálogo
botao.addEventListener('click', function () {
    if (!montado) {
        montarCatalogo()
    }

    if (catalogo.hidden) {
        catalogo.hidden = false
        botao.innerText = 'Ocultar catálogo'
        catalogo.scrollIntoView({ behavior: 'smooth', block: 'start' })
    } else {
        catalogo.hidden = true
        botao.innerText = 'Começar a assistir'
    }
})