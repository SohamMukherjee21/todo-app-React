/* eslint-disable */
import {
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  ImageIcon,
  Button,
  Modal,
  makeStyles,
  Paper,
} from "@material-ui/core";
import React, { useState } from "react";
import "./Todo.css";
import { db } from "./firebase";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  },
}));

function Todo(props) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const updateTodo = () => {
    //Update the todo with the new input text.
    db.collection("todos").doc(props.text.id).set(
      {
        task: input,
      },
      { merge: true }
    );
    setOpen(false);
  };

  return (
    <>
      <Modal open={open} onClose={handleClose}>
        <div className={classes.paper}>
          <h1>I am a modal</h1>
          <input
            placeholder={props.text.task}
            type="text"
            value={input}
            onChange={(event) => setInput(event.target.value)}
          />
          <Button onClick={updateTodo}>Update Todo</Button>
        </div>
      </Modal>
      <List className="todo__list">
        <ListItem>
          <ListItemAvatar></ListItemAvatar>
          <ListItemText primary={props.text.task} secondary="Dummy Alarm ☠" />
        </ListItem>
        {/* <li>{props.text}</li> */}
        <button onClick={(e) => setOpen(true)}>Edit </button>
        <DeleteForeverIcon
          onClick={(event) =>
            db.collection("todos").doc(props.text.id).delete()
          }
        />
      </List>
    </>
  );
}

export default Todo;
