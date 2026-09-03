let user = "";
let score = 0;
let currentIndex = 0;
let wrongAnswers = [];

const wortliste = [
  { word: "At-Zeichen", image: "images/at_zeichen.jpg" },
  { word: "der Laptop", image: "images/laptop.jpg" },
  { word: "der Bildschirm / der Monitor", image: "images/bildschirm_monitor.jpg" },
  { word: "die Tastatur", image: "images/tastatur.jpg" },
  { word: "der Akku ist leer", image: "images/akku_leer.jpg" },
  { word: "der Computer (PC)", image: "images/computer.jpg" },
  { word: "Teams", image: "images/teams.jpg" },
  { word: "der Akku ist voll", image: "images/akku_voll.jpg" },
  { word: "aufladen", image: "images/aufladen.jpg" },
  { word: "das Word", image: "images/word.jpg" },
  { word: "das Internet", image: "images/internet_symbol.jpg" },
  { word: "die Maus", image: "images/maus.jpg" },
  { word: "die linke Maustaste", image: "images/linke_maustaste.jpg" },
  { word: "die rechte Maustaste", image: "images/rechte_maustaste.jpg" },
  { word: "der USB-Stick", image: "images/usb_stick.jpg" },
  { word: "das Ladegerät", image: "images/ladegerät.jpg" },
  { word: "der Drucker", image: "images/drucker.jpg" },
  { word: "die Taskleiste", image: "images/taskleiste.jpg" }
];

wortliste.sort(() => Math.random() - 0.5);

function startQuiz() {
  user = document.getElementById("username").value.trim();

  if (user === "") {
    alert("Bitte gib deinen Namen ein!");
    return;
  }

  currentIndex = 0;
  score = 0;
  wrongAnswers = [];

  document.getElementById("start-section").style.display = "none";
  document.getElementById("quiz-section").style.display = "block";

  showQuestion();
}

function showQuestion() {
  if (currentIndex >= wortliste.length) {
    endQuiz();
    return;
  }

  const current = wortliste[currentIndex];

  document.getElementById("progress").innerText = `Frage ${currentIndex + 1} von ${wortliste.length}`;
  document.getElementById("word-image").src = current.image;
  document.getElementById("question").innerText = "Wie heisst dieses Objekt?";
  document.getElementById("answer").value = "";
  document.getElementById("feedback").innerText = "";
  document.getElementById("score").innerText = `${user}: ${score} Punkte`;

  // Focus the answer box automatically for fast typing
  document.getElementById("answer").focus();
}

function checkAnswer() {
  const current = wortliste[currentIndex];
  const userAnswer = document.getElementById("answer").value.trim().toLowerCase();

  if (userAnswer === current.word.toLowerCase()) {
    score++;
    document.getElementById("feedback").innerText = "✅ Richtig!";
    document.getElementById("feedback").style.color = "green";
  } else {
    wrongAnswers.push({
      word: current.word,
      image: current.image
    });

    document.getElementById("feedback").innerText = `❌ Falsch! Richtige Antwort: ${current.word}`;
    document.getElementById("feedback").style.color = "red";
  }

  currentIndex++;
  setTimeout(showQuestion, 1500);
}

function endQuiz() {
  let mistakes = "";

  if (wrongAnswers.length > 0) {
    mistakes = "<h3>❌ Fehler:</h3>";
    wrongAnswers.forEach(item => {
      mistakes += `
        <div style="margin:20px;">
          <img src="${item.image}" style="width:200px;height:150px;object-fit:contain;">
          <p><b>${item.word}</b></p>
        </div>
      `;
    });
  }

  document.getElementById("quiz-section").innerHTML = `
    <h2>🎉 Quiz beendet!</h2>
    <p>${user}, du hast ${score} von ${wortliste.length} richtig.</p>
    ${mistakes}
    <button onclick="location.reload()">🔄 Nochmal spielen</button>
  `;
}

// Global Enter Key Listener
document.addEventListener("keydown", function(event) {
  if (event.key === "Enter") {
    // If the start screen is visible, start the quiz
    if (document.getElementById("start-section").style.display !== "none") {
      startQuiz();
    } else {
      // Otherwise, submit the answer
      const confirmBtn = document.getElementById("confirm-btn");
      if (confirmBtn) {
        confirmBtn.click();
      }
    }
  }
});