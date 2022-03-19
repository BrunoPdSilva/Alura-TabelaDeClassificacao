const form = document.querySelector('#add-form')
const tabelaJogadores = document.getElementById("tabelaJogadores")
let jogadores = []

form.addEventListener('submit', (e) => {
    e.preventDefault()
    adicionaJogador()
})

const calculaPontos = jogador => jogador.pontos = jogador.vitorias * 3 + jogador.empates - jogador.derrotas

function exibeJogador(jogadores) {
    let elemento = ""
    for (let i = 0; i < jogadores.length; i++) {
        elemento += `
            <tr>
                <td>${jogadores[i].nome}</td>
                <td>${jogadores[i].vitorias}</td>
                <td>${jogadores[i].empates}</td>
                <td>${jogadores[i].derrotas}</td>
                <td>${jogadores[i].pontos}</td>
                <td><button onClick="adicionarVitoria(${i})">Vitória</button></td>
                <td><button onClick="adicionarEmpate(${i})">Empate</button></td>
                <td><button onClick="adicionarDerrota(${i})">Derrota</button></td>
            </tr>
        `
    }
    tabelaJogadores.innerHTML = elemento;
}

function adicionaJogador() {
    let nick = form.newPlayer.value;
    jogadores.push({ nome: nick, vitorias: 0, empates: 0, derrotas: 0, pontos: 0 })
    exibeJogador(jogadores)
    form.reset()
}

function adicionarVitoria(i) {
    let jogador = jogadores[i]
    for (let n = 0; n < jogadores.length; n++) {
        let jogadorN = jogadores[n]
        if (n != i) {
            jogadorN.derrotas++
            jogadorN.pontos = calculaPontos(jogadorN)
        }
    }
    jogador.vitorias++
    jogador.pontos = calculaPontos(jogador)
    exibeJogador(jogadores)
}

function adicionarEmpate() {
    jogadores.forEach(jogador => {
        jogador.empates++
        jogador.pontos = calculaPontos(jogador)
    })
    exibeJogador(jogadores)
}

function adicionarDerrota(i) {
    let jogador = jogadores[i]
    for (let n = 0; n < jogadores.length; n++) {
        let jogadorN = jogadores[n]
        if (n != i) {
            jogadorN.vitorias++
            jogadorN.pontos = calculaPontos(jogadorN)
        }
    }
    jogador.derrotas++
    jogador.pontos = calculaPontos(jogador)
    exibeJogador(jogadores)
}

function resetScore() {
    jogadores.forEach((jogador) => { jogador.vitorias = 0; jogador.empates = 0; jogador.derrotas = 0; jogador.pontos = 0 })
    exibeJogador(jogadores)
}