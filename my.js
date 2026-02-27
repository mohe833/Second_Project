let user = "";

let score = 0;

let currentIndex = 0;

const wortliste = {
 
    "Apotheke": "die",
    "Arzt": "der",
    "Blut": "-",
    "Fieber": "-",
    "Grippe": "die",
    "Husten": "-",
    "Kopfweh": "-",
    "Krankheit": "die",
    "Haustier": "das",
    "Medikament": "das",
    "Operation": "die",
    "Kamel": "das",
    "Pflaster": "das",
    "Salbe": "die",
    "Schmerz": "der",
    "Spital": "das",
    "die Spritze": "die",
    "Tablette": "die",
    "Verletzung": "die",
    "Ärztin": "die",
    "Bauchweh": "das",
    "Fieberthermometer": "das",
    "Krankenpfleger": "der",
    "Krankenschwester": "die",
    "Krankenwagen": "der",
    "Schnupfen": "der",
    "Verband": "der",
    "Wunde": "die",
    "Zahnarzt": "der",
    "Zahnärztin": "die"


};

const words = Object.keys(wortliste);

function startQuiz() {

    user = document.getElementById("username").value.trim();

    if (user === "") {

        alert("Bitte gib deinen Namen ein!");

        return;

    }

    document.getElementById("start-section").style.display = "none";

    document.getElementById("quiz-section").style.display = "block";

    document.getElementById("score").innerText = `${user}, dein Punktestand: 0 von ${words.length}`;

    showQuestion();

}

function showQuestion() {

    if (currentIndex < words.length) {

        const currentWord = words[currentIndex];

        document.getElementById("question").innerText = `Was ist der Artikel von "${currentWord}"?`;

        document.getElementById("answer").value = "";

        document.getElementById("feedback").innerText = "";

    } else {

        endQuiz();

    }

}

function checkAnswer() {

    const currentWord = words[currentIndex];

    const correctAnswer = wortliste[currentWord];

    const userAnswer = document.getElementById("answer").value.trim();

    if (userAnswer.toLowerCase() === correctAnswer.toLowerCase()) {

        score++;

        document.getElementById("feedback").innerText = `✅ Richtig, ${user}!`;

        document.getElementById("feedback").style.color = "green";
        

    } else {
        document.getElementById("feedback").innerText = `❌ Falsch! Die richtige Antwort ist "${correctAnswer}".`;
       document.getElementById("feedback").style.color = "red";
   }
   document.getElementById("score").innerText = `${user}, dein Punktestand: ${score} von ${words.length}`;
   currentIndex++;
   setTimeout(showQuestion, 1500); // waits 1.5 seconds before next question
}
function endQuiz() {
   document.getElementById("quiz-section").innerHTML = `
<h2>Quiz beendet!</h2>
<p>${user}, du hast ${score} von ${words.length} richtig.</p>
<p>Vielen Dank fürs Spielen! 👏</p>
   `;
}
document.addEventListener("keydown", function(event) {
 if (event.key === "Enter") {
   document.getElementById("confirm-btn").click();
 }
});
