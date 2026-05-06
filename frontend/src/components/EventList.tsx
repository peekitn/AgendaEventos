import React, { useState } from 'react';
import type { AppEvent } from '../App';
import "../styles/EventList.css";

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
    <div className="event-list-container">
      <h3>Próximos Eventos</h3>
      <ul className="event-list">
        {events.map((event) => (
          <li key={event.id} className="event-item">
            
            {/* Se for o evento que estamos editando, mostra os inputs */}
            {editingId === event.id ? (
              <div className="edit-form">
                <input 
                  type="text" 
                  value={editData.title} 
                  onChange={(e) => setEditData({...editData, title: e.target.value})} 
                />
                <div className="edit-row">
                  <input 
                    type="date" 
                    value={editData.date} 
                    onChange={(e) => setEditData({...editData, date: e.target.value})} 
                  />
                  <input 
                    type="time" 
                    value={editData.time} 
                    onChange={(e) => setEditData({...editData, time: e.target.value})} 
                  />
                </div>
                <textarea 
                  value={editData.description} 
                  onChange={(e) => setEditData({...editData, description: e.target.value})} 
                  rows={2} 
                />
                <div className="action-buttons">
                  <button onClick={() => handleSave(event.id)} className="btn btn-save">Salvar</button>
                  <button onClick={cancelEditing} className="btn btn-cancel">Cancelar</button>
                </div>
              </div>
            ) : (
              // Se NÃO estiver editando, mostra a visualização normal
              <div>
                <strong>{event.title}</strong>
                <small className="event-meta">Data: {event.date} | Hora: {event.time}</small>
                
                {event.description && (
                  <p className="event-description">{event.description}</p>
                )}
                
                <div className="action-buttons">
                  <button onClick={() => startEditing(event)} className="btn btn-edit">Editar</button>
                  <button onClick={() => onDelete(event.id)} className="btn btn-delete">Deletar</button>
                </div>
              </div>
            )}

          </li>
        ))}
      </ul>
    </div>
  );
};