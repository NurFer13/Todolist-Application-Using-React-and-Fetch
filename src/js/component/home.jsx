import React from "react";
import { useState } from "react";
//include images into your bundle

//create your first component
const Home = () => {
  const [inputValue, setInputValue] = useState("");
  const [toDoList, setToDoList] = useState([]);
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      const newToDo = {
        id: Math.random(),
        todo: inputValue,
      };
      setToDoList(toDoList.concat(newToDo));
      setInputValue("");
    }
  };
  const handleDeleteToDoList = (id) => {
    const newList = toDoList.filter((item) => id !== item.id);
    setToDoList(newList);
  };
  return (
    <>
      <div className="card  text-center">
        <div className="header">
          <h1>To do List</h1>
        </div>
        <ul>
          <li>
            <input
              type="text"
              placeholder="What needs to be done"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
            />
          </li>
          {toDoList.map((item) => (
            <li key={item.id}>
              {item.toDoList}

              <i
                className=" icono fas fa-trash"
                onClick={() => handleDeleteToDoList(item.id)}
              >
                {" "}
              </i>
            </li>
          ))}
        </ul>

        <div className="footer">{toDoList.length} Tasks</div>
      </div>
    </>
  );
};

export default Home;
