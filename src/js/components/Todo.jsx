import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faListCheck, faTrash } from '@fortawesome/free-solid-svg-icons';
import "../../styles/index.css"

const Todo = () => {
  const [input, setInput] = useState("");
  const [tareas, setTareas] = useState([]);
  const [hoveredRow, setHoveredRow] = useState(null);

  const handleClick = () => {
    if (input === "") {
      alert("No puedes agregar una tarea vacia");
      return;
    }
    if (tareas.includes(input)) {
      alert("No puedes agregar una tarea repetida");
      return;
    }
    setTareas([...tareas, input])
    setInput("")

  }
  const deleteTask = (tarea) => {
    const newTareas = tareas.filter((i) => i !== tarea);
    setTareas(newTareas);
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
                {tarea}
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