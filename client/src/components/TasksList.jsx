// imports
import { useEffect, useState } from "react";
import { getAllTasks } from "../api/Tasks.api";
import { TaskCard } from "./TaskCard";


export const TasksList = () => {

    const [tasks, setTasks] = useState([])

    useEffect(() => {

        async function loadTask() {
            const res = await getAllTasks();
            setTasks(res.data)
        }

        loadTask();

    }, [])

    return (
        <div className="grid grid-cols-3 grap-3">
            {tasks.map(task =>(                
                <TaskCard task ={task} key={task.id}/>
            ))}
        </div>
    )
}
