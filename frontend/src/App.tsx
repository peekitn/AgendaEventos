import { useEffect, useState } from 'react';
import { EventForm } from './components/EventForm';
import { EventList } from './components/EventList';
import './App.css';

export interface AppEvent {
  id: string;
  title: string;
  date: string;
  time: string;
  description: string;
}

const API_URL = 'http://localhost:3001/api/events';

function App() {
  const [events, setEvents] = useState<AppEvent[]>([]);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      setEvents(data);
    } catch (error) {
      console.error('Erro ao buscar eventos:', error);
    }
  };

  const handleAddEvent = async (title: string, date: string, time: string, description: string) => {
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, date, time, description }),
      });
      if (response.ok) fetchEvents();
    } catch (error) {
      console.error('Erro ao adicionar evento:', error);
    }
  };

  {/* aqui fica a função do delete */}
  const handleDeleteEvent = async (id: string) => {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
      });
      if (response.ok) fetchEvents();
    } catch (error) {
      console.error('Erro ao deletar evento:', error);
    }
  };

  {/* aqui fica a função do edit */}
  const handleEditEvent = async (id: string, updatedEvent: Omit<AppEvent, 'id'>) => {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedEvent),
      });
      if (response.ok) fetchEvents();
    } catch (error) {
      console.error('Erro ao editar evento:', error);
    }
  };

  return (
    <div className='app-container'>
      <h1>Agenda de Eventos</h1>
      <EventForm onAddEvent={handleAddEvent} />
      {/* Passando as novas funções para a lista */}
      <EventList 
        events={events} 
        onDelete={handleDeleteEvent} 
        onEdit={handleEditEvent} 
      />
    </div>
  );
}

export default App;