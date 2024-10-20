import TasksHome from '@/Components/Tasks/TasksHome'
import React from 'react'

const page = () => {
  return (
    <main id="main" className="main">
      <div className="pagetitle">
        <h1>Tasks</h1>
      </div>
      <TasksHome />
    </main>
  )
}

export default page 