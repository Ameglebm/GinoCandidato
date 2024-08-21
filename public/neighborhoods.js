document.addEventListener('DOMContentLoaded', async () => {
    const neighborhoodVotesList = document.getElementById('neighborhoodVotesList');

    const fetchVotesByNeighborhood = async () => {
        try {
            const response = await fetch('/api/neighborhoods');
            const data = await response.json();

            neighborhoodVotesList.innerHTML = '';
            for (const [neighborhood, count] of Object.entries(data)) {
                const listItem = document.createElement('li');
                listItem.textContent = `${neighborhood}: ${count} votos`;
                neighborhoodVotesList.appendChild(listItem);
            }
        } catch (error) {
            neighborhoodVotesList.innerHTML = 'Erro ao carregar a contagem de votos por bairro.';
            console.error('Erro ao buscar a contagem de votos por bairro:', error);
        }
    };

    fetchVotesByNeighborhood();
});
