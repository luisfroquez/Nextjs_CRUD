import { useState, useEffect } from "react";
import Layout from "../components/layout"
import { useTasks } from "../context/taskContext"; // para guardar las tareas en el estado
import { useRouter } from "next/router";

const TaskFormPage = () => {

    const editStyles = {
        input: 'bg-gray-800 focus:text-gray-100 focus:outline-none w-full py-3 px-4 mb-5 ',

    }

    const [task, setTask] = useState({
        title: '',
        description: '',
    });

    const { createTask, editTask, tasks } = useTasks()

    const { push, query } = useRouter() // si no queremos importar todo el objeto, desesctructuramos con el valor que queremos

    // const { query } = useRouter() // nos permite leer datos de la url en este caso el id

    const handleChange = (change) => {
        const { name, value } = change.target; // extrae en name y value lo que viene desde change
        setTask({ ...task, [name]: value }) // actualiza los valores de task
    }

    const handleSubmit = (submit) => {
        submit.preventDefault() // evita que se refresque la página

        if (!query.id) {
            createTask(task.title, task.description) // guarda la nueva tarea
        } else {
            editTask(query.id, task) // edita la tarea
        }
        
        push('/') // nos lleva a la home

    }

    useEffect(() => {
        if (query.id) {
            const taskFound = tasks.find((task) => task.id === query.id);
            setTask({ title: taskFound.title, description: taskFound.description });
        }
    }, []);


    return (
        <Layout>
            <form
                onSubmit={handleSubmit}
                className='px-12 py-6'    
            >
                <h1 className='text-2xl  mb-10'> {(query.id) ? 'Editing: ' + task.title : "Add a new task"} </h1>

                <input
                    type='text'
                    name='title'
                    placeholder='Name your new task'
                    className={editStyles.input + 'text-xl'}
                    onChange={handleChange}
                    value={task.title}
                />

                <textarea
                    name='description'
                    rows='2'
                    placeholder='Describe your newtask'
                    className={editStyles.input + ' h-40'}
                    onChange={handleChange}
                    value={task.description}
                />

                <button
                    className='bg-green-800 hover:bg-green-600 px-4 py-2 rounded-md disabled:opacity-40'
                    disabled={!task.title}
                >
                    Save task
                </button>
            </form>
        </Layout>
    );
};

export default TaskFormPage