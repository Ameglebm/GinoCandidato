document.addEventListener('DOMContentLoaded', async () => {
    const totalVotesDisplay = document.getElementById('totalVotesDisplay');

    const fetchTotalVotes = async () => {
        try {
            const response = await fetch('/api/total');
            const data = await response.json();
            totalVotesDisplay.textContent = `Total de votos: ${data.totalVotes}`;
        } catch (error) {
            totalVotesDisplay.textContent = 'Erro ao carregar o total de votos.';
            console.error('Erro ao buscar o total de votos:', error);
        }
    };

    fetchTotalVotes();
});
