//Mostra, no canto superior direito, o perfil de quem fez login (inicial do nome)
//Esse arquivo é incluído em todas as páginas, menos no index.html

//Lê o nome salvo no login (script.js e loginAdmin.js gravam ele)
var nomePerfil = ''
try {
    nomePerfil = localStorage.getItem('perfilNome') || ''
} catch (e) {
    nomePerfil = ''
}


//Estilo do perfil – fica aqui dentro para funcionar mesmo que o style.css não tenha o bloco do perfil
function aplicarEstilo() {
    var estilo = document.createElement('style')
    estilo.innerText = `
        .perfil-barra {
            position: fixed;
            top: 0;
            right: 24px;
            height: var(--nav-h, 68px);
            display: flex;
            align-items: center;
            gap: 18px;
            z-index: 70;
        }

        .perfil-barra::after {
            content: "CINEFLIX";
            color: var(--red, #e50914);
            font-family: 'Bebas Neue', Impact, 'Arial Black', sans-serif;
            font-size: 2.2rem;
            letter-spacing: 4px;
            text-shadow: 0 0 18px rgba(229, 9, 20, 0.55);
            pointer-events: none;
            animation: logo-brilho 4s ease-in-out infinite;
        }

        body.com-perfil::after {
            display: none;
        }

        .perfil {
            width: 40px;
            height: 40px;
            display: flex;
            align-items: center;
            justify-content: center;
            color: #ffffff;
            background: linear-gradient(
                145deg,
                hsl(var(--perfil-matiz, 355), 75%, 48%),
                hsl(calc(var(--perfil-matiz, 355) + 30), 70%, 28%)
            );
            border: 2px solid rgba(255, 255, 255, 0.85);
            border-radius: 50%;
            font-family: 'Arial Black', Arial, sans-serif;
            font-size: 1.15rem;
            font-weight: 900;
            line-height: 1;
            user-select: none;
            cursor: default;
            box-shadow: 0 0 14px rgba(0, 0, 0, 0.6);
            animation: perfil-entra 0.5s ease both;
            transition: transform 0.2s, box-shadow 0.2s;
        }

        .perfil:hover {
            transform: scale(1.12);
            box-shadow: 0 0 0 3px rgba(229, 9, 20, 0.7);
        }

        .perfil.perfil-vazio {
            background: #3a3a3a;
            border-color: rgba(255, 255, 255, 0.35);
            color: #b3b3b3;
        }

        @keyframes perfil-entra {
            from { opacity: 0; transform: scale(0.5); }
            to   { opacity: 1; transform: scale(1); }
        }

        @keyframes logo-brilho {
            0%, 100% { text-shadow: 0 0 10px rgba(229, 9, 20, 0.35); }
            50%      { text-shadow: 0 0 26px rgba(229, 9, 20, 0.85); }
        }

        @media (max-width: 600px) {
            .perfil-barra::after { font-size: 1.6rem; }
        }

        @media (prefers-reduced-motion: reduce) {
            .perfil, .perfil-barra::after { animation: none; }
        }
    `
    document.head.appendChild(estilo)
}

//Cria o círculo com a inicial
function criarPerfil() {
    var inicial = nomePerfil ? nomePerfil.trim().charAt(0).toUpperCase() : '?'

    //Cor do avatar muda de acordo com o nome (sempre a mesma para o mesmo nome)
    var soma = 0
    for (var i = 0; i < nomePerfil.length; i++) {
        soma += nomePerfil.charCodeAt(i)
    }

    var barra = document.createElement('div')
    barra.className = 'perfil-barra'

    var avatar = document.createElement('div')
    avatar.className = 'perfil'
    avatar.innerText = inicial
    avatar.title = nomePerfil || 'Nenhum perfil logado'

    if (nomePerfil) {
        avatar.style.setProperty('--perfil-matiz', (soma * 37) % 360)
    } else {
        avatar.classList.add('perfil-vazio')
    }

    barra.appendChild(avatar)
    document.body.appendChild(barra)

    //A logo passa a ser desenhada pela barra, para ficar ao lado do perfil
    document.body.classList.add('com-perfil')
}

aplicarEstilo()
criarPerfil()