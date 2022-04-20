import { GoPlusSmall } from 'react-icons/go'
import Link from 'next/link' //  permite navegar como si fuese una etiqueta a otra parte de nuestra app
import { useRouter } from 'next/router' // hook de next
import { useTasks } from '../context/taskContext' // acceso a todas las tareas


const Layout = ({ children }) => {

    const router = useRouter(); // tiene funciones como router.push() que permite ir a otra pagina de nuestra app

    const { tasks } = useTasks();

    return (
        <div className='font-mono min-h-screen h-full bg-gray-900 text-white'>

            <header className='flex items-center bg-gray-800 px-28 py-10'>
                <Link href='/'>
                    <a>
                        <h1 className='font-extrabold text-5xl'> Task APP </h1>
                    </a>
                </Link>

                <span className='ml-4 text-gray-400'>
                    {tasks.length} tasks
                </span>

                <div className='flex-grow text-right'>
                    <button
                        className='bg-blue-900 hover:bg-blue-700 px-4 py-2 font-bold rounded-md inline-flex items-center'
                        onClick={() => router.push('/new')}
                    >
                        <GoPlusSmall className='mr-2' />
                        Add task
                    </button>
                </div>
            </header>

            <main className='px-24 py-14'>
                {children}
            </main>

        </div>
    )
}

export default Layout