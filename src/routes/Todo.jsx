import React, { useState } from "react";

import Filter from "./Filter";
import Header from "./Header";
import List from "./List";

const Todo = () => {
  const [colorTodo, setColorTodo] = useState("");

  const handleChangeColor = (color) => {
    setColorTodo(color);
  };
  return (
    <>
      <Header colorTodo={colorTodo} />
      <Filter onChangeColor={handleChangeColor} />
      <List colorTodo={colorTodo} />
    </>
  );
};

export default Todo;
