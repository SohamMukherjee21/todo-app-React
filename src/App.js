import { useState, useEffect } from "react";
import "./App.css";
import { Button } from "@material-ui/core";
import { FormControl, Input, InputLabel } from "@material-ui/core";
import Todo from "./Todo";
import { db } from "./firebase";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

function App() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");

  //When the app loads we need to listen to the database and fetch new todos whenever the app reloads
  useEffect(() => {
    //this code here fires when the app.js file loads
    db.collection("todos")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) => {
        console.log(snapshot.docs.map((doc) => doc.data())); // --> { task: "Take the dogs out 🐶" }
        console.log(snapshot.docs.map((doc) => doc.data().task)); // --> { task: "Take the dogs out 🐶" }
        setTodos(
          snapshot.docs.map((doc) => ({ id: doc.id, task: doc.data().task }))
        );
      });
  }, []);

  const addTodo = (event) => {
    //This will fire of when we click the button Add Todo
    event.preventDefault();
    db.collection("todos").add({
      task: input,
      //We don't have to worry about spreads and setting the state again and everything bcz what this does is add to the database and again fires the snapshot and which in turn updates the todos by setting the state again with the updated one
      // setTodos([...todos, input]); 1:54:40
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      //Uses the firebase time stamp to sort things while adding todos
    });
    setInput(""); //clear input after clicking add todo button
  };

  return (
    <div className="App">
      <h1>Hello!</h1>
      <form>
        {/* <input
          type="text"
          value={input}
          onChange={(event) => setInput(event.target.value)}
        /> */}
        <FormControl>
          <InputLabel>✔ Write a todo </InputLabel>
          <Input
            type="text"
            value={input}
            onChange={(event) => setInput(event.target.value)}
          />
        </FormControl>
        <Button
          type="submit"
          disabled={!input}
          onClick={addTodo}
          variant="contained"
          color="primary"
        >
          Add Todo
        </Button>
        {/* <button type="submit" onClick={addTodo}>
          Add Todo
        </button> */}
      </form>
      <ul>
        {todos.map((todo) => (
          <Todo text={todo} />
          // <li>{todo}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
