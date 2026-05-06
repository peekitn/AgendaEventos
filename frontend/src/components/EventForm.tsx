import React, { useState } from 'react';
import '../styles/EventForm.css';

interface EventFormProps {
  onAddEvent: (title: string, date: string, time: string, description: string) => void;
}

export const EventForm: React.FC<EventFormProps> = ({ onAddEvent }) => {
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !date || !time) return;

    {/* Dispara a função passando todos os dados, incluindo a descrição */}
    onAddEvent(title, date, time, description);
    
    {/* Limpa o formulário após adicionar */}
    setTitle('');
    setDate('');
    setTime('');
    setDescription('');
  };

  return (
    <form className="form-container" onSubmit={handleSubmit}>
      <h3>Novo Evento</h3>
      <div className="form-fields">
        <div className="form-row">
          <input 
            className="input-title"
            type="text" 
            placeholder="Nome do Evento" 
            value={title} 
            onChange={(e) => setTitle(e.target.value)} 
            required 
          />
          <input 
            type="date" 
            value={date} 
            onChange={(e) => setDate(e.target.value)} 
            required 
          />
          <input 
            type="time" 
            value={time} 
            onChange={(e) => setTime(e.target.value)} 
            required 
          />
        </div>
        
        <textarea 
          className="textarea-desc"
          placeholder="Descrição do evento (opcional)" 
          value={description} 
          onChange={(e) => setDescription(e.target.value)}
          rows={3}
        />
        
        <button type="submit" className="btn-add">Adicionar Evento</button>
      </div>
    </form>
  );
};