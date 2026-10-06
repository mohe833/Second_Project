let user = "";
let score = 0;
let currentIndex = 0;
let wrongAnswers = [];

// Added a custom "question" key to each item
const wortliste = [
  { word: "der Gummihandschuh, Gummihandschuhe", image: "Images/gummi.jpg", question: "Wie heisst dieser Schutzgegenstand?" },
  { word: "der Sicherheitsschuh, Sicherheitsschuhe", image: "Images/sicherheitsschuhe.jpg", question: "Wie heisst dieser Schutzgegenstand?" },
  { word: "der Schutzhandschuh, Schutzhandschuhe", image: "Images/handschuhe.jpg", question: "Wie heisst dieser Schutzgegenstand?" },
  { word: "die Feinstaubfiltermaske, Feinstaubfiltermasken", image: "Images/maske.jpg", question: "Wie heisst dieser Schutzgegenstand?" },
  { word: "der Gehörschutz, Gehörschutze", image: "Images/gehörschutz.jpg", question: "Wie heisst dieser Schutzgegenstand?" },
  { word: "der Gehörschutzstöpsel, Gehörschutzstöpsel", image: "Images/töpsel.jpg", question: "Wie heisst dieser Schutzgegenstand?" },
  { word: "die Schutzbrille, Schutzbrillen", image: "Images/brille.jpg", question: "Wie heisst dieser Schutzgegenstand?" },
  { word: "der Schutzhelm, Schutzhelme", image: "Images/helm.jpg", question: "Wie heisst dieser Schutzgegenstand?" },
  { word: "die Warnweste, Warnwesten", image: "Images/weste.jpg", question: "Wie heisst diese Kleidung?" },
  { word: "die Arbeitskleidung, Arbeitskleidungen", image: "Images/kleidung.jpg", question: "Wie heisst diese Kleidung?" },
  { word: "die Ausrüstung, Ausrüstungen", image: "Images/ausrüstung.jpg", question: "Wie heisst dieser Begriff?" },
  { word: "der Schutzanzug, Schutzanzüge", image: "Images/anzug.jpg", question: "Wie heisst diese Kleidung?" },
  { word: "der Knieschoner, Knieschoner", image: "Images/schoner.jpg", question: "Wie heisst dieser Schutzgegenstand?" },
  { word: "der Auffanggurt, Auffanggurte", image: "Images/gurt.jpg", question: "Wie heisst dieser Schutzgegenstand?" },
  { word: "der Schweisshandschuh, Schweisshandschuhe", image: "Images/schweisshandschuhe.jpg", question: "Wie heisst dieser Schutzgegenstand?" },
  { word: "der Gesichtsschutz, Gesichtsschutze", image: "Images/gesichtshutz.jpg", question: "Wie heisst dieser Schutzgegenstand?" },
  { word: "die Mütze, Mützen", image: "Images/mütze.jpg", question: "Wie heisst diese Kopfbedeckung?" },
  { word: "die Arbeitshose, Arbeitshosen", image: "Images/arbeitshose.jpg", question: "Wie heisst diese Kleidung?" },
  { word: "der Schweisshelm, Schweisshelme", image: "Images/schweisshelm.jpg", question: "Wie heisst dieser Schutzgegenstand?" },
  { word: "das Symbol persönliche Schutzausrüstung, Symbole persönliche Schutzausrüstung", image: "Images/persönliche symbole.jpg", question: "Was stellt dieses Symbol dar?" }
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
  setTimeout(showQuestion, 4000);
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