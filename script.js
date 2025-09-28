function calcularAntecipacao() {
    // --- 1. CAPTURAR E VALIDAR VALORES DOS INPUTS ---
    const valorIntegral = parseFloat(document.getElementById('valorIntegral').value);
    const percCampanha = parseFloat(document.getElementById('percentualCampanha').value) || 0;
    const percIncentivo = parseFloat(document.getElementById('percentualIncentivo').value) || 0;
    const qtdParcelas = parseInt(document.getElementById('qtdParcelas').value);
    const percAntecipacaoInput = parseFloat(document.getElementById('percentualAntecipacao').value) || 0;
    
    const resultadoDiv = document.getElementById('resultado');

    // Validação para garantir que os campos principais foram preenchidos
    if (isNaN(valorIntegral) || isNaN(qtdParcelas)) {
        resultadoDiv.innerHTML = `<div class="result-block error"><p>Por favor, preencha pelo menos o Valor Integral e a Quantidade de Parcelas.</p></div>`;
        return;
    }

    // --- 2. LÓGICA DE CÁLCULO ---

    // Calcula o valor da mensalidade após os descontos de bolsa (Campanha e Incentivo)
    const valorAposCampanha = valorIntegral * (1 - percCampanha / 100);
    const valorMensalComBolsas = valorAposCampanha * (1 - percIncentivo / 100);

    // Calcula o valor total bruto das parcelas antecipadas
    const valorTotalBruto = valorMensalComBolsas * qtdParcelas;

    // Verifica a elegibilidade para o desconto de antecipação
    let percAntecipacaoReal = 0;
    let avisoDesconto = '';
    if (qtdParcelas >= 5) {
        percAntecipacaoReal = percAntecipacaoInput;
    } else {
         avisoDesconto = `<div class="result-block warning"><p>O desconto por antecipação não foi aplicado, pois é necessário antecipar 5 ou mais parcelas.</p></div>`;
    }

    // Calcula os valores para o lançamento
    const valorDescontoAntecipacao = valorTotalBruto * (percAntecipacaoReal / 100);
    const valorTotalPago = valorTotalBruto - valorDescontoAntecipacao;

    // Calcula o valor total da bolsa incentivo a ser lançado
    const valorDescontoIncentivoMensal = valorAposCampanha * (percIncentivo / 100);
    const valorTotalBolsaIncentivo = valorDescontoIncentivoMensal * qtdParcelas;
    
    let resultadoHTML = `
        ${avisoDesconto}

        <div class="result-block summary">
            <h3>✅ Valor Final da Antecipação</h3>
            <p>O valor total pago pelo aluno: <strong>R$ ${valorTotalPago.toFixed(2)}</strong></p>
        </div>
        
        <div class="result-block breakdown">
            <h3>📊 Lançamento de Créditos no Financeiro</h3>
            <p>Crédito de antecipação de semestralidade: <strong>R$ ${valorTotalPago.toFixed(2)}</strong></p>
            <p>Crédito da Bolsa Incentivo: <strong>R$ ${valorTotalBolsaIncentivo.toFixed(2)}</strong></p>
            <p>Valor total do Desconto de Antecipação (${percAntecipacaoReal}%): <strong>R$ ${valorDescontoAntecipacao.toFixed(2)}</strong></p>
        </div>
    `;
    
    resultadoDiv.innerHTML = resultadoHTML;
}