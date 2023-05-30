import React from "react";
import { useState, useEffect } from "react";
//include images into your bundle

//create your first component
const Home = () => {
  const [inputValue, setInputValue] = useState("");
  const [toDoList, setToDoList] = useState([]);

  //   //For the POST
  // const createUser = () => {
  //   return fetch("https://assets.breatheco.de/apis/fake/todos/user/nurfer13", {
  //     method: "POST",
  //     body: JSON.stringify(toDoList),
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //   })
  //     .then((resp) => console.log("Everything is OK"))
  //     .catch((error) => console.log("ERROR"));
  // };
  // useEffect(createUser, []);

  // //To do the GET
  const getTodos = async () => {
    try {
      const res = await fetch(
        "https://assets.breatheco.de/apis/fake/todos/user/nurfer13"
      );
      const res_1 = await res.json();
      return setToDoList(res_1);
    } catch (error) {
      return console.log(error);
    }
  };
  useEffect(getTodos, []);

  // //PUT

  const putTodos = (newList) => {
    console.log(newList);
    return fetch("https://assets.breatheco.de/apis/fake/todos/user/nurfer13", {
      method: "PUT",
      body: JSON.stringify(newList),
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((res) => getTodos(res))
      .then((resp) => console.log("Everything is OK"))
      .catch((error) => console.log("Something is wrong!!!"));
  };

  // // TO UPDATE

  const update = () => {
    if (inputValue !== "") {
      const newElement = {
        label: inputValue,
        done: false,
      };
      setInputValue("");
      putTodos([...todo, newElement]);
    }
  };

  // .then((resp) => {
  //   // console.log(resp.ok); // will be true if the response is successfull
  //   // console.log(resp.status); // the status code = 200 or code = 400 etc.
  //   // console.log(resp.text()); // will try return the exact result as string
  //   // return resp.json(); // (returns promise) will try to parse the result as json as return a promise that you can .then for results
  // })
  // .then((data) => {
  //   //here is where your code should start after the fetch finishes
  //   console.log(data); //this will print on the console the exact object received from the server
  // })
  // .catch((error) => {
  //   //error handling
  //   console.log(error);
  // });

  function handleKeyDown(e) {
    if (e.key === "Enter") {
      const newToDo = {
        id: Math.random(),
        todo: inputValue,
      };
      setToDoList(toDoList.concat(newToDo));
      setInputValue("");
    }
  }
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
              {item.todo}

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
