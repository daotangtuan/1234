const initState = {
  todos: [
    {
      id: 1,
      title: "Công việc 1",
      completed: false,
      color: "red",
    },
    {
      id: 2,
      title: "Công việc 2",
      completed: false,
      color: "blue",
    },
  ],
};

const todoReducer = (state = initState, action) => {
  switch (action.type) {
    case "todos/added": {
      console.log(action.payload.color);
      return {
        ...state,
        todos: [
          ...state.todos,
          {
            id: Date.now(),
            title: action.payload.title,
            completed: false,

            color: action.payload.color ? action.payload.color : "red",
          },
        ],
      };
    }

    case "todos/changeState": {
      return {
        ...state,
        todos: state.todos.map((todo) =>
          todo.id === action.payload.id
            ? {
                ...todo,
                completed: !todo.completed,
              }
            : todo
        ),
      };
    }

    case "todos/changeColor": {
      return {
        ...state,
        todos: state.todos.map((todo) =>
          todo.id === action.payload.id
            ? {
                ...todo,
                color: action.payload.color,
              }
            : todo
        ),
      };
    }

    case "todos/deleteTodo": {
      return {
        ...state,
        todos: state.todos.filter((todo) => todo.id !== action.payload.id),
      };
    }

    case "todos/deleteAll": {
      return {
        ...state,
        todos: [],
      };
    }

    case "todos/completedAll": {
      return {
        ...state,
        todos: state.todos.map((todo) => {
          return {
            ...todo,
            completed: true,
          };
        }),
      };
    }

    case "todos/inCompletedAll": {
      return {
        ...state,
        todos: state.todos.map((todo) => {
          return {
            ...todo,
            completed: false,
          };
        }),
      };
    }

    default: {
      return state;
    }
  }
};

export default todoReducer;
