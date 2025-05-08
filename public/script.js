const form = document.getElementById('form');
const mensagem = document.getElementById('mensagem');

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const nome = document.getElementById('nome').value;

  const res = await fetch('/api/nome', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ nome })
  });

  const data = await res.json();
  mensagem.textContent = data.message || 'Erro ao enviar';
  form.reset();
});
