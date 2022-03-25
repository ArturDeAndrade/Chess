// notação FEN
let fen = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1"
fen = "R4rk1/2p2ppp/2nb1q2/1p6/4P1b1/1P2BN2/1PP1QPPP/5RK1 w - - 1 16"
const regex = /(([rnbqkp1-8]{1,8})\/([rnbqkp1-8]{1,8})\/([rnbqkp1-8]{1,8})\/([rnbqkp1-8]{1,8})\/([rnbqkp1-8]{1,8})\/([rnbqkp1-8]{1,8})\/([rnbqkp1-8]{1,8})\/([rnbqkp1-8]{1,8}))\s(w|b)\s(-|K?Q?k?q?)\s(-|\w\d)\s(\d+)\s(\d+)/i
const posicao = regex.exec(fen)
console.log(posicao)

// definir turno ( w - white / b - black ) ( grupo 10 da regex fen )
let turno = posicao[10]
console.log(turno)
/*
switch (posicao[10]) {
    case "w":
        turno = "branca"
        break
    case "b":
        turno = "preta"
        break
    default:
        turno = undefined
}
*/

// determina quantos e quais roques podem ser feitos
let roque = posicao[11]

// determina se há possibilidade de en passant
let enPassant = posicao[12]

// número de meio-movimentos desde a última captura ou avanço de peão
// o jogo termina em empate quando esse número chega a 100
let cinquenta = posicao[13]

// número de movimentos
let movimentos = posicao[14]

const atribuirTipo = letra => {
    tipo = letra.toLowerCase()
    switch (tipo) {
        case "p":
            return "pawn"
        case "r":
            return "rook"
        case "n":
            return "knight"
        case "b":
            return "bishop"
        case "q":
            return "queen"
        case "k":
            return "king"
        default:
            return "board"
    }
}

const pecas = []
const p = 0

const criarPeca = peca => {
    let tipo = atribuirTipo(peca)
    pecas[p] = document.createElement("div")
    pecas[p].classList.add("peca", /[rnbqkp]/.test(peca) ? "preta" : "branca", tipo)
    pecas[p].setAttribute("draggable", "true")
    pecas[p].id = `peca-${p + 1}`
    pecas[p].innerHTML = `<i class="fa-solid fa-chess-${tipo} icone"></i>`
    return pecas[p]
}

const gerarPos = (fen, casas) => {
    const posicao = regex.exec(fen)[1].replace(/\//g, "")
    let c = 0, p = 0
    // analisar as 8 strings com as posições e atribuir as peças correspondentes
    while (c < 64) {
        // conferir se a próxima casa da posicão contém uma peça
        if (posicao[p].match(/[rnbqkp]/i)) {
            const peca = criarPeca(posicao[p])
            casas[c].append(peca)
            c++
        // se contiver um número, pular a quantidade de casas correspondentes
        } else {
            numero = parseInt(posicao[p])
            c += numero
        }
        p++
    }
}

const tabuleiro = document.querySelector("#tabuleiro")
const casas = []
let c = 0
for (let linha = 0; linha < 8; linha++) {
    for (let coluna = 0; coluna < 8; coluna++) {
        const casa = document.createElement("div")
        casa.id = `${linha}-${coluna}`
        casa.classList.add("casa")
        if ((linha + coluna) % 2 !== 0) {
            casa.classList.add("escura")
        } else {
            casa.classList.add("clara")
        }
        casas.push(casa)
        tabuleiro.append(casa)
    }
}

gerarPos(fen, casas)