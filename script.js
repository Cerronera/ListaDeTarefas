let myNodelist = document.getElementsByTagName('li');
for (let i = 0; i < myNodelist.length; i++) {
  let span = document.createElement('span');
  let txt = document.createTextNode('\u00D7'); //caracter x
  span.className = 'close';
  span.appendChild(txt);
  myNodelist[i].appendChild(span);
}
let close = document.getElementsByClassName('close');
for (let i = 0; i < close.length; i++) {
  close[i].onclick = function () {
    let div = this.parentElement;
    div.style.display = 'none';
  };
}

function deleteAll() {
  let itens = document.getElementsByTagName('li');
  for (let i = 0; i < itens.length; i++) {
    itens[i].style.display = 'none';
  }
}

let list = document.querySelector('ul');
list.addEventListener(
  'click',
  function (ev) {
    if (ev.target.tagName === 'LI') {
      ev.target.classList.toggle('checked');
    }
  },
  false,
);

function getData() {
  const dataAtual = new Date();
  const dia = dataAtual.getDate(); // Dia do mês (1-31)
  const mes = dataAtual.getMonth(); // Mês (0-11, janeiro é 0)
  const ano = dataAtual.getFullYear();
  return `${dia}/${mes + 1}/${ano} `;
}

function getPrazo(prazoInput) {
  const dataAtual = new Date();
  dataAtual.setDate(dataAtual.getDate() + prazoInput); // Adiciona os dias ao prazo
  const dia = dataAtual.getDate(); // Dia do mês (1-31)
  const mes = dataAtual.getMonth(); // Mês (0-11, janeiro é 0)
  const ano = dataAtual.getFullYear();
  return ` Prazo: ${dia}/${mes + 1}/${ano} `;
}

function addElemento() {
  let li = document.createElement('li');
  let inputValue = document.getElementById('tarefa').value.toUpperCase();
  let prazoInput = parseInt(document.getElementById('prazo').value);
  let prazoValor = getPrazo(prazoInput);
  let t = document.createTextNode(inputValue);
  let dataFormatada = getData();

  if (inputValue === '') {
    alert('Você precisa descrever a tarefa');
    return;
  }

  let dataSpan = document.createElement('span');
  let dataText = document.createTextNode(dataFormatada);
  dataSpan.appendChild(dataText);
  dataSpan.className = 'data';

  let prazoSpan = document.createElement('span');
  let prazoText = document.createTextNode(prazoValor);
  prazoSpan.appendChild(prazoText);
  prazoSpan.className = 'prazo';

  let closeSpan = document.createElement('span');
  let closeText = document.createTextNode('\u00D7');
  closeSpan.className = 'close';
  closeSpan.appendChild(closeText);

  li.appendChild(dataSpan); // Primeiro adiciona a data
  li.appendChild(t); // Depois adiciona o texto da tarefa
  li.appendChild(prazoSpan); // Depois adiciona o prazo
  li.appendChild(closeSpan); // Por fim, adiciona o botão de fechamento

  document.getElementById('itemLista').appendChild(li);
  document.getElementById('tarefa').value = '';
  document.getElementById('prazo').value = '';

  for (let i = 0; i < close.length; i++) {
    close[i].onclick = function () {
      let div = this.parentElement;
      div.style.display = 'none';
    };
  }
}
