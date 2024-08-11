import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { TasksPage } from './pages/TasksPage'
import { TaskFormPage } from './pages/TaskFormPage'
import { Navegation } from './components/Navegation'
import { Toaster } from 'react-hot-toast'


const App = () => {
  return (
    <>
      <BrowserRouter>
        <div className='container mx-auto'>
          <Navegation />

          <Routes>
            <Route path='/' element={<Navigate to={"/tasks"} />} />
            <Route path='/tasks' element={<TasksPage />} />
            <Route path='/tasks-create' element={<TaskFormPage />} />
            <Route path='/tasks/:id' element={<TaskFormPage />} />
          </Routes>
          <Toaster />
        </div>
      </BrowserRouter>
    </>
  )
}

export default App
