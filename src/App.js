import React from "react";
import "./App.css";
import { Container } from "semantic-ui-react";
import Todo from "./Todonew.js";

function App() {
  return (
    <div>
      <Container>
        <Todo />
      </Container>
    </div>
  );
}

export default App;
