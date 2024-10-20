import React from 'react'
import { useRouter } from 'next/router'
import TaskListHome from '@/Components/TaskList/TaskListHome';
const index = () => {
    
  return (
    <main id='main'>
        <TaskListHome/>
    </main>
  )
}

export default index