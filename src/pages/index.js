import { useTasks } from "../context/taskContext";
import Layout from "../components/layout";
import { CgTrashEmpty } from "react-icons/cg"
import { useRouter } from "next/router";

const Home = () => {
  const { tasks, deleteTask } = useTasks();

  const { push } = useRouter();

  return (
    <Layout>
      <div className='flex justify-center'>
        {
          tasks.length === 0 ? (
            <h2> There are no task! </h2>
          ) : (
            <div className='w-full'>
              {tasks.map((task, index) => (
                <div
                  title={'Edit ' + task.title}
                  className='bg-gray-800 hover:bg-gray-700 cursor-pointer px-12 py-6 mx-16 my-4 rounded-lg flex justify-start items-center'
                  key={task.id}
                  onClick={() => push('/edit/' + task.id)}
                >
                  <span className='text-8xl mr-8'> {index + 1 } </span>

                  <div className='w-full'>
                    <h1 className='text-2xl font-bold'> {task.title} </h1>
                    <p> {task.description} </p>

                    <span className='text-xs text-gray-500'> id: {task.id} </span>
                  </div>

                  <button
                    title='Delete task'
                    onClick= { (e) => {
                        e.stopPropagation();
                        deleteTask(task.id);
                      }
                    }
                  >
                    <CgTrashEmpty className=' hover:text-red-500 text3xl' />
                  </button>
                </div>
              ))}
            </div>
          )
        }
      </div>
    </Layout>
  );
};

export default Home