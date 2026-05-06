const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 3001;

// Middlewares
app.use(cors());
app.use(express.json());

// banco de dados na memória
let events = [];

// aqui fica a rota para listar eventos, que são ordenados por data e hora
app.get('/api/events', (req, res) => {
  const sortedEvents = [...events].sort((a, b) => {
    const dateA = new Date(`${a.date}T${a.time}`);
    const dateB = new Date(`${b.date}T${b.time}`);
    return dateA - dateB;
  });
  
  res.json(sortedEvents);
});

// rota pra criar um novo evento
app.post('/api/events', (req, res) => {
  const { title, date, time, description } = req.body;

  if (!title || !date || !time) {
    return res.status(400).json({ error: 'Título, data e hora são obrigatórios.' });
  }

  const newEvent = {
    id: Date.now().toString(),
    title,
    date,
    time,
    description: description || '' // aqui salva a descrição ou deixa vazio se não tiver
  };

  events.push(newEvent);
  res.status(201).json(newEvent);
});

// aquiu fica a rota para deletar um evento
app.delete('/api/events/:id', (req, res) => {
  const { id } = req.params; // aqui pega o ID que vem na URL
  
  // aqui filtra a lista, mantendo apenas os eventos que NÃO têm esse ID
  events = events.filter(event => event.id !== id);
  
  res.status(200).json({ message: 'Evento deletado com sucesso' });
});

// aqui fica a rota para editar um evento
app.put('/api/events/:id', (req, res) => {
  const { id } = req.params;
  const { title, date, time, description } = req.body;

  // aqui procura o evento pelo ID
  const eventIndex = events.findIndex(event => event.id === id);

  if (eventIndex === -1) {
    return res.status(404).json({ error: 'Evento não encontrado' });
  }

  // aqui então atualiza os dados do evento na memória
  events[eventIndex] = {
    ...events[eventIndex], // Mantém o ID originall
    title,
    date,
    time,
    description: description || ''
  };

  res.json(events[eventIndex]);
});

app.listen(PORT, () => {
  console.log(`Servidor backend tá rodandooooo em http://localhost:${PORT}`);
});