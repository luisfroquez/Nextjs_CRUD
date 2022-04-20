import { createContext, useContext, useState } from 'react';
import { v4 as uuid } from 'uuid'; // modulo que permite generar strings aleatorios

export const TaskContext = createContext(); // Este contiene todos los datos de la app

export const useTasks = () => useContext(TaskContext);
// Hook que evita que tenga que importar el useContext en cada componente que necesite usarlo

export const TasksProvider = ({ children }) => { 
    // Es especie de componente que tiene dentro mas componentes
    // lo unico que hace el TaskProvider es pasar sus componentes dentro del TaskContext,
    // es decir pasarlo dentro de un espacio donde podrá acceder a datos.    
    // cualquier componente hijo de TaskProvider, podrá acceder al componente TaskContext.Provider

    const [tasks, setTasks] = useState([{ // Este es el arreglo de todas las tareas
        id: '1',
        title: 'Example task title',
        description: 'Example task description'
    }]);

    const createTask = (title, description) => {
        setTasks([...tasks, { id: uuid(), title, description }]) // Esta función permite copiar todas las tareas y agregar un arreglo con una nueva tarea
    }

    const editTask = (id, editedTask) => {
        setTasks([
            ...tasks.map((task) =>
                task.id === id ? { ...task, ...editedTask } : task
            ),
        ]);
    }

    const deleteTask = id => setTasks([...tasks.filter(task => task.id !== id)]) // elimina del listado las tareas con el id seleccionado

    return <TaskContext.Provider value={{ tasks, createTask, editTask, deleteTask }}> {children} </TaskContext.Provider>;
    // value = los valores que enviamos a todos los componentes hijos para que puedan usarlos.

};