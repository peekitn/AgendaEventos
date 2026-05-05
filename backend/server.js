const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 3001;

// Middlewares
app.use(cors());
app.use(express.json());

// Nosso "banco de dados" em memória
let events = [];

// Rota para listar eventos (ordenados por data e hora)
app.get('/api/events', (req, res) => {
  const sortedEvents = [...events].sort((a, b) => {
    const dateA = new Date(`${a.date}T${a.time}`);
    const dateB = new Date(`${b.date}T${b.time}`);
    return dateA - dateB;
  });
  
  res.json(sortedEvents);
});

// Rota para criar um novo evento
// Substitua a rota app.post('/api/events') inteira por esta:

app.post('/api/events', (req, res) => {
  // Agora desestruturamos a 'description' também
  const { title, date, time, description } = req.body;

  if (!title || !date || !time) {
    return res.status(400).json({ error: 'Título, data e hora são obrigatórios.' });
  }

  const newEvent = {
    id: Date.now().toString(),
    title,
    date,
    time,
    description: description || '' // Salva a descrição (ou vazio se não tiver)
  };

  events.push(newEvent);
  res.status(201).json(newEvent);
});

// ... (código anterior: app.get e app.post continuam iguais)

// Rota para DELETAR um evento
app.delete('/api/events/:id', (req, res) => {
  const { id } = req.params; // Pega o ID que vem na URL
  
  // Filtra a lista, mantendo apenas os eventos que NÃO têm esse ID
  events = events.filter(event => event.id !== id);
  
  res.status(200).json({ message: 'Evento deletado com sucesso' });
});

// Rota para EDITAR (Atualizar) um evento
app.put('/api/events/:id', (req, res) => {
  const { id } = req.params;
  const { title, date, time, description } = req.body;

  // Procura o evento pelo ID
  const eventIndex = events.findIndex(event => event.id === id);

  if (eventIndex === -1) {
    return res.status(404).json({ error: 'Evento não encontrado' });
  }

  // Atualiza os dados do evento na memória
  events[eventIndex] = {
    ...events[eventIndex], // Mantém o ID original
    title,
    date,
    time,
    description: description || ''
  };

  res.json(events[eventIndex]);
});

// app.listen(PORT, ...

app.listen(PORT, () => {
  console.log(`Servidor backend rodando em http://localhost:${PORT}`);
});