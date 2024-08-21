document.addEventListener('DOMContentLoaded', () => {
    const voteForm = document.getElementById('voteForm');
    const votesList = document.getElementById('votesList');
    const voteCountsList = document.getElementById('voteCountsList');
    const totalVotesCount = document.getElementById('totalVotesCount');

    const fetchVotes = async () => {
        const response = await fetch('/api/votes');
        const votes = await response.json();

        votesList.innerHTML = '';
        votes.forEach(vote => {
            const listItem = document.createElement('li');
            listItem.textContent = `${vote.fullName} (Bairro: ${vote.neighborhood}) votou em ${vote.candidate}`;
            votesList.appendChild(listItem);
        });
    };

    const fetchVoteCounts = async () => {
        const response = await fetch('/api/votes/count');
        const voteCounts = await response.json();

        voteCountsList.innerHTML = '';
        voteCounts.forEach(count => {
            const listItem = document.createElement('li');
            listItem.textContent = `${count.neighborhood}: ${count.voteCount} voto(s)`;
            voteCountsList.appendChild(listItem);
        });
    };


    const fetchTotalVotes = async () => {
        const response = await fetch('/api/votes/total');
        const { totalVotes } = await response.json();

        totalVotesCount.textContent = `Total de votos: ${totalVotes}`;
    };


    voteForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const fullName = document.getElementById('fullName').value;
        const neighborhood = document.getElementById('neighborhood').value;

        const response = await fetch('/api/vote', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ fullName, neighborhood }),
        });

        if (response.ok) {
            alert('Voto registrado com sucesso!');
            voteForm.reset();
            fetchVotes(); 
            fetchVoteCounts();
            fetchTotalVotes();
        } else {
            alert('Erro ao registrar o voto. Tente novamente.');
        }
    });


    fetchVotes();
    fetchVoteCounts();
    fetchTotalVotes();
});
