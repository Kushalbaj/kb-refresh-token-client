import {useContext} from 'react'
import { Routes, Route,Navigate } from 'react-router-dom'
import { AuthContext} from './AuthProvider';
import Login from './components/Login'
import Register from './components/Register'
import TodoList from './components/TodoList'
import UpdateTodo from './components/UpdateTodo'
import NotFound from './components/NotFound';

function App() {
  const { isLoggedIn } = useContext(AuthContext);
  return (
      <Routes>
        <Route path="/login" element={isLoggedIn ? <Navigate to="/" replace /> : <Login />} />
        <Route path="/register" element={isLoggedIn ? <Navigate to="/" replace /> : <Register />} />
        <Route path="/" element={!isLoggedIn ? <Navigate to="/login" replace /> : <TodoList />} />
        <Route path="/update/:id" element={!isLoggedIn ? <Navigate to="/login" replace /> : <UpdateTodo />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
  )
}

export default App
