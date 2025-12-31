const letterPoints = {
    a: 1, b: 3, c: 3, d: 2, e: 1,
    f: 4, g: 2, h: 4, i: 1,
    j: 8, k: 5, l: 1, m: 3,
    n: 1, o: 1, p: 3, q: 10,
    r: 1, s: 1, t: 1, u: 1,
    v: 4, w: 4, x: 8, y: 4, z: 10,

    "-": 10 // 🎲 comodín
};

let players = [];
let currentPlayer = 0;

function createPlayers() {
    const num = document.getElementById("numPlayers").value;
    const container = document.getElementById("playerNames");
    container.innerHTML = "";

    if (num < 1) return;

    for (let i = 0; i < num; i++) {
        const input = document.createElement("input");
        input.placeholder = `Nombre del jugador ${i + 1}`;
        input.classList.add("player-name");
        container.appendChild(input);
    }

    const btn = document.createElement("button");
    btn.textContent = "Empezar juego";
    btn.onclick = startGame;
    container.appendChild(btn);
}

function startGame() {
    const inputs = document.querySelectorAll(".player-name");
    players = [];

    inputs.forEach(input => {
        players.push({
            name: input.value || "Jugador",
            score: 0
        });
    });

    document.getElementById("setup").classList.add("hidden");
    document.getElementById("game").classList.remove("hidden");

    updateTurn();
    updateRanking();
}

function addLetter() {
    const input = document.getElementById("letterInput");
    const text = input.value.toLowerCase().trim();
    input.value = "";

    if (text === "") return;

    let points = 0;
    let validLetters = 0;

    for (let char of text) {
        if (letterPoints[char]) {
            points += letterPoints[char];
            validLetters++;
        }
    }

    if (validLetters === 0) {
        alert("No se han introducido letras válidas");
        return;
    }

    // Sumar puntos al jugador actual
    players[currentPlayer].score += points;

    // Actualizar ranking
    updateRanking();

    // 👉 PASAR AUTOMÁTICAMENTE AL SIGUIENTE JUGADOR
    currentPlayer = (currentPlayer + 1) % players.length;
    updateTurn();
}



function nextTurn() {
    currentPlayer = (currentPlayer + 1) % players.length;
    updateTurn();
}

function updateTurn() {
    document.getElementById("turnText").textContent =
        `Turno de ${players[currentPlayer].name}`;
}

function updateRanking() {
    const ranking = document.getElementById("ranking");
    ranking.innerHTML = "";

    const ordered = [...players].sort((a, b) => b.score - a.score);

    ordered.forEach((player, index) => {
        const li = document.createElement("li");

        let position;
        let medal = "";

        if (index === 0) {
            position = "1º";
            medal = "🥇";
        } else if (index === 1) {
            position = "2º";
            medal = "🥈";
        } else if (index === 2) {
            position = "3º";
            medal = "🥉";
        } else {
            position = `${index + 1}º`;
            medal = "🏅";
        }

        li.textContent = `${medal} ${position} — ${player.name}: ${player.score} pts`;
        ranking.appendChild(li);
    });
}
