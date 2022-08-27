import axios from "./axios.js";
import { useState } from "react";
import "./App.css";
import { useEffect } from "react";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";

function App() {
  const [text, setText] = useState("");
  const [messages, setMessages] = useState([
    {
      text: "",
      time: "",
      _id: "",
    },
  ]);
  const [isput, setisput] = useState(false);
  const [updateditem, setupdateditem] = useState({
    text: "",

    id: "",
  });

  useEffect(() => {
    axios.get("/messages/sync").then((response) => {
      setMessages(response.data);
    });
  }, [messages]);
  const time = new Date();
  const t = time.getHours() + ":" + time.getMinutes();
  const submit = (e) => {
    e.preventDefault();
    if(text===""){
      alert("empty message");

    }else{
    
    axios.post("/messages/new", {
      text: text,
      time: t,
      recieved: true,
    });
    setText("");
  }};
  const submit1 = (e) => {
    e.preventDefault();
    if(text===""){
      alert("empty message");

    }else{
    axios.post("/messages/new", {
      text: text,
      time: t,
      recieved: false,
    });
    setText("");
  }};
  function del(id) {
    axios
      .delete("/messages/" + id)
      .then(() => {
        alert("deleted");
      })
      .catch((err) => {
        console.error(err);
      });
  }
  function openupdate(id) {
    setisput(true);
    setupdateditem((prev) => {
      return {
        ...prev,
        id: id,
      };
    });
  }
  function updateitem(id) {
    if(updateditem.text===""){
      alert("empty message");
    }else{
    axios
      .put("/updatemessages/" + id, updateditem)
      .then(() => {
        alert("updated");
      })
      .catch((err) => {
        console.error(err);
      });
  }};
  const hand = (e) => {
    const { name, value } = e.target;
    setupdateditem((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };
  return (
    <>
    <h2 className="head">MERN STACK TODO CHAT APP</h2>
    <div className="App">
   
      <div className="container">
        {messages.map((message) => {
          return (
            <div
              className={`mes ${message.recieved && "reci"}`}
              key={message._id}
            >
              <div className="text">{message.text}</div>
              <span className="ti">{message.time}</span>
              <IconButton onClick={() => del(message._id)}>
                <DeleteForeverIcon />
              </IconButton>
              <IconButton onClick={() => openupdate(message._id)}>
                <EditIcon />
              </IconButton>
            </div>
          );
        })}
        {!isput ? (
          <form className="form">
            <input
              type="text"
              name="text"
              id="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
            />

            <button className="button" onClick={submit1}>send left</button>

            <button className="button" onClick={submit}>send right</button>
          </form>
        ) : (
          <form className="form">
            <input
              type="text"
              name="text"
              id="text"
              value={updateditem.text}
              onChange={hand}
            />
            <button className="button" onClick={() => updateitem(updateditem.id)}>update</button>
          </form>
        )}
      </div>
    </div>
    </>
  );
}

export default App;
