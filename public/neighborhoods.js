document.addEventListener('DOMContentLoaded', async () => {
    const neighborhoodVotesList = document.getElementById('neighborhoodVotesList');
    const ctx = document.getElementById('voteChart').getContext('2d');

    const fetchVotesByNeighborhood = async () => {
        try {
            const response = await fetch('/api/neighborhoods');
            const data = await response.json();

            const labels = Object.keys(data);
            const votes = Object.values(data);

            neighborhoodVotesList.innerHTML = '';
            labels.forEach((neighborhood, index) => {
                const listItem = document.createElement('li');
                listItem.textContent = `${neighborhood}: ${votes[index]} votos`;
                neighborhoodVotesList.appendChild(listItem);
            });

            new Chart(ctx, {
                type: 'pie',
                data: {
                    labels: labels,
                    datasets: [{
                        label: 'Votos por Bairro',
                        data: votes,
                        backgroundColor: [
                            'rgba(255, 99, 132, 0.2)',
                            'rgba(54, 162, 235, 0.2)',
                            'rgba(255, 206, 86, 0.2)',
                            'rgba(75, 192, 192, 0.2)',
                            'rgba(153, 102, 255, 0.2)',
                            'rgba(255, 159, 64, 0.2)'
                        ],
                        borderColor: [
                            'rgba(255, 99, 132, 1)',
                            'rgba(54, 162, 235, 1)',
                            'rgba(255, 206, 86, 1)',
                            'rgba(75, 192, 192, 1)',
                            'rgba(153, 102, 255, 1)',
                            'rgba(255, 159, 64, 1)'
                        ],
                        borderWidth: 1
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: true, 
                    plugins: {
                        legend: {
                            position: 'top',
                        },
                        tooltip: {
                            callbacks: {
                                label: function (tooltipItem) {
                                    const dataset = tooltipItem.dataset;
                                    const total = dataset.data.reduce((acc, value) => acc + value, 0);
                                    const currentValue = dataset.data[tooltipItem.dataIndex];
                                    const percentage = ((currentValue / total) * 100).toFixed(2);
                                    return `${tooltipItem.label}: ${currentValue} votos (${percentage}%)`;
                                }
                            }
                        }
                    }
                }
            });
        } catch (error) {
            neighborhoodVotesList.innerHTML = 'Erro ao carregar a contagem de votos por bairro.';
            console.error('Erro ao buscar a contagem de votos por bairro:', error);
        }
    };

    fetchVotesByNeighborhood();
});
