// =====================================
// MENU MOBILE
// =====================================

const menuButton = document.getElementById("menuButton");
const navLinks = document.querySelector(".nav-links");

menuButton.addEventListener("click", () => {
    navLinks.classList.toggle("active");
});


document.querySelectorAll(".nav-links a").forEach(link => {

    link.addEventListener("click", () => {
        navLinks.classList.remove("active");
    });

});



// =====================================
// ANIMAÇÃO AO ROLAR
// =====================================

const revealElements = document.querySelectorAll(".reveal");


const observer = new IntersectionObserver(

    entries => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                entry.target.classList.add("active");

                observer.unobserve(entry.target);

            }

        });

    },

    {
        threshold: 0.12
    }

);


revealElements.forEach(element => {
    observer.observe(element);
});



// =====================================
// QUIZ
// =====================================

const questions = [

    {
        question:
            "Você recebe uma notícia impactante em um grupo de mensagens. Qual é a atitude mais responsável?",

        answers: [
            "Compartilhar imediatamente",
            "Verificar a fonte antes de compartilhar",
            "Enviar para vários grupos",
            "Acreditar porque veio de um conhecido"
        ],

        correct: 1
    },


    {
        question:
            "Qual atitude aumenta a segurança das suas contas digitais?",

        answers: [
            "Utilizar a mesma senha em todos os sites",
            "Compartilhar a senha com amigos",
            "Ativar autenticação em dois fatores",
            "Criar senhas muito simples"
        ],

        correct: 2
    },


    {
        question:
            "Qual situação pode ser considerada cyberbullying?",

        answers: [
            "Discordar educadamente de alguém",
            "Enviar uma mensagem de aniversário",
            "Publicar repetidamente ofensas contra uma pessoa",
            "Compartilhar um conteúdo educativo"
        ],

        correct: 2
    },


    {
        question:
            "Qual pode ser uma consequência do uso excessivo das redes sociais?",

        answers: [
            "Melhora garantida na concentração",
            "Dificuldade de concentração e sono",
            "Maior produtividade em todos os casos",
            "Nenhum impacto na rotina"
        ],

        correct: 1
    },


    {
        question:
            "Qual é uma forma responsável de utilizar inteligência artificial nos estudos?",

        answers: [
            "Copiar todas as respostas sem verificar",
            "Usar a IA para substituir completamente o aprendizado",
            "Utilizar como apoio e analisar as respostas criticamente",
            "Compartilhar informações pessoais sem necessidade"
        ],

        correct: 2
    },


    {
        question:
            "Por que devemos evitar clicar em links desconhecidos?",

        answers: [
            "Porque qualquer link é ilegal",
            "Porque podem direcionar para golpes ou páginas maliciosas",
            "Porque todos os links possuem vírus",
            "Porque a internet pode deixar de funcionar"
        ],

        correct: 1
    },


    {
        question:
            "Qual comportamento demonstra cidadania digital?",

        answers: [
            "Expor informações pessoais de outras pessoas",
            "Ofender quem possui opinião diferente",
            "Respeitar pessoas e proteger informações pessoais",
            "Compartilhar qualquer conteúdo recebido"
        ],

        correct: 2
    },


    {
        question:
            "O que significa desenvolver pensamento crítico no ambiente digital?",

        answers: [
            "Acreditar em tudo que possui muitas curtidas",
            "Analisar informações e consultar diferentes fontes",
            "Rejeitar qualquer conteúdo da internet",
            "Acreditar somente em conteúdos que confirmem sua opinião"
        ],

        correct: 1
    }

];



// =====================================
// ELEMENTOS
// =====================================

const questionElement =
    document.getElementById("question");

const answersElement =
    document.getElementById("answers");

const questionNumber =
    document.getElementById("questionNumber");

const scoreElement =
    document.getElementById("score");

const progressBar =
    document.getElementById("progressBar");

const nextButton =
    document.getElementById("nextButton");

const feedback =
    document.getElementById("feedback");

const quizCard =
    document.getElementById("quizCard");

const resultCard =
    document.getElementById("resultCard");

const resultNumber =
    document.getElementById("resultNumber");

const resultTitle =
    document.getElementById("resultTitle");

const resultText =
    document.getElementById("resultText");

const restartButton =
    document.getElementById("restartButton");



// =====================================
// VARIÁVEIS
// =====================================

let currentQuestion = 0;

let score = 0;

let answered = false;



// =====================================
// CARREGAR QUESTÃO
// =====================================

function loadQuestion() {

    answered = false;

    nextButton.disabled = true;

    feedback.textContent =
        "Selecione uma alternativa";


    const current =
        questions[currentQuestion];


    questionElement.textContent =
        current.question;


    questionNumber.textContent =
        `${String(currentQuestion + 1).padStart(2, "0")} / ${String(questions.length).padStart(2, "0")}`;


    scoreElement.textContent =
        score;


    progressBar.style.width =
        `${(currentQuestion / questions.length) * 100}%`;


    answersElement.innerHTML = "";


    const letters =
        ["A", "B", "C", "D"];


    current.answers.forEach((answer, index) => {

        const button =
            document.createElement("button");


        button.classList.add(
            "answer-button"
        );


        button.innerHTML = `

            <span class="answer-letter">
                ${letters[index]}
            </span>

            <span>
                ${answer}
            </span>

        `;


        button.addEventListener(
            "click",
            () => selectAnswer(button, index)
        );


        answersElement.appendChild(button);

    });

}



// =====================================
// SELECIONAR ALTERNATIVA
// =====================================

function selectAnswer(button, index) {

    if (answered) return;


    answered = true;


    const correctIndex =
        questions[currentQuestion].correct;


    const allButtons =
        document.querySelectorAll(
            ".answer-button"
        );


    allButtons.forEach(
        (answerButton, buttonIndex) => {

            answerButton.disabled = true;


            if (buttonIndex === correctIndex) {

                answerButton.classList.add(
                    "correct"
                );

            }

        }
    );


    if (index === correctIndex) {

        score++;

        scoreElement.textContent =
            score;


        feedback.textContent =
            "Resposta correta.";

    }

    else {

        button.classList.add(
            "wrong"
        );


        feedback.textContent =
            "Resposta incorreta. Veja a alternativa correta.";

    }


    nextButton.disabled = false;

}



// =====================================
// PRÓXIMA QUESTÃO
// =====================================

nextButton.addEventListener(
    "click",
    () => {

        currentQuestion++;


        if (
            currentQuestion <
            questions.length
        ) {

            loadQuestion();

        }

        else {

            showResult();

        }

    }
);



// =====================================
// RESULTADO
// =====================================

function showResult() {

    progressBar.style.width =
        "100%";


    quizCard.classList.add(
        "hidden"
    );


    resultCard.classList.remove(
        "hidden"
    );


    resultNumber.textContent =
        score;


    const percentage =
        (score / questions.length) * 100;


    if (percentage === 100) {

        resultTitle.textContent =
            "Excelente desempenho";

        resultText.textContent =
            "Você demonstrou domínio dos principais conceitos relacionados à cidadania e responsabilidade digital.";

    }

    else if (percentage >= 75) {

        resultTitle.textContent =
            "Ótimo resultado";

        resultText.textContent =
            "Você demonstra uma boa compreensão sobre segurança, ética e comportamento no ambiente digital.";

    }

    else if (percentage >= 50) {

        resultTitle.textContent =
            "Bom resultado";

        resultText.textContent =
            "Você já conhece importantes conceitos de cidadania digital, mas ainda existem pontos que podem ser aprofundados.";

    }

    else {

        resultTitle.textContent =
            "Continue aprendendo";

        resultText.textContent =
            "O ambiente digital apresenta diversos desafios. Aprender sobre segurança e responsabilidade é essencial para fazer escolhas melhores.";

    }

}



// =====================================
// REINICIAR
// =====================================

restartButton.addEventListener(
    "click",
    () => {

        currentQuestion = 0;

        score = 0;


        resultCard.classList.add(
            "hidden"
        );


        quizCard.classList.remove(
            "hidden"
        );


        loadQuestion();


        document
            .getElementById("quiz")
            .scrollIntoView({
                behavior: "smooth"
            });

    }
);



// =====================================
// INICIAR
// =====================================

loadQuestion();