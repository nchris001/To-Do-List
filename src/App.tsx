import React, {FC, ChangeEvent, useState} from 'react';
import { ITask } from './interface';
import './App.css';
import TodoTask from './components/todoTask';

const App: FC = () => {

  const [task, setTask] = useState<string>("")
  const [editingTask, setEditingTask] = useState<string | null>(null);
  const [editText, setEditText] = useState<string>("");
  const [todoList, setTodoList] =  useState<ITask[]>([])

  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setTask(event.target.value)
  }

  const addTask = (): void => {
    if (task.trim() === "") return
    const newTask = { taskName: task }
    setTodoList([...todoList, newTask])
    setTask("");
  }

  const completeTask = (taskNameToDelete : string):void => {
    setTodoList(todoList.filter((task) => {
      return task.taskName != taskNameToDelete
    }))
  }
  const updateTask = (oldTaskName: string, newTaskName: string) => {
    setTodoList(todoList.map(task =>
      task.taskName === oldTaskName ? {...task, taskName: newTaskName } : task
    ));
    setEditingTask(null);
  };

  return (
    <div className="App">
      <div className="header">
        <div className="input-container">
        <input type='text' placeholder='Task...' name='task' value={task} onChange={handleChange}></input>
        <button onClick={addTask}>Add Task</button>
        </div>
      </div>
      <div className="todoList">
          {todoList.map((task: ITask, key: number) => {
            return <TodoTask 
            key={key} 
            task={task} 
            completeTask={completeTask} 
            editTask={updateTask} 
        />;
          })}
      </div>
    </div>
  );
}

export default App;
