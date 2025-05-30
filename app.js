   document.addEventListener('DOMContentLoaded', () => {
       // Seu código aqui
   
   

let vendas = []; // Certifique-se de que a variável vendas esteja declarada
let gastos = [];
let fiados = [];

// Formulário registro vendas e gastos
document.getElementById('form-registro').addEventListener('submit', function(event) {
    event.preventDefault();
    const descricao = document.getElementById('descricao').value.trim();
    const valor = parseFloat(document.getElementById('valor').value);
    const tipo = document.getElementById('tipo').value;

    if (tipo === 'venda') {
        vendas.push({ descricao, valor });
    } else {
        gastos.push({ descricao, valor });
    }

    atualizarRelatorios();
    this.reset();
});

// Formulário registro fiados
document.getElementById('form-fiado').addEventListener('submit', (e) => {
    e.preventDefault(); // Previne o comportamento padrão do formulário
    const nome = e.target['nome-fiado'].value.trim(); // Captura e remove espaços do nome
    const valor = parseFloat(e.target['valor-fiado'].value); // Converte o valor para float
    const peso = parseFloat(e.target['peso-fiado'].value); // Converte o peso para float
    const produto = e.target['produto-fiado'].value.trim(); // Captura e remove espaços do produto

    // Validação dos campos
    if (!nome || isNaN(valor) || valor <= 0 || isNaN(peso) || peso <= 0 || !produto) {
        alert('Por favor, preencha todos os campos do fiado corretamente!'); // Mensagem de erro
        return; // Interrompe a execução se a validação falhar
    }

    // Adiciona o novo fiado ao array
    fiados.push({ nome, valor, peso, produto, data: new Date() });
    e.target.reset(); // Reseta o formulário
    atualizarRelatorios(); // Atualiza os relatórios
    atualizarRelatorioFiados(); // Atualiza a lista de fiados
});

// Atualiza relatórios gerais
function atualizarRelatorios() {
    const totalVendas = vendas.reduce((acc, v) => acc + v.valor, 0);
    const totalGastos = gastos.reduce((acc, g) => acc + g.valor, 0);
    const lucro = totalVendas - totalGastos;

    document.getElementById('relatorio-vendas').innerText = `Total de Vendas: R$ ${totalVendas.toFixed(2)}`;
    document.getElementById('relatorio-gastos').innerText = `Total de Gastos: R$ ${totalGastos.toFixed(2)}`;
    document.getElementById('relatorio-lucro').innerText = `Lucro: R$ ${lucro.toFixed(2)}`;
}

// Atualiza a lista de fiados
function atualizarRelatorioFiados() {
    const listaFiados = document.getElementById('lista-fiados');
    listaFiados.innerHTML = ''; // Limpa a lista antes de atualizar

    fiados.forEach(fiado => {
        const li = document.createElement('li');
        li.innerText = `Nome: ${fiado.nome}, Valor: R$ ${fiado.valor.toFixed(2)}, Peso: ${fiado.peso.toFixed(2)} kg, Produto: ${fiado.produto}`;
        listaFiados.appendChild(li);
    });
}

});