import { useState } from 'react';
import type { Tarefa } from '../interfaces/Tarefa';
import { TaskList } from '../componentes/TarefaLista'
import { AddTaskForm } from '../componentes/AdicionarTarefa';

function Tarefas()
{
  const [tasks, setTasks] = useState<Tarefa[]>([]);


  // A LÓGICA DE NEGÓCIO PERMANECE AQUI
  function handleAddTask(taskText: string) {
    const novaTarefa: Tarefa = {
      id: Date.now(),
      text: taskText,
      isDone: false,
      isFavorite: false
    };
    setTasks(tarefasAnteriores => [...tarefasAnteriores, novaTarefa]);
  }
  
  function handleToggleTaskCompletion(id: number) {
    const updatedTasks = tasks.map((task) => {
      if (task.id === id) {
        return {
          ...task,
          isDone: !task.isDone,
          isFavorite: !task.isFavorite,
        };
      }
      return task;
    });
    setTasks(updatedTasks);
  }

  // A LÓGICA DE FILTRAGEM TAMBÉM FICA AQUI
  const pendingTasks = tasks.filter(task => !task.isDone);
  const isDoneTasks = tasks.filter(task => task.isDone);

  return (
      <div className="min-h-screen bg-slate-900 text-white flex flex-col items-center pt-20 font-sans px-4">
        <h1 className="text-4xl font-bold mb-8">Lista de Tarefas + Favoritos e Notificações</h1>
  
        <AddTaskForm onAddTask={handleAddTask} />
  
        <main className="w-full max-w-md mt-10 grid grid-cols-1 gap-12">
          <TaskList 
            titulo="Tarefas Pendentes"
            tarefas={pendingTasks}
            onToggle={handleToggleTaskCompletion}
          />
          <TaskList 
            titulo="Tarefas Finalizadas"
            tarefas={isDoneTasks}
            onToggle={handleToggleTaskCompletion}
          />
        </main>
      </div>
    );
}

export default Tarefas;