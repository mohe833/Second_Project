let user = "";
let score = 0;
let currentIndex = 0;
let wrongAnswers = [];

// Added a custom "question" key to each item
const wortliste = [
  { word: "At-Zeichen", image: "Images/at_zeichen.jpg", question: "Wie heisst dieses Zeichen?" },
  { word: "der Monitor, Monitore", image: "Images/monitor.jpg", question: "Wie heisst dieses Gerät?" },
  { word: "der Laptop, Laptops", image: "Images/laptop.jpg", question: "Wie heisst dieses Gerät?" },
  { word: "der Bildschirm, Bildschirme", image: "Images/bildschirm_monitor.jpg", question: "Wie heisst dieses Gerät?" },
  { word: "die Tastatur, Tastaturen", image: "Images/tastatur.jpg", question: "Wie heisst dieses Gerät?" },
  { word: "der Akku ist leer", image: "Images/akku_leer.jpg", question: "Wie ist der Status?" },
  { word: "der Computer, Computer", image: "Images/computer.jpg", question: "Wie heisst dieses Gerät?" },
  { word: "Teams", image: "Images/teams.jpg", question: "Wie heisst diese Software?" },
  { word: "der Akku ist voll", image: "Images/akku_voll.jpg", question: "Wie ist der Status?" },
  { word: "aufladen", image: "Images/aufladen.jpg", question: "Welches Verb passt dazu?" },
  { word: "das Word", image: "Images/word.jpg", question: "Wie heisst dieses Programm?" },
  { word: "das Internet", image: "Images/internet_symbol.jpg", question: "Was stellt dieses Symbol dar?" },
  { word: "die Maus, Mäuse", image: "Images/maus.jpg", question: "Wie heisst dieses Gerät?" },
  { word: "die linke Maustaste, die linken Maustasten", image: "Images/linke_maustaste.jpg", question: "Wie heisst dieser Teil der Maus?" },
  { word: "die rechte Maustaste, die rechten Maustasten", image: "Images/rechte_maustaste.jpg", question: "Wie heisst dieser Teil der Maus?" },
  { word: "der USB-Stick, USB-Sticks", image: "Images/usb_stick.jpg", question: "Wie heisst dieses Speichermedium?" },
  { word: "das Ladegerät, Ladegeräte", image: "Images/ladegerät.jpg", question: "Wie heisst dieses Gerät?" },
  { word: "der Drucker, Drucker", image: "Images/drucker.jpg", question: "Wie heisst dieses Gerät?" },
  { word: "der Akku, Akkus", image: "Images/akku.jpg", question: "Wie heisst dieses Gerät?" },
  { word: "das Symbol, Symbole", image: "Images/symbol.jpg", question: "Wie sagt man das?" },
  { word: "minimieren", image: "Images/minimieren.jpg", question: "Wie sagt man das?" },
  { word: "maximieren", image: "Images/max.jpg", question: "Wie sagt man das?" },
  { word: "der Explorer", image: "Images/explorer.jpg", question: "Wie heisst das?" },
  { word: "das Dokument, Dokumente", image: "Images/dokument.jpg", question: "Wie sagt man das?" },
  { word: "die Taskleiste, Taskleisten", image: "Images/taskleiste.jpg", question: "Wie heisst dieser Bereich auf dem Bildschirm?" }
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

  // Updated to use the custom question property from the current word object
  // Uses a fallback sentence if question is not provided
  document.getElementById("question").innerText = current.question || "Wie heisst dieses Objekt?";

  document.getElementById("answer").value = "";
  document.getElementById("feedback").innerText = "";
  document.getElementById("score").innerText = `${user}: ${score} Punkte`;

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
  setTimeout(showQuestion, 2000);
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
    if (document.getElementById("start-section").style.display !== "none") {
      startQuiz();
    } else {
      const confirmBtn = document.getElementById("confirm-btn");
      if (confirmBtn) {
        confirmBtn.click();
      }
    }
  }
});