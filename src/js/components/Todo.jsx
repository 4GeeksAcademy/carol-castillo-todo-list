import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import "../../styles/index.css"

const Todo = () => {
  const [input, setInput] = useState("");
  const [tareas, setTareas] = useState([]);
  const [hoveredRow, setHoveredRow] = useState(null);

  useEffect(() => {
    createUser();
    getUser();
  }, []);

  const createUser = () => {
    fetch("https://playground.4geeks.com/todo/users/CarolinaCastillo", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: "Carolina Castillo" }),
    })
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((error) => console.error("Error:", error));
  }

  const getUser = () => {
    fetch("https://playground.4geeks.com/todo/users/CarolinaCastillo")
      .then((response) => response.json())
      .then((data) => setTareas(data.todos))
      .catch((error) => console.error("Error:", error));
  }

  const createTask = () => {
    fetch("https://playground.4geeks.com/todo/todos/CarolinaCastillo", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ label: input, is_done: false }),
    })
      .then((response) => response.json())
      .then((data) => setTareas((prevTareas) => [...prevTareas, data]))
      .catch((error) => console.error("Error:", error));

  }

  const deleteTask = (tarea) => {
    fetch(`https://playground.4geeks.com/todo/todos/${tarea.id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(() => {
        const newTareas = tareas.filter((i) => i !== tarea);
        setTareas(newTareas);
      })
      .catch((error) => console.error("Error:", error));
  }

  const handleClick = () => {
    createTask();
    setInput("")
  }

  const handleEnterEvent = (event) => {
    if (event.key === "Enter") {
      handleClick();
    }
  }


  return (
    <div>
      <div className="todo">
        <label htmlFor="">Todo</label>
        <input
          type="text"
          value={input}
          onChange={(evento) => setInput(evento.target.value)}
          onKeyDown={(evento) => handleEnterEvent(evento)}
        />
        <button onClick={() => handleClick()}>Enviar</button>
      </div>
      <h2>Tareas pendientes</h2>
      <ul className="list-group">
        {tareas.length > 0 ? (
          tareas.map((tarea, index) => (
            <li
              className="list-group-item justify-content-between"
              key={index}
              onMouseEnter={() => setHoveredRow(index)}
              onMouseLeave={() => setHoveredRow(null)}
            >
              <div>
                {tarea.label}
              </div>
              <div>
                {hoveredRow === index && (
                  <FontAwesomeIcon role="button" icon={faTrash} onClick={() => deleteTask(tarea)} />
                )}
              </div>
            </li>
          ))
        ) : (
          <li className="list-group-item">
            <div>
              No hay tareas pendientes
            </div>
          </li>
        )}
      </ul>
    </div>
  )
}

export default Todo;