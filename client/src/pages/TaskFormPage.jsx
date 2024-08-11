// imports
import { useForm } from 'react-hook-form';
import { createTask, deleteTask, updateTask, getTask } from '../api/Tasks.api.js';
import { useNavigate, useParams } from 'react-router-dom'
import { useEffect } from 'react'
import { toast } from 'react-hot-toast'

export const TaskFormPage = () => {

    /**
     * Librería: react-hook-form
     * hook: useForm
     * - register: Nos permite registrar inputs o textarea (cualquier campo para escribir)
     * - handleSubmit: Nos permite capturar los datos de cada register.
     * - formState: Nos permite registrar los diferentes estados por los que pasa el formulario.
     * 
     * hook: useParams -> Nos permite extraer los parámetros de la url
     */
    const { register, handleSubmit, formState: {
        errors
    }, setValue } = useForm()

    const navigate = useNavigate();
    const params = useParams();

    // console.log(params)

    const onSubmit = handleSubmit(async data => {
        // const rest = await createTask(data);
        // console.log(rest);        
        if (params.id) {
            // console.log(data)
            await updateTask(params.id, data)
            toast.success('Tarea actualizada con éxito', {
                position: 'bottom-right',
                style: {
                    background: '#101010',
                    color: '#fff'
                }
            })
        }
        else {
            await createTask(data);
            toast.success('Tarea creada con éxito', {
                position: 'bottom-right',
                style: {
                    background: '#101010',
                    color: '#fff'
                }
            })
        }
        navigate('/tasks');
    });


    useEffect(() => {
        async function loadTask() {
            if (params.id) {
                console.log('obteniendo datos');
                const { data: { title, description } } = await getTask(params.id);
                setValue('title', title);
                setValue('description', description);
            }
        }

        loadTask();
    }, [])

    return (
        <div className='max-w-xl mx-auto'>
            <form onSubmit={onSubmit}>
                <input
                    type="text"
                    placeholder="Title"
                    {...register('title', { required: true })} 
                    className='bg-zinc-700 p-3 rounded-lg block w-full mb-3'
                    />
                {errors.titile && <span>Title is required</span>}

                <textarea
                    rows='3'
                    placeholder="Description"
                    {...register('description', { required: true })}
                    className='bg-zinc-700 p-3 rounded-lg block w-full mb-3'
                ></textarea>
                {errors.description && <span>Description is required</span>}

                <button 
                className='bg-indigo-500 p-3 rounded-lg block w-full mt-3'
                >Save</button>
            </form>

            {params.id && (
                <div className='flex justify-end'>
                    <button 
                    className='bg-red-500 p-3 rounded-lg w-48 mt-3'
                    onClick={async () => {
                    const accepted = window.confirm('Are you sure?');

                    if (accepted) {
                        await deleteTask(params.id);
                        toast.success('Tarea eliminada', {
                            position: 'bottom-right',
                            style: {
                                background: '#101010',
                                color: '#fff'
                            }
                        })
                        navigate('/tasks');
                    }
                }}>Delete</button>
                </div>
            )}

        </div>
    )
}
