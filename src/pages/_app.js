import '../styles/globals.css'
import {TasksProvider} from '../context/taskContext' // importamos nuestro componente global

function MyApp({ Component, pageProps }) {
  return (
    <TasksProvider> 
      <Component {...pageProps} /> 
    </TasksProvider>
  );
}

// colocando Component dentro de TaskProvider logramos que cualquier elemento que renderice next.js (paginas, componentes) 
// estarán dentro de TasksProvider (seran hijos)

export default MyApp