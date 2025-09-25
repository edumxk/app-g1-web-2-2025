import type { Tarefa } from '../interfaces/Tarefa';
import { TarefaItem } from './TarefaItem';

interface TaskListProps {
  titulo: string;
  tarefas: Tarefa[];
  onToggle: (id: number) => void;
}

export function TaskList({ titulo, tarefas, onToggle }: TaskListProps) {
  return (
    <section>
      <h2 className="text-2xl font-semibold border-b-2 border-slate-700 pb-2 mb-4">
        {titulo}
      </h2>
      <ul className="space-y-3">
        {tarefas.map((task) => (
          <TarefaItem 
            key={task.id} 
            tarefa={task} 
            onToggle={onToggle} 
          />
        ))}
      </ul>
    </section>
  );
}