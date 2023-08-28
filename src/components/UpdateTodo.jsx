import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate,  } from 'react-router-dom';
import'./UpdateTodo.css';

function UpdateTodo() {
    const [todo, setTodo] = useState("");
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        axios.get(`${process.env.SERVER_APP_URL}/api/todos/getusertodo/${id}`, { headers: { Authorization: `Bearer ${token}` } })
            .then(res => {
                if (res.data._id === id) { // Ensure the response data's ID matches the ID from the URL
                    setTodo(res.data.content);
                } else {
                    console.error("ID mismatch");
                    // You can handle the mismatch case here, such as redirecting to an error page
                }
            });
    }, [id]);
    const updateTodo = () => {
        const token = localStorage.getItem('token');
        axios.put(`${process.env.SERVER_APP_URL}/api/todos/updateusertodo/${id}`, { content: todo }, { headers: { Authorization: `Bearer ${token}` } })
            .then(res => {
                navigate('/'); // Redirect to the TodoList after successful update
            });
    };

    return (
        <div className="updateTodoBody">
            <div className = "containerUpdate">
                <h1 className = "headingUpdate">Update Todo</h1>
                <textarea className = "textarea" rows="6" cols="50" name="comment" form="usrform" value={todo} onChange={e => setTodo(e.target.value)}> </textarea>
                <button className = "buttonUpdate" onClick = {updateTodo}>Update</button>
            </div>
        </div>
    );
}

export default UpdateTodo;
