import { useContext, useEffect, useState } from "react";
import { userContext } from '@/comps/UserContext';
import { Button, TextField, List, ListItem, ListItemText } from "@mui/material";
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';

export default function WebSocketCall({ socket }) {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [user, setUser] = useContext(userContext);

  const handleText = (e) => {
    const inputMessage = e.target.value;
    setMessage(inputMessage);
  };

  const handleSubmit = () => {
    if (!message) {
      return;
    }
    socket.emit("data", { message, user });
    setMessage("");
  };

  const handleUpvote = (msgulid) => {
    socket.emit("upvote", { msgulid });
  };

  const handleDownvote = (msgulid) => {
    socket.emit("downvote", { msgulid });
  };

  useEffect(() => {
    if (typeof window === 'undefined') {
      return
    }

    socket.emit("get_previous_messages");
    socket.on("previous_messages", (previousMessages) => {
      setMessages(previousMessages);
    });

    socket.on("data", (data) => {
      setMessages([...messages, data]);
    });

    socket.on("upvote", (data) => {
      const messageIndex = messages.findIndex(
          (message) => message.ulid === data.ulid,
      );
      if (messageIndex !== -1) {
        const updatedMessages = [...messages];
        updatedMessages[messageIndex].upvote = data.upvote;
        setMessages(updatedMessages);
      }
    });

    socket.on("downvote", (data) => {
      const messageIndex = messages.findIndex(
          (message) => message.ulid === data.ulid,
      );
      if (messageIndex !== -1) {
        const updatedMessages = [...messages];
        updatedMessages[messageIndex].downvote = data.downvote;
        setMessages(updatedMessages);
      }
    });

    return () => {
      socket.off("data", () => {
        console.log("data event was removed");
      });
    };
  }, [socket, messages]);

  return (
      <div style={{ width: "100%", maxWidth: "100%", margin: "0 auto", padding: "20px", border: "1px solid #ccc", borderRadius: "8px", boxShadow: "0 2px 4px rgba(0,0,0,0.1)" }}>
        <List style={{ padding: "0" }}>
          {messages.map((msg, ind) => (
              <ListItem key={ind} style={{ marginBottom: "10px", backgroundColor: "#f9f9f9", padding: "10px", borderRadius: "8px" }}>
                <ListItemText>
                  <b>{msg && msg.user && msg.user.charAt(0).toUpperCase() + msg.user.slice(1)}</b>:{" "}
                  {msg.message}
                </ListItemText>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <Button onClick={() => handleUpvote(msg.ulid)} style={{ marginLeft: "10px" }}>
                    <ThumbUpIcon /> {msg.upvote}
                  </Button>
                  <Button onClick={() => handleDownvote(msg.ulid)} style={{ marginLeft: "10px" }}>
                    <ThumbDownIcon /> {msg.downvote}
                  </Button>
                </div>
              </ListItem>
          ))}
        </List>
        <div style={{ marginTop: "20px", display: "flex" }}>
          <TextField
              type="text"
              value={message}
              onChange={handleText}
              style={{ flexGrow: 1, marginRight: "10px" }}
              variant="outlined"
              label="Type your message"
          />
          <Button variant="contained" onClick={handleSubmit} color="primary">
            Send
          </Button>
        </div>
      </div>
  );
}
