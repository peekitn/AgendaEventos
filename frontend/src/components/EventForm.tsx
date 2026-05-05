import React, { useState } from 'react';

// 1. Atualize a tipagem da propriedade (Props)
interface EventFormProps {
  onAddEvent: (title: string, date: string, time: string, description: string) => void;
}

export const EventForm: React.FC<EventFormProps> = ({ onAddEvent }) => {
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [description, setDescription] = useState(''); // 2. Novo estado

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !date || !time) return;

    // 3. Passe a descrição para a função
    onAddEvent(title, date, time, description);
    
    setTitle('');
    setDate('');
    setTime('');
    setDescription(''); // Limpa o campo
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: '20px', padding: '15px', border: '1px solid #ccc', borderRadius: '8px' }}>
      <h3>Novo Evento</h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <div style={{ display: 'flex', gap: '10px' }}>
          <input type="text" placeholder="Nome do Evento" value={title} onChange={(e) => setTitle(e.target.value)} required style={{ flex: 1 }} />
          <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
          <input type="time" value={time} onChange={(e) => setTime(e.target.value)} required />
        </div>
        
        {/* 4. Novo campo de texto na tela */}
        <textarea 
          placeholder="Descrição do evento (opcional)" 
          value={description} 
          onChange={(e) => setDescription(e.target.value)}
          rows={3}
          style={{ resize: 'vertical' }}
        />
        
        <button type="submit">Adicionar Evento</button>
      </div>
    </form>
  );
};