import { useState } from "react";
import Todo from "./routes/Todo";
import "./App.css";
import { Provider } from "react-redux";
import store from "./store";

function App() {
  return (
    <Provider store={store}>
      <Todo />
    </Provider>
  );
}

export default App;
