function createPieChart(ctx, labels, data, backgroundColors, borderColors) {
    new Chart(ctx, {
        type: 'pie',
        data: {
            labels: labels,
            datasets: [{
                data: data,
                backgroundColor: backgroundColors,
                borderColor: borderColors,
                borderWidth: 1
            }]
        },
        options: {
            plugins: {
                datalabels: {
                    color: '#fff',
                    formatter: (value, ctx) => {
                        const total = ctx.chart.data.datasets[0].data.reduce((a, b) => a + b, 0);
                        return `${Math.round((value / total) * 100)}%`;
                    }
                }
            }
        }
    });
}

function createBarChart(ctx, labels, datasets) {
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: datasets
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            },
            plugins: {
                datalabels: {
                    anchor: 'end',
                    align: 'end',
                    color: '#000',
                    formatter: value => value
                }
            }
        }
    });
}
