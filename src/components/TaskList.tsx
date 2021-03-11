import { useState } from 'react';

import '../styles/tasklist.scss';

import { FiTrash, FiCheckSquare } from 'react-icons/fi';

interface Task {
  id: number;
  title: string;
  isComplete: boolean;
}

export function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState('');

  function handleCreateNewTask() {
    // Crie uma nova task com um id random, não permita criar caso o título seja vazio.
    if (!newTaskTitle) return; //Verifica se o Título não está vazio.

    const taskNew = {
      //Criando um novo array
      id: Math.random(), //gera id randomico
      title: newTaskTitle, //Recebe a informação do novo Title
      isComplete: false, // Inicia com a tarefa com status de false
    };

    setTasks((oldState) => [...oldState, taskNew]);
    //recupera o valor do array antigo e insere novos valores.

    setNewTaskTitle(''); //após a inserção limpa o estado inicial do campo
  }

  function handleToggleTaskCompletion(id: number) {
    const taskNew = tasks.map((task) =>
      task.id === id
        ? {
            //Mapeio todos os meus valores de id iguais
            ...task, //recupero os valores da minha lista
            isComplete: !task.isComplete, // verifico se o status do id é diferente do status do id da minha lista
          }
        : task
    ); //retorna o valor de task original
    setTasks(taskNew);
  }

  function handleRemoveTask(id: number) {
    // Remova uma task da listagem pelo ID
    const filteredTasks = tasks.filter((task) => task.id !== id); //Filtro a informação do id e armazeno na variável task.
    setTasks(filteredTasks);
  }

  return (
    <section className="task-list container">
      <header>
        <h2>Minhas tasks</h2>

        <div className="input-group">
          <input
            type="text"
            placeholder="Adicionar novo todo"
            onChange={(e) => setNewTaskTitle(e.target.value)}
            value={newTaskTitle}
          />
          <button
            type="submit"
            data-testid="add-task-button"
            onClick={handleCreateNewTask}
          >
            <FiCheckSquare size={16} color="#fff" />
          </button>
        </div>
      </header>

      <main>
        <ul>
          {tasks.map((task) => (
            <li key={task.id}>
              <div
                className={task.isComplete ? 'completed' : ''}
                data-testid="task"
              >
                <label className="checkbox-container">
                  <input
                    type="checkbox"
                    readOnly
                    checked={task.isComplete}
                    onClick={() => handleToggleTaskCompletion(task.id)}
                  />
                  <span className="checkmark"></span>
                </label>
                <p>{task.title}</p>
              </div>

              <button
                type="button"
                data-testid="remove-task-button"
                onClick={() => handleRemoveTask(task.id)}
              >
                <FiTrash size={16} />
              </button>
            </li>
          ))}
        </ul>
      </main>
    </section>
  );
}
