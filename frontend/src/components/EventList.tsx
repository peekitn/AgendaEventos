import React, { useState } from 'react';
import type { AppEvent } from '../App';

interface EventListProps {
  events: AppEvent[];
  onDelete: (id: string) => void;
  onEdit: (id: string, event: Omit<AppEvent, 'id'>) => void;
}

export const EventList: React.FC<EventListProps> = ({ events, onDelete, onEdit }) => {
  // Controle de qual evento está sendo editado no momento
  const [editingId, setEditingId] = useState<string | null>(null);
  
  // Estado temporário para os dados do formulário de edição
  const [editData, setEditData] = useState({ title: '', date: '', time: '', description: '' });

  const startEditing = (event: AppEvent) => {
    setEditingId(event.id);
    setEditData({ title: event.title, date: event.date, time: event.time, description: event.description });
  };

  const cancelEditing = () => {
    setEditingId(null);
  };

  const handleSave = (id: string) => {
    onEdit(id, editData);
    setEditingId(null); // Sai do modo de edição
  };

  if (events.length === 0) {
    return <p>Nenhum evento agendado.</p>;
  }

  return (
    <div>
      <h3>Próximos Eventos</h3>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {events.map((event) => (
          <li key={event.id} style={{ padding: '15px', borderBottom: '1px solid #eee', marginBottom: '10px', backgroundColor: '#f9f9f9', borderRadius: '5px' }}>
            
            {/* Se for o evento que estamos editando, mostra os inputs */}
            {editingId === event.id ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <input 
                  type="text" value={editData.title} 
                  onChange={(e) => setEditData({...editData, title: e.target.value})} 
                />
                <div style={{ display: 'flex', gap: '8px' }}>
                  <input 
                    type="date" value={editData.date} 
                    onChange={(e) => setEditData({...editData, date: e.target.value})} 
                  />
                  <input 
                    type="time" value={editData.time} 
                    onChange={(e) => setEditData({...editData, time: e.target.value})} 
                  />
                </div>
                <textarea 
                  value={editData.description} 
                  onChange={(e) => setEditData({...editData, description: e.target.value})} 
                  rows={2} 
                />
                <div style={{ display: 'flex', gap: '10px', marginTop: '5px' }}>
                  <button onClick={() => handleSave(event.id)} style={{ backgroundColor: 'green', color: 'white' }}>Salvar</button>
                  <button onClick={cancelEditing}>Cancelar</button>
                </div>
              </div>
            ) : (
              // Se NÃO estiver editando, mostra a visualização normal
              <div>
                <strong>{event.title}</strong> <br/>
                <small style={{ color: '#666' }}>Data: {event.date} | Hora: {event.time}</small>
                
                {event.description && (
                  <p style={{ margin: '10px 0', fontSize: '14px' }}>{event.description}</p>
                )}
                
                <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                  <button onClick={() => startEditing(event)}>Editar</button>
                  <button onClick={() => onDelete(event.id)} style={{ backgroundColor: 'red', color: 'white' }}>Deletar</button>
                </div>
              </div>
            )}

          </li>
        ))}
      </ul>
    </div>
  );
};