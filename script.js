//Adiciona uma escuta ao formulário para o evento de submit
document.getElementById('formulario').addEventListener('submit', function (event) {

  //Impede que o formulário recarregue
  event.preventDefault();
  
  //Atribui os dados dos campos e o endereço do google scrip a variáveis
  var formData = obterValoresFormulario();
  var url = 'https://script.google.com/macros/s/AKfycbzaLjBL9uu5ROahz5lENal-_OJMRkCNyt-OMbGLF83dPcqvRUmhTtqo9SoYNgV8flcp/exec';

  // Adiciona tela de carregamento
  exibeCarregamento();

  //Envia dados ao google script
  fetch(url, {
    method: 'POST',
    body: new URLSearchParams(formData),
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  }) //Tratamento de resposta para exibir notificação caso occorra sucesso
    .then(response => response.text())
    .then(data => {
      console.log(data);
      mostrarNotificacao('success', 'Formulário enviado com sucesso!');
    }) //Tratamento de resposta para exibir notificação caso occorra um erro
    .catch(error => {
      console.error('Erro:', error);
      mostrarNotificacao('error', 'Ocorreu um erro ao enviar o formulário. Por favor, tente novamente mais tarde.');
    })
    .finally(() => {
      ocultaCarregamento();
      resetaCamposFormulario();
    });
});

//Exibe a tela de carregamento
function exibeCarregamento() {
  document.getElementById('carregamentoSobreposicao').style.display = 'flex';
}

//Oculta a tela de carregamento
function ocultaCarregamento() {
  document.getElementById('carregamentoSobreposicao').style.display = 'none';
}

//Reseta para o valor padrão todos os campos do formulário
function resetaCamposFormulario() {
  document.getElementById('formulario').reset();
}

//Função que obtém os valores dos campos do formulário pelo Id
function obterValoresFormulario() {
  return {
    nome: document.getElementById('nome').value,
    email: document.getElementById('email').value,
    telefone: document.getElementById('telefone').value,
    empresa: document.getElementById('empresa').value,
    proposito: document.getElementById('proposito').value
  }; 
}

//Cria uma notificação com uma mensagem e um tipo (sucesso ou erro)
function mostrarNotificacao(type, message) {
  var notificationElement = document.createElement('div');
  notificationElement.textContent = message;
  notificationElement.className = 'notification ' + type;

  //Adiciona notificationElement como uma classe filha da notificacoes
  document.getElementById('notificacoes').appendChild(notificationElement);

  //Remove a notificação após 5 segundos
  setTimeout(function () {
    notificationElement.remove();
  }, 5000);
}


//Abre o menu quando o menu alternado é apertado
document.querySelector('.menu-alternado').addEventListener('click', function() {
  document.querySelector('.menu').classList.toggle('ativar');
});

//Fecha o menu quando o btn fechar é apertado
document.querySelector('.btn-fechar').addEventListener('click', function() {
  document.querySelector('.menu').classList.remove('ativar');
});

//Fecha o menu quando o um elemento com a classe escolha é apertado
document.querySelector('.escolha').addEventListener('click', function () {
  document.querySelector('.menu').classList.remove('ativar');
})

