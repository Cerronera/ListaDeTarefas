var tarefaList = []; //Comando que cria uma variável patientList e a inicializa como um array vazio. Essa variável é usada para armazenar a lista de pacientes cadastrados.
var count = 1;

function addTarefa(name, prazo) {
  var newTarefa = { id: count++, name: name, prazo: prazo }; //cria um novo objetivo de paciente (newTarefa), com as propriedades id, name e prazo
  tarefaList.push(newTarefa); //comando que adiciona o novo paciente ao final da lista de pacientes
  localStorage.setItem('tarefaList', JSON.stringify(tarefaList)); //o JSON.stringfy converte o objeto JavaScript em uma string JSON
  renderTarefaList();
}

// Função para excluir um paciente
function deleteTarefa(tarefaId) {
  var updatedTarefaList = tarefaList.filter(function (tarefa) {
    return tarefa.id !== tarefaId; //retorna todos os elementos que não sejam no ID selecionado
  });

  if (updatedTarefaList.length < tarefaList.length) { //verifica se a lista atualizada é diferente da lista original
    tarefaList = updatedTarefaList;
    localStorage.setItem('tarefaList', JSON.stringify(tarefaList)); 
    renderTarefaList();
  } else {
    alert('Tarefa não encontrada.');
  }
}

// Função para recuperar a lista de pacientes do localStorage
function getTarefaList() {
  var storedList = JSON.parse(localStorage.getItem('tarefaList')); //converte a string JSON para objeto JavaScript
  tarefaList = storedList || []; //se storedList for um valor válido (não seja nulo ou indefinido). é atribuido a tarefaList. Caso contrário, tarefaList recebe um array vazio
}

// Função para renderizar a lista de pacientes no HTML
function renderTarefaList() {
  var tarefaListElement = document.getElementById('tarefaList');
  tarefaListElement.innerHTML = ''; //limpa o conteúdo HTML do elemento tarefaListElement

  tarefaList.forEach(function (tarefa) {
    var listItem = document.createElement('li');
    //renderiza a lista de pacientes. Itera sobre cada paciente na lista encontrada e cria um <li> para cada paciente
    listItem.innerHTML = '<span class="tarefa-name">' + tarefa.name + '</span> (Prazo: ' + tarefa.prazo + ') <button class="delete-button" onclick="deleteTarefa(' + tarefa.id + ')">Excluir</button>';
    tarefaListElement.appendChild(listItem);
  });
}

// Recuperar a lista de pacientes do localStorage
getTarefaList();

// Renderizar a lista de pacientes no HTML
renderTarefaList();

// Event listener para o formulário de cadastro de pacientes
document.getElementById('tarefaForm').addEventListener('submit', function (event) {
  event.preventDefault();
  var nameInput = document.getElementById('nameInput');
  var prazoInput = document.getElementById('prazoInput');
  addTarefa(nameInput.value, getPrazo(prazoInput.value));
  nameInput.value = '';
  prazoInput.value = '';
});

function getData() {
  const dataAtual = new Date();
  const dia = dataAtual.getDate(); // Dia do mês (1-31)
  const mes = dataAtual.getMonth() + 1; // Mês (0-11, janeiro é 0) + 1 para converter para o formato de 1 a 12
  const ano = dataAtual.getFullYear();
  return `${dia}/${mes}/${ano}`; // Retornar a data formatada corretamente
}

function getPrazo(prazoInput) {
  const dataAtual = new Date();
  dataAtual.setDate(dataAtual.getDate() + parseInt(prazoInput)); // Adiciona os dias ao prazoInput convertendo para número inteiro
  const dia = dataAtual.getDate(); // Dia do mês (1-31)
  const mes = dataAtual.getMonth() + 1; // Mês (0-11, janeiro é 0) + 1 para converter para o formato de 1 a 12
  const ano = dataAtual.getFullYear();
  return `${dia}/${mes}/${ano}`; // Retornar a data formatada corretamente
}


