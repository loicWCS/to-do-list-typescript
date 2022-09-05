import React, { useState, useEffect } from "react";

import "./App.css";

function App() {
  const [todos, setTodos] = useState([]); // useState de la methode GET, il s'agit d'un tableau à mettre à jour
  const [todo, setTodo] = useState({ description: "" }); // useState de la methode POST, il s'agit d'un objet que l'on crée

  const getTodos = async () => {
    const response = await fetch("http://localhost:5000/todos", {
      method: "GET", // ou POST, PUT, DELETE
    });
    const data = await response.json();
    setTodos(data.result); // notre tableau
  };

  const postTodos = () => {
    fetch("http://localhost:5000/todos", {
      method: "POST", // ou GET, PUT, DELETE
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(todo),
    }).then(() => {
      getTodos();
      setTodo({ description: "" });
    });
  };

  const deleteTodo = (id) => {
    fetch(`http://localhost:5000/todos/${id}`, {
      method: "DELETE",
    }).then(() => {
      getTodos();
    });
  };

  const updateTodo = (id) => {
    fetch(`http://localhost:5000/todos/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(todo),
    }).then(() => {
      getTodos();
    });
  };

  const handleTask = (e) => {
    setTodo({ description: e.target.value });
  };

  useEffect(() => {
    getTodos();
  }, []);

  return (
    <div className="App">
      <div>
        <input
          type="text"
          value={todo.description}
          onChange={(e) => handleTask(e)}
        />
        <button type="button" onClick={postTodos}>
          Add todo
        </button>
      </div>

      {
        todos.map((tasks) => (
          <div key={tasks.id}>
            {tasks.description}
            <button type="button" onClick={() => deleteTodo(tasks.id)}>
              X
            </button>
            <button type="button" onClick={() => updateTodo(tasks.id)}>
              Update
            </button>
          </div>
        )) /* affichage des taches */
      }
    </div>
  );
}
export default App;
