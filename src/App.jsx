import { useReducer, useState } from "react";
import InputForm from "./components/InputForm/InputForm";
import { Container } from "react-bootstrap";
import Todos from "./components/Todos/Todos";

const initTodos = [
  {
    userId: 1,
    id: 1,
    title: "delectus aut autem",
    completed: true,
  },
  {
    userId: 1,
    id: 2,
    title: "quis ut nam facilis et officia qui",
    completed: false,
  },
  {
    userId: 1,
    id: 3,
    title: "quis ut nam facilis et officia qui",
    completed: false,
  },
];

const reducer = (state, action) => {
  let newState = [...state];

  switch (action.type) {
    case "ADD_TODO":
      return [
        ...state,
        {
          id: action.todoId,
          title: action.todoName,
          completed: false,
        },
      ];
    case "CHECK_TODO":
      state.forEach((todo, index) => {
        if (todo.id === action.todoId) {
          newState[index].completed = action.todoStatus;
        }
      });

      return newState;

    case "EDIT_TODO":
      state.forEach((todo, index) => {
        if (todo.id === action.todoId) {
          newState[index].title = action.todoTitle;
        }
      });

      return newState;

    case "DELETE_TODO":
      return state.filter((todo) => todo.id != action.todoId);
    default:
  }
};

const App = () => {
  const [todos, dispatch] = useReducer(reducer, initTodos);
  const [editTodoIsActive, setEditTodoIsActive] = useState(false);
  const [editTodoInfo, setEditTodoInfo] = useState(null);

  const addingNewTodoHandler = (todo) => {
    dispatch({ type: "ADD_TODO", todoName: todo, todoId: Date.now() });
  };

  const deleteTodoHandler = (todoId) => {
    dispatch({ type: "DELETE_TODO", todoId });
  };

  const checkTodoHandler = (todoId, todoStatus) => {
    dispatch({ type: "CHECK_TODO", todoId, todoStatus });
  };

  const applyEditTodoHandler = (todoId, todoTitle) => {
    setEditTodoIsActive(false);
    dispatch({ type: "EDIT_TODO", todoId, todoTitle });
  };

  const editTodoHandler = (incomingTodoInfo) => {
    setEditTodoInfo(incomingTodoInfo);
    setEditTodoIsActive(true);
  };

  const cancelEditHandler = () => {
    setEditTodoIsActive(false);
  };

  return (
    <Container className="main-container">
      <InputForm
        addTodo={addingNewTodoHandler}
        applyEditTodo={applyEditTodoHandler}
        editTodoIsActive={editTodoIsActive}
        targetEditTodoInfo={editTodoInfo}
        cancelEdit={cancelEditHandler}
      />

      {todos.length != 0 ? (
        <h1>
          {todos.length} {todos.length > 1 ? "Todos" : "Todo"}
        </h1>
      ) : (
        <h1>No todos to be shown</h1>
      )}

      <Todos
        deleteTodo={deleteTodoHandler}
        editTodo={editTodoHandler}
        checkTodo={checkTodoHandler}
        todos={todos}
      />
    </Container>
  );
};

export default App;
