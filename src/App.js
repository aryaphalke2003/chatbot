import React, { useEffect, useState } from "react";
import { Box, Button, Card, CardContent, Grid, TextField } from "@mui/material";
import Message from "./components/Message";
import userLogo from "./assets/bot.png";


function App() {
  const messagesListRef = React.createRef();
  const [messageInput, setMessageInput] = useState("");
  const [messages, setMessages] = useState([]);

  const sendMessage = (content) => {
    // add the message to the state
    setMessages([
      ...messages,
      {
        content: content,
        isCustomer: true,
      }
    ]);

    // TODO: post the request to Back4app
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    sendMessage(messageInput);
    setMessageInput("");
  }

  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      sx={{
        height: "100vh",
        textAlign: "center",
        backgroundColor: "#F7EFE5",
      
     
      }}
    >
      <Grid item xs={12} sm={10} md={8} lg={6}>
      <Card sx={{ backgroundColor: "white", display: "inline-block", }}>
          <CardContent>
            <Box
              ref={messagesListRef}
              sx={{
                height: 420,
                overflow: "scroll",
                overflowX: "hidden",
              }}
            >
              <Box sx={{ m: 1, mr: 2 }}>
                {messages.map((message, index) => (
                  <Box key={index} sx={{ display: "flex", flexDirection: message.isCustomer ? "row-reverse" : "row" }}>
                    
                    <Message
                      content={message.content}
                      image={message.image}
                      isCustomer={message.isCustomer}
                      choices={message.choices}
                      handleChoice={sendMessage}
                    />
                    {message.isCustomer &&
                      <Box sx={{ display: "flex", alignItems: "center", marginRight: 1 }}>
                        <img src={userLogo} alt="User Logo" width={24} height={24} />
                      </Box>
                    }
                  </Box>
                ))}
              </Box>
            </Box>
            <Box
              component="form"
              sx={{
                mt: 2,
                display: "flex",
                flexFlow: "row",
                gap: 1,
              }}
            >
              <TextField
                variant="outlined"
                size="small"
                value={messageInput}
                onChange={(event) => setMessageInput(event.target.value)}
                fullWidth
              />
              <Button
                variant="contained"
                onClick={handleSubmit}
                type="submit"
              >
                Send
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}

export default App;