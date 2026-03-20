const steps = [
  {
    id: "dns",
    title: "DNS Lookup",
    desc: "Descobrir o IP do servidor a partir do domínio.",
    phaseLabel: "Resolvendo endereço do servidor",
    terminalIntro: [
      "[sistema] Cliente digitou: https://exemplo.com",
      "[cliente] Preciso descobrir o IP de exemplo.com (DNS lookup)...",
    ],
    choices: [
      {
        key: "A",
        label: "Perguntar ao servidor HTTPS o código de status",
        correct: false,
        feedback: "Calma, você ainda nem sabe o endereço IP do servidor.",
      },
      {
        key: "B",
        label: "Consultar um servidor DNS para obter o IP",
        correct: true,
        feedback: "Perfeito! Primeiro resolvemos o domínio via DNS.",
      },
      {
        key: "C",
        label: "Gerar chave simétrica de sessão",
        correct: false,
        feedback: "A chave de sessão vem mais tarde, na negociação TLS.",
      },
    ],
    successLines: [
      "[cliente] DNS, qual é o IP de exemplo.com?",
      "[dns] exemplo.com -> 203.0.113.42",
      "[sistema] Endereço do servidor encontrado.",
    ],
  },
  {
    id: "tcp",
    title: "Conexão TCP",
    desc: "Abrir um canal confiável com o servidor.",
    phaseLabel: "Criando conexão TCP",
    terminalIntro: [
      "[sistema] IP do servidor: 203.0.113.42",
      "[cliente] Vou iniciar o handshake TCP (SYN, SYN-ACK, ACK).",
    ],
    choices: [
      {
        key: "A",
        label: "Enviar pacote SYN para o servidor",
        correct: true,
        feedback: "Isso! Primeiro passo do handshake TCP.",
      },
      {
        key: "B",
        label: "Enviar certificado digital do servidor",
        correct: false,
        feedback: "O certificado é enviado na fase TLS, não no TCP puro.",
      },
      {
        key: "C",
        label: "Enviar requisição HTTP GET /",
        correct: false,
        feedback:
          "Ainda não temos conexão segura nem TCP estabelecido corretamente.",
      },
    ],
    successLines: [
      "[cliente] SYN -> servidor",
      "[servidor] SYN-ACK -> cliente",
      "[cliente] ACK -> servidor",
      "[sistema] Conexão TCP estabelecida com sucesso.",
    ],
  },
  {
    id: "tls",
    title: "Handshake TLS",
    desc: "Negociar criptografia e verificar certificado.",
    phaseLabel: "Negociando TLS",
    terminalIntro: [
      "[sistema] Conexão TCP pronta. Iniciando handshake TLS...",
      "[cliente] ClientHello -> lista de cifras suportadas e número aleatório.",
    ],
    choices: [
      {
        key: "A",
        label: "Servidor envia certificado digital e chave pública",
        correct: true,
        feedback:
          "Exato! O servidor manda o certificado com a chave pública para o cliente validar.",
      },
      {
        key: "B",
        label: "Cliente envia dados sensíveis em texto puro",
        correct: false,
        feedback:
          "Nunca envie dados sensíveis antes de terminar o handshake TLS.",
      },
      {
        key: "C",
        label: "Cliente e servidor pulam o certificado para ficar mais rápido",
        correct: false,
        feedback:
          "Sem certificado não há autenticação do servidor. Isso não seria HTTPS.",
      },
    ],
    successLines: [
      "[servidor] ServerHello + certificado + chave pública -> cliente",
      "[cliente] Valida o certificado com a Autoridade Certificadora (CA).",
      "[cliente] Gera segredo de sessão e o envia criptografado com a chave pública.",
      "[sistema] Segredo de sessão compartilhado. Canal HTTPS criptografado.",
    ],
  },
  {
    id: "http",
    title: "Requisição HTTP",
    desc: "Enviar dados HTTP dentro do túnel seguro.",
    phaseLabel: "Troca de mensagens HTTP",
    terminalIntro: [
      "[sistema] Canal HTTPS pronto. Tudo agora é criptografado.",
      "[cliente] Vou enviar uma requisição segura para /.",
    ],
    choices: [
      {
        key: "A",
        label: "Enviar GET / com cabeçalhos e cookies",
        correct: true,
        feedback:
          "Certo! Essa é uma requisição HTTP normal, mas agora dentro do túnel TLS.",
      },
      {
        key: "B",
        label: "Enviar senha em texto puro sem TLS",
        correct: false,
        feedback: "Em HTTPS, tudo deve passar pelo túnel criptografado.",
      },
      {
        key: "C",
        label: "Derrubar a conexão TCP imediatamente",
        correct: false,
        feedback: "Você derrubaria a conexão antes de receber a resposta.",
      },
    ],
    successLines: [
      "[cliente] GET / HTTP/1.1 (criptografado)",
      "[servidor] HTTP/1.1 200 OK (criptografado)",
      "[servidor] Corpo HTML da página enviado com sucesso.",
    ],
  },
  {
    id: "codes",
    title: "Códigos de status",
    desc: "Decidir a melhor resposta HTTP para cada situação.",
    phaseLabel: "Interpretando respostas HTTP",
    terminalIntro: [
      "[sistema] Agora vamos treinar códigos de status HTTP.",
      "[servidor] Vou responder a diferentes situações. Escolha o melhor código.",
    ],
    quiz: true,
    questions: [
      {
        prompt: "Página encontrada e enviada com sucesso.",
        options: [
          { key: "A", label: "200 OK", correct: true },
          { key: "B", label: "404 Not Found", correct: false },
          { key: "C", label: "500 Internal Server Error", correct: false },
        ],
      },
      {
        prompt: "Recurso foi movido para outra URL permanentemente.",
        options: [
          { key: "A", label: "301 Moved Permanently", correct: true },
          { key: "B", label: "302 Found", correct: false },
          { key: "C", label: "204 No Content", correct: false },
        ],
      },
      {
        prompt: "Cliente pediu um recurso que não existe.",
        options: [
          { key: "A", label: "404 Not Found", correct: true },
          { key: "B", label: "401 Unauthorized", correct: false },
          { key: "C", label: "201 Created", correct: false },
        ],
      },
    ],
  },
  {
    id: "https-extra",
    title: "Conceitos HTTPS",
    desc: "Aprofundar em segurança, certificados e chaves.",
    phaseLabel: "Reforçando conceitos de HTTPS",
    terminalIntro: [
      "[sistema] Última fase! Agora vamos revisar conceitos importantes de HTTPS.",
      "[cliente] Quero garantir que entendi bem como HTTPS protege os dados.",
    ],
    quiz: true,
    questions: [
      {
        prompt: "Qual é a principal vantagem de usar HTTPS em vez de HTTP puro?",
        options: [
          {
            key: "A",
            label: "Criptografa os dados entre cliente e servidor",
            correct: true,
          },
          {
            key: "B",
            label: "Deixa o site mais colorido",
            correct: false,
          },
          {
            key: "C",
            label: "Garante que nunca haverá erros 404",
            correct: false,
          },
        ],
      },
      {
        prompt: "Qual porta é usada por padrão para HTTPS?",
        options: [
          { key: "A", label: "443", correct: true },
          { key: "B", label: "80", correct: false },
          { key: "C", label: "21", correct: false },
        ],
      },
      {
        prompt: "O que o certificado digital comprova para o cliente?",
        options: [
          {
            key: "A",
            label: "A identidade do servidor (para quem estou falando)",
            correct: true,
          },
          {
            key: "B",
            label: "A velocidade da internet do usuário",
            correct: false,
          },
          {
            key: "C",
            label: "Que a página nunca terá bugs de programação",
            correct: false,
          },
        ],
      },
      {
        prompt: "Como normalmente são usados os tipos de chave no HTTPS moderno?",
        options: [
          {
            key: "A",
            label:
              "Assimétrica para negociar, simétrica para criptografar os dados da sessão",
            correct: true,
          },
          {
            key: "B",
            label: "Só chave assimétrica o tempo todo",
            correct: false,
          },
          {
            key: "C",
            label: "Só chave simétrica o tempo todo, sem certificado",
            correct: false,
          },
        ],
      },
      {
        prompt:
          "Ao ver o cadeado no navegador, o que isso indica em relação à conexão?",
        options: [
          {
            key: "A",
            label:
              "Que a conexão está protegida por TLS e um certificado foi validado",
            correct: true,
          },
          {
            key: "B",
            label: "Que o site é 100% seguro contra qualquer ataque",
            correct: false,
          },
          {
            key: "C",
            label: "Que não há necessidade de atualizar o navegador",
            correct: false,
          },
        ],
      },
    ],
  },
];

let currentStepIndex = -1;
let score = 0;
let errors = 0;
let quizQuestionIndex = 0;

const MAX_ERRORS = 3;

const stepperEl = document.getElementById("stepper");
const terminalEl = document.getElementById("terminal");
const choicesEl = document.getElementById("choices");
const phaseLabelEl = document.getElementById("phaseLabel");
const scoreEl = document.getElementById("score");
const errorsEl = document.getElementById("errors");
const btnStart = document.getElementById("btnStart");
const btnReset = document.getElementById("btnReset");
const modal = document.getElementById("modal");
const modalTitle = document.getElementById("modalTitle");
const modalMessage = document.getElementById("modalMessage");
const modalButton = document.getElementById("modalButton");
const btnTheme = document.getElementById("btnTheme");
const themeLabel = document.getElementById("themeLabel");

function initStepper() {
  stepperEl.innerHTML = "";
  steps.forEach((step, index) => {
    const div = document.createElement("div");
    div.className = "step";
    div.dataset.index = index.toString();

    const indexEl = document.createElement("div");
    indexEl.className = "step-index";
    indexEl.textContent = (index + 1).toString();

    const bodyEl = document.createElement("div");
    bodyEl.className = "step-body";

    const titleEl = document.createElement("div");
    titleEl.className = "step-title";
    titleEl.textContent = step.title;

    const descEl = document.createElement("div");
    descEl.className = "step-desc";
    descEl.textContent = step.desc;

    bodyEl.appendChild(titleEl);
    bodyEl.appendChild(descEl);

    div.appendChild(indexEl);
    div.appendChild(bodyEl);

    stepperEl.appendChild(div);
  });
}

function resetGame() {
  currentStepIndex = -1;
  score = 0;
  errors = 0;
  quizQuestionIndex = 0;
  updateScoreAndErrors();
  phaseLabelEl.textContent = "-";
  terminalEl.innerHTML = "";
  choicesEl.innerHTML = "";
  modal.classList.add("hidden");
  btnStart.disabled = false;
  btnReset.disabled = true;

  document
    .querySelectorAll(".step")
    .forEach((s) => s.classList.remove("step--active", "step--done"));
}

function startGame() {
  btnStart.disabled = true;
  btnReset.disabled = false;
  score = 0;
  errors = 0;
  updateScoreAndErrors();
  terminalEl.innerHTML = "";
  choicesEl.innerHTML = "";
  goToNextStep();
}

function goToNextStep() {
  currentStepIndex++;

  if (currentStepIndex >= steps.length) {
    endGame(true);
    return;
  }

  const step = steps[currentStepIndex];
  updateStepperVisuals();
  phaseLabelEl.textContent = step.phaseLabel;

  appendTerminalLines(step.terminalIntro, "system");

  if (step.quiz) {
    quizQuestionIndex = 0;
    renderQuizQuestion();
  } else {
    renderChoices(step.choices);
  }
}

function updateStepperVisuals() {
  document.querySelectorAll(".step").forEach((el) => {
    const index = Number(el.dataset.index);
    el.classList.remove("step--active", "step--done");

    if (index < currentStepIndex) {
      el.classList.add("step--done");
    } else if (index === currentStepIndex) {
      el.classList.add("step--active");
    }
  });
}

function appendTerminalLines(lines, type = "system") {
  lines.forEach((line) => {
    const div = document.createElement("div");
    div.classList.add("terminal-line");

    if (type === "client") div.classList.add("terminal-line--client");
    else if (type === "server") div.classList.add("terminal-line--server");
    else if (type === "error") div.classList.add("terminal-line--error");
    else div.classList.add("terminal-line--system");

    div.textContent = line;
    terminalEl.appendChild(div);
  });

  terminalEl.scrollTop = terminalEl.scrollHeight;
}

function updateScoreAndErrors() {
  scoreEl.textContent = score.toString();
  errorsEl.textContent = errors.toString();
}

function renderChoices(choices) {
  choicesEl.innerHTML = "";

  choices.forEach((choice) => {
    const btn = document.createElement("button");
    btn.className = "choice";

    const keyEl = document.createElement("div");
    keyEl.className = "choice-key";
    keyEl.textContent = choice.key;

    const labelEl = document.createElement("div");
    labelEl.className = "choice-label";
    labelEl.textContent = choice.label;

    btn.appendChild(keyEl);
    btn.appendChild(labelEl);

    btn.addEventListener("click", () => handleChoice(choice, btn));

    choicesEl.appendChild(btn);
  });
}

function handleChoice(choice, btnEl) {
  disableChoices();

  if (choice.correct) {
    score += 10;
    btnEl.classList.add("choice--correct");
    updateScoreAndErrors();

    const step = steps[currentStepIndex];
    appendTerminalLines(
      step.successLines || ["[sistema] Ação correta executada."],
      "system"
    );

    setTimeout(() => {
      goToNextStep();
    }, 950);
  } else {
    errors += 1;
    btnEl.classList.add("choice--wrong");
    updateScoreAndErrors();
    appendTerminalLines(["[erro] " + (choice.feedback || "Ação incorreta.")], "error");

    if (errors >= MAX_ERRORS) {
      setTimeout(() => endGame(false), 900);
    } else {
      setTimeout(() => {
        enableChoices();
      }, 650);
    }
  }
}

function disableChoices() {
  document.querySelectorAll(".choice").forEach((el) => {
    el.disabled = true;
  });
}

function enableChoices() {
  document.querySelectorAll(".choice").forEach((el) => {
    el.disabled = false;
    el.classList.remove("choice--wrong", "choice--correct");
  });
}

function renderQuizQuestion() {
  const step = steps[currentStepIndex];
  const question = step.questions[quizQuestionIndex];

  if (!question) {
    goToNextStep();
    return;
  }

  appendTerminalLines(["[servidor] " + question.prompt], "server");
  renderChoices(
    question.options.map((opt) => ({
      ...opt,
      feedback: opt.correct
        ? "Ótimo! Esse é o código mais adequado para a situação."
        : "Esse código não é o mais adequado. Pense no significado da família de códigos.",
    }))
  );
}

function handleQuizChoice(choice, btnEl) {
  disableChoices();

  if (choice.correct) {
    score += 5;
    btnEl.classList.add("choice--correct");
    updateScoreAndErrors();
    appendTerminalLines(
      ["[sistema] " + (choice.feedback || "Resposta correta.")],
      "system"
    );

    quizQuestionIndex++;

    setTimeout(() => {
      enableChoices();
      renderQuizQuestion();
    }, 900);
  } else {
    errors += 1;
    btnEl.classList.add("choice--wrong");
    updateScoreAndErrors();
    appendTerminalLines(["[erro] " + choice.feedback], "error");

    if (errors >= MAX_ERRORS) {
      setTimeout(() => endGame(false), 900);
    } else {
      setTimeout(() => {
        enableChoices();
      }, 650);
    }
  }
}

// Monkey patch: quando estivermos na fase quiz, usar handleQuizChoice
const originalRenderChoices = renderChoices;
function renderChoicesWrapped(choices) {
  const step = steps[currentStepIndex];

  choicesEl.innerHTML = "";

  // embaralha as opções e redistribui as letras A, B, C...
  const keyLabels = ["A", "B", "C", "D", "E"];
  const shuffled = [...choices].sort(() => Math.random() - 0.5);

  shuffled.forEach((choice, index) => {
    const btn = document.createElement("button");
    btn.className = "choice";

    const keyEl = document.createElement("div");
    keyEl.className = "choice-key";
    keyEl.textContent = keyLabels[index] || "?";

    const labelEl = document.createElement("div");
    labelEl.className = "choice-label";
    labelEl.textContent = choice.label;

    btn.appendChild(keyEl);
    btn.appendChild(labelEl);

    btn.addEventListener("click", () => {
      if (step.quiz) {
        handleQuizChoice(choice, btn);
      } else {
        handleChoice(choice, btn);
      }
    });

    choicesEl.appendChild(btn);
  });
}

// Sobrescreve a função padrão com a versão que entende quiz
// (assim evitamos duplicar muita lógica)
renderChoices = renderChoicesWrapped;

function endGame(victory) {
  btnStart.disabled = false;
  btnReset.disabled = false;

  if (victory) {
    appendTerminalLines(
      [
        "[sistema] Fluxo HTTPS completo com sucesso!",
        "[sistema] Você dominou a comunicação segura entre cliente e servidor.",
      ],
      "system"
    );
    modalTitle.textContent = "Parabéns! 🎉";
    modalMessage.textContent =
      "Você completou todo o fluxo de comunicação HTTPS e treinou códigos de status HTTP. Pontuação final: " +
      score +
      " pontos.";
  } else {
    appendTerminalLines(
      [
        "[sistema] Conexão interrompida devido a muitos erros.",
        "[sistema] Revise os passos e tente novamente.",
      ],
      "error"
    );
    modalTitle.textContent = "Conexão falhou";
    modalMessage.textContent =
      "Você atingiu o limite de erros. Não se preocupe, HTTPS é cheio de detalhes. Clique para tentar de novo!";
  }

  modal.classList.remove("hidden");
}

btnStart.addEventListener("click", startGame);
btnReset.addEventListener("click", resetGame);
modalButton.addEventListener("click", () => {
  modal.classList.add("hidden");
  resetGame();
  startGame();
});

initStepper();
resetGame();

// Controle de tema (Pixel / Sketch)
function setTheme(theme) {
  document.body.dataset.theme = theme;
  themeLabel.textContent = theme === "sketch" ? "Sketch" : "Pixel";
}

setTheme("pixel");

btnTheme.addEventListener("click", () => {
  const current = document.body.dataset.theme === "sketch" ? "sketch" : "pixel";
  const next = current === "pixel" ? "sketch" : "pixel";
  setTheme(next);
});

