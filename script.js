// Selecionar elementos do DOM
const taskInput = document.getElementById('new-task');
const addTaskBtn = document.getElementById('add-task-btn');
const taskList = document.getElementById('task-list');

// Função para adicionar tarefas
function addTask() {
    const taskText = taskInput.value.trim();

    // Verificar se o campo está vazio
    if (!taskText) {
        return;
    }

    const li = document.createElement('li');
    li.textContent = taskText;

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Excluir';
    deleteBtn.classList.add('delete-btn');

    deleteBtn.addEventListener('click', () => {
        li.remove();
        saveTasks();
    });

    li.addEventListener('click', () => {
        li.classList.toggle('completed');
        saveTasks();
    });

    li.appendChild(deleteBtn);
    taskList.appendChild(li);

    // Limpar o campo de entrada
    taskInput.value = "";

    // Atualizar o localStorage
    saveTasks();
}

// Adicionar evento de clique ao botão
addTaskBtn.addEventListener('click', addTask);

// Também permite adicionar a tarefa pressionando Enter no teclado
taskInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        addTask();
    }
});

// Salvar tarefas no localStorage
function saveTasks() {
    const tasks = [];
    document.querySelectorAll('#task-list li').forEach((li) => {
        tasks.push({
            text: li.textContent.replace('Excluir', '').trim(),
            completed: li.classList.contains('completed')
        });
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Carregar tarefas do localStorage
function loadTasks() {
    const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    savedTasks.forEach(task => {
        const li = document.createElement('li');
        li.textContent = task.text;

        if (task.completed) {
            li.classList.add('completed');
        }

        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Excluir';
        deleteBtn.classList.add('delete-btn');
        deleteBtn.addEventListener('click', () => li.remove());

        li.addEventListener('click', () => {
            li.classList.toggle('completed');
            saveTasks();
        });

        li.appendChild(deleteBtn);
        taskList.appendChild(li);
    });
}

// Chamar a função ao carregar a página
loadTasks();

// Função para buscar a imagem com autor
async function fetchImageWithCredits() {
    const response = await fetch('https://picsum.photos/1920/1080');
    const imageUrl = response.url;
    
    const id = response.headers.get('picsum-id'); // Extrair o ID da imagem se disponível
    const authorResponse = await fetch(`https://picsum.photos/id/${id}/info`); // Buscar informações sobre a imagem
    
    if (authorResponse.ok) {
        const authorData = await authorResponse.json();
        return { imageUrl, authorData }; // Retornar a URL da imagem e os dados do autor
    }
    
    return { imageUrl, authorData: null }; // Retornar sem informações de autor caso não esteja disponível
}

// Frases e citações
const quotes = [
    {text: "A vida sem luta é um mar morto no centro do organismo universal.", author: "Machado de Assis"},
    {text: "Não se pode ir longe sem se levantar a cada vez que se cai.", author: "Machado de Assis"},
    {text: "Cada qual sabe amar a seu modo; o modo, pouco importa; o essencial é que saiba amar.", author: "Machado de Assis"},
    {text: "Há mais coisas entre o céu e a terra do que sonha a nossa vã filosofia.", author: "Machado de Assis"},
    {text: "O tempo é o melhor autor; sempre encontra um final perfeito.", author: "Machado de Assis"},
    {text: "A alma humana é uma lâmpada que se apaga e acende ao sabor dos ventos.", author: "Machado de Assis"},
    {text: "O destino é o acaso de muitos encontros.", author: "Guimarães Rosa"},
    {text: "Viver é muito perigoso. Querer o bem com demais força, de incerto jeito, pode já estar sendo se querendo o mal, por principiar.", author: "Guimarães Rosa"},
    {text: "Felicidade se acha é em horinhas de descuido.", author: "Guimarães Rosa"},
    {text: "O correr da vida embrulha tudo. A vida é assim: esquenta e esfria, aperta e daí afrouxa, sossega e depois desinquieta.", author: "Guimarães Rosa"},
    {text: "O coração tem razões que a própria razão desconhece.", author: "Clarice Lispector"},
    {text: "Liberdade é pouco. O que eu desejo ainda não tem nome.", author: "Clarice Lispector"},
    {text: "A palavra é o meu domínio sobre o mundo.", author: "Clarice Lispector"},
    {text: "Renda-se, como eu me rendi. Mergulhe no que você não conhece como eu mergulhei.", author: "Clarice Lispector"},
    {text: "O que me tranquiliza é que tudo o que existe, existe com uma precisão absoluta.", author: "Clarice Lispector"},
    {text: "A vida é breve, mas cabe nela muito mais do que somos capazes de viver.", author: "Carlos Drummond de Andrade"},
    {text: "Ser feliz sem motivo é a mais autêntica forma de felicidade.", author: "Carlos Drummond de Andrade"},
    {text: "No meio do caminho tinha uma pedra, tinha uma pedra no meio do caminho.", author: "Carlos Drummond de Andrade"},
    {text: "A dor é inevitável, o sofrimento é opcional.", author: "Carlos Drummond de Andrade"},
    {text: "A cada dia que vivo, mais me convenço de que o desperdício da vida está no amor que não damos.", author: "Carlos Drummond de Andrade"}
];

let currentQuoteIndex = 0;

function getQuote() {
    currentQuoteIndex = (currentQuoteIndex + 1) % quotes.length;
    return quotes[currentQuoteIndex];
}

// Selecionar os elementos HTML
const backgroundElement = document.body;
const quoteElement = document.getElementById('quote');
const authorElement = document.getElementById('author');
const creditsElement = document.getElementById('credits'); // Novo elemento para os créditos da imagem

// Função para atualizar a imagem de fundo e a citação
async function updateBackgroundAndQuote() {
    const { imageUrl, authorData } = await fetchImageWithCredits(); // Buscar a imagem e os dados do autor
    const quote = getQuote();

    if (imageUrl) {
        backgroundElement.style.backgroundImage = `url(${imageUrl})`;
    }
    
    quoteElement.innerText = `"${quote.text}"`;
    authorElement.innerText = `- ${quote.author}`;

    // Exibir os créditos da imagem se disponíveis
    if (authorData) {
        creditsElement.innerText = `Photo by ${authorData.author} on Unsplash`;
    } else {
        creditsElement.innerText = '';
    }

    // Atualiza a cada 30 segundos
    setTimeout(updateBackgroundAndQuote, 30000);
}

// Inicializa a primeira atualização
updateBackgroundAndQuote();
