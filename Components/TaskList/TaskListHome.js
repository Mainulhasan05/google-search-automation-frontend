import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchTaskList, executeTask } from '@/features/task/taskSlice'
import { useRouter } from 'next/router';

const TaskListHome = () => {
    const dispatch = useDispatch();
    const {slug} = useRouter().query;
    const {taskList} = useSelector((state) => state.task);  
    const [isExecuting, setIsExecuting] = useState(false);
    useEffect(() => {
        if(slug){
            dispatch(fetchTaskList(slug));
        }
    }, [dispatch, slug]);
    // execute all tasks one by one after one is completed, fetch next task after current task is completed
    const executeAllTasks = async () => {
        setIsExecuting(true);
    
        for (const task of taskList?.data?.taskLists || []) {
            await dispatch(executeTask(task?.id)); // Wait for the task to complete
            await new Promise(resolve => setTimeout(resolve, 1000)); // 1 second delay between tasks
            await dispatch(fetchTaskList(slug)); // Fetch updated task list after each task
        }
    
        setIsExecuting(false);
    };
    
    
  return (
    <div className='card'>
        <div className='card-body'>
            <h1>Task List</h1>
            <div className='d-flex justify-content-end'>
                {isExecuting ? <button className='btn btn-primary' disabled>Executing...</button> : <button className='btn btn-primary' onClick={executeAllTasks}>Execute All</button>}
            </div>
            <table className='table table-striped'>
                <thead>
                    <tr>
                        <th>Browser Id</th>
                        <th>URL</th>
                        <th>Task</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {taskList?.data?.taskLists?.map((task) => (
                        <tr key={task.id}>
                            <td>{task?.profile?.browserId}</td>
                            <td>
                                <a href={task?.url} target='_blank'>Open Link</a>
                                <br />
                                {task?.action=='comment' && <span className='badge bg-info'>{task?.content}</span>}
                            </td>
                            <td>{task?.action}</td>
                            <td>{task?.status=="pending" ? <span className='badge bg-warning'>Pending</span> : task?.status=="completed" ? <span className='badge bg-success'>Completed</span> : task?.status=="failed" ? <span className='badge bg-danger'>Failed</span> : <span className='badge bg-danger'>In Progress</span>}</td>
                            <td>
                                {/* execute task and delete task */}
                                <button className='btn btn-primary' onClick={() => dispatch(executeTask(task?.id))}>Execute</button>
                                {/* <button className='btn btn-danger'>Delete</button> */}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </div>
  )
}

export default TaskListHome