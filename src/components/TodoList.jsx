import { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../AuthProvider';
import './TodoList.css';

function TodoList() {
    const [todos, setTodos] = useState([]);
    const [username, setUsername] = useState("");
    const [newTodo, setNewTodo] = useState("");
    const { isLoggedIn, logOut } = useContext(AuthContext);

    useEffect(() => {
        const token = localStorage.getItem('token');
        axios.get(`${process.env.SERVER_APP_URL}/api/todos/getusertodo`, { headers: { Authorization: `Bearer ${token}` } })
            .then(res => {
                setTodos(res.data);
            });
    }, []);
    useEffect(() => {
        const token = localStorage.getItem('token');
        axios.get(`${process.env.SERVER_APP_URL}/api/user/username`, { headers: { Authorization: `Bearer ${token}` } })
            .then(res => {
                setUsername(res.data.username);
            });
    }, []);

    const addTodo = () => {
        const token = localStorage.getItem('token');
        axios.post(`${process.env.SERVER_APP_URL}/api/todos/createusertodo`, { content: newTodo }, { headers: { Authorization: `Bearer ${token}` } })
            .then(res => {
                setTodos(prevTodos => [...prevTodos, res.data]);
                setNewTodo("");
            });
    };

    const deleteTodo = (id) => {
        const token = localStorage.getItem('token');
        axios.delete(`${process.env.SERVER_APP_URL}/api/todos/deleteusertodo/${id}`, { headers: { Authorization: `Bearer ${token}` } })
            .then(res => {
                setTodos(prevTodos => prevTodos.filter(todo => todo._id !== id));
            })
            .catch(err=>{
                console.error("Error deleting todo:",err);
            });
    };

    return (
        <> 
            <div className="container-todo">
            <nav className="navbar">
                <h1 className="navbar-brand">Todo List</h1>
                <div className="navbar-nav">
                    <Link to="/" className="nav-link">Home</Link>
                    {isLoggedIn && <button className="nav-btn" onClick={logOut}>Log Out</button>}
                </div>
            </nav>
            <div className="card-todo--create">
                <h2>Start making list of todo {username}</h2>
                <div>
                    <input className='todo-create--input' value={newTodo} onChange={e => setNewTodo(e.target.value)} />
                    <button className="create-button" onClick={addTodo}>Create</button>
                </div>
            </div>
            <div className="card-todo--list">
            <h2>Your Todo List</h2>
                {todos.map((todo, index) => (
                    <div className="todo-list" key={index}>
                        <p className='todo-list--content'>{todo.content}</p>
                        <p className='todo-list--date'>Created at - {new Date(todo.timestamp).toLocaleDateString()}</p>
                        <div className="buttons-container">
                            <button className="update-button"><Link className='update-button--link' to={`/update/${todo._id}`}>Update</Link></button>
                            <button className="delete-button" onClick={() => deleteTodo(todo._id)}>Delete</button>
                        </div>
                    </div>
                ))}
            </div>
            <footer>
                <p>© 2023 Todo List. All rights reserved.</p>
                <p>Made with ❤️ by {username}.</p>
            </footer>
        </div>
        </>
    );
}
export default TodoList;
