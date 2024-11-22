const url = 'https://raw.githubusercontent.com/natan317/api/refs/heads/main/preferencias.json';

const ctx = document.getElementById('grafico').getContext('2d');

let rotulosX = ["Vovózona", "As_Branquelas", "Norbit", "Gente_Grande", "Carros_2", "Ratatouille", "A_espera_de_um_milagre"];
let valores = [0, 0, 0, 0, 0, 0, 0];

// Criação do gráfico usando Chart.js
let grafico = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: rotulosX,
        datasets: [{
            label: '#Disciplina Preferida',
            data: valores,
            backgroundColor: [ // Cores para cada barra
                            '#FF5733',  
                            '#33FF57', 
                            '#3357FF', 
                            '#FF33A6', 
                            '#FF8C33', 
                            '#8E44AD', 
                            '#3498DB'
            ],
            borderWidth: 1
        }]
    },
    options: {
        responsive: true,
        plugins: {
            legend: {
                position: 'top' // Posiciona a legenda no lado direito
            },
            tooltip: {
                enabled: true // Habilita a exibição de tooltips
            },
            datalabels: {
                anchor: 'end', // Posiciona o valor no topo da barra
                align: 'top',
                color: '#fff', // Define a cor do valor exibido
                font: {
                    weight: 'bold' // Define a fonte como negrito
                },
                formatter: (value, context) => {
                    const total = context.chart.data.datasets[0].data.reduce((a, b) => a + b, 0);
                    const percent = ((value / total) * 100).toFixed(2); // Calcula a porcentagem
                    return `${value}\n(${percent}%)`; // Exibe o valor e a porcentagem em linhas separadas
                }
            }
        },
        scales: {
            x: {
                title: {
                    display: true, // Exibe o título do eixo X
                    text: 'Disciplinas', // Texto do título do eixo X
                    color: '#FFE31A', // Cor do título
                    font: {
                        size: 14, // Tamanho da fonte
                        weight: 'bold'
                    }
                },
                ticks: {
                    color:'#fff',
                }
            },
            y: {
                beginAtZero: true, // Começa o eixo Y no zero
                max: 18,
                title: {
                    display: true, // Exibe o título do eixo Y
                    text: 'Quantidade de Votos', // Texto do título do eixo Y
                    color: '#FFE31A', // Cor do título
                    font: {
                        size: 14, // Tamanho da fonte
                        weight: 'bold'
                    }
                },
                ticks: {
                    stepSize: 1 // Incremento de 1 no eixo Y
                }
            }
        }
    },
    plugins: [ChartDataLabels] // Plugin para exibir valores acima das colunas
});

// Função para buscar dados e atualizar o gráfico
function atualizarGrafico() {
    fetch(url)
        .then(resp => resp.json())
        .then(resp => {
            valores[0] = resp.Vovózona;
            valores[1] = resp.As_Branquelas;
            valores[2] = resp.Norbit;
            valores[3] = resp.Gente_Grande;
            valores[4] = resp.carros_2;
            valores[5] = resp.Ratatouille;
            valores[6] = resp.A_espera_de_um_milagre;

            // Atualiza o gráfico com os novos valores
            grafico.update();
        })
        .catch(erro => {
            alert("ERRO: " + erro); // Exibe um alerta em caso de erro
        });
}

// Chama a função de atualização a cada 5 segundos
setInterval(atualizarGrafico, 5000);