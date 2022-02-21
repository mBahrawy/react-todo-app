import classes from "./Todo.module.scss";
import delImg from "../../assets/images/del-icon.png";
import editImg from "../../assets/images/edit-icon.png";

const Todo = ({ info, deleteTodo, checkTodo, editTodo }) => {
  const checkTodoHandler = () => {
    checkTodo(info.id, !info.completed);
  };

  const editTodoHandler = () => {
    editTodo(info);
  };
  const deleteTodoHandler = () => {
    deleteTodo(info.id);
  };

  return (
    <section className={classes.todo}>
      <div onClick={checkTodoHandler} className={`${classes.todoName}`}>
        <p className={info.completed ? classes.checked : ""}>{info.title}</p>
      </div>
      <div className={`${classes.todoControl}`}>
        <button onClick={deleteTodoHandler}>
          <img src={delImg} />
        </button>
        <button onClick={editTodoHandler}>
          <img src={editImg} />
        </button>
      </div>
    </section>
  );
};

export default Todo;
