let user = "";
let score = 0;
let currentIndex = 0;
let wrongAnswers = [];

const wortliste = [
  { word: "At-Zeichen", image: "Images/at_zeichen.jpg" },
  { word: "der Laptop", image: "Images/laptop.jpg" },
  { word: "der Bildschirm / der Monitor", Image: "Images/bildschirm_monitor.jpg" },
  { word: "die Tastatur", image: "Images/tastatur.jpg" },
  { word: "der Akku ist leer", image: "Images/akku_leer.jpg" },
  { word: "der Computer (PC)", image: "Images/computer.jpg" },
  { word: "Teams", image: "Images/teams.jpg" },
  { word: "der Akku ist voll", image: "Images/akku_voll.jpg" },
  { word: "aufladen", image: "Images/aufladen.jpg" },
  { word: "das Word", image: "Images/word.jpg" },
  { word: "das Internet", image: "Images/internet_symbol.jpg" },
  { word: "die Maus", image: "Images/maus.jpg" },
  { word: "die linke Maustaste", image: "Images/linke_maustaste.jpg" },
  { word: "die rechte Maustaste", image: "Images/rechte_maustaste.jpg" },
  { word: "der USB-Stick", image: "Images/usb_stick.jpg" },
  { word: "das Ladegerät", image: "Images/ladegerät.jpg" },
  { word: "der Drucker", image: "Images/drucker.jpg" },
  { word: "die Taskleiste", image: "Images/taskleiste.jpg" }
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