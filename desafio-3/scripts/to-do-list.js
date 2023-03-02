const addTask = () => {
  // Obtém o valor do input
  const taskInput = document.getElementById("taskInput");
  const taskName = taskInput.value;
  const spanError = document.querySelector(".spanError");

  if (taskName) {
    // Limpa qualquer mensagem de erro no span
    spanError.textContent = "";

    // Cria o elemento li
    const taskList = document.getElementById("taskList");
    const taskElement = document.createElement("li");

    // Adiciona o nome da tarefa ao elemento li
    const taskText = document.createElement("p");
    taskText.textContent = taskName;
    taskElement.appendChild(taskText);

    //cria uma div para os botões da li
    const taskbuttons = document.createElement("div");
    taskbuttons.className = "taskButtons";
    taskElement.appendChild(taskbuttons);

    // Adiciona um botão de edição
    createEditButton(taskElement, taskText);

    // Cria o botão de excluir
    const deleteButton = document.createElement("button");
    deleteButton.innerHTML = "Excluir";
    deleteButton.className = "deleteTask";
    deleteButton.onclick = () => {
      taskElement.parentNode.removeChild(taskElement);
    };
    taskElement.querySelector(".taskButtons").appendChild(deleteButton);

    // Adiciona o elemento li à lista de tarefas
    taskList.appendChild(taskElement);

    // Limpa o valor do input
    taskInput.value = "";
  } else {
    // Adiciona uma mensagem de erro no span
    spanError.textContent = "Deve ser inserido algum valor*";
  }
};

// Define a função para editar uma tarefa
const editTask = (taskElement, taskText, editButton) => {
  //Remove o botão de editar
  editButton.style.display = "none";

  // Cria um campo de texto para a edição com redmensionamento automatico
  const editTextarea = document.createElement("textarea");
  editTextarea.type = "text";
  editTextarea.value = taskText.textContent;
  editTextarea.className = "textareaEdit";

  editTextarea.addEventListener("input", () => {
    editTextarea.style.height = "auto";
    editTextarea.style.height = `${editTextarea.scrollHeight}px`;
  });

  // Substitui o texto da tarefa pelo campo de edição
  taskElement.replaceChild(editTextarea, taskText);

  //adiciona o tamanho inicial do campo de edição
  editTextarea.style.height = `${editTextarea.scrollHeight}px`;

  // Cria um botão de confirmação da edição
  const confirmButton = document.createElement("button");
  confirmButton.innerHTML = "Confirmar";
  confirmButton.className = "confirmButton";
  confirmButton.addEventListener("click", () => {
    // Substitui o campo de edição pelo novo texto da tarefa
    taskText.textContent = editTextarea.value;

    // Remove o botão de confirmação
    taskElement.querySelector(".taskButtons").removeChild(confirmButton);

    // Substitui o campo de edição pelo texto da tarefa atualizado
    taskElement.replaceChild(taskText, editTextarea);

    //adiciona o botão de edição novamente
    editButton.style.display = "block";
  });
  taskElement.querySelector(".taskButtons").appendChild(confirmButton);
};

// Define a função para criar um botão de edição em uma tarefa
const createEditButton = (taskElement, taskText) => {
  const editButton = document.createElement("button");
  editButton.innerHTML = "Editar";
  editButton.className = "editButton";
  editButton.addEventListener("click", () => {
    editTask(taskElement, taskText, editButton);
  });
  taskElement.querySelector(".taskButtons").appendChild(editButton);
};
