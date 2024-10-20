import React from 'react'
import AddTaskForm from './AddTaskForm'
import TaskList from './TaskList'

const TasksHome = () => {
  return (
    <div>
      <AddTaskForm />
      <TaskList />
    </div>
  )
}

export default TasksHome