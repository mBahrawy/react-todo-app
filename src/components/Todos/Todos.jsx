import React from "react";
import Todo from "../Todo/Todo";
import classes from './Todos.module.scss'

const Todos = ({todos, deleteTodo, editTodo, checkTodo}) => {
  return (<>
    <div className={classes.todoContainer}>
      {  todos.map((todo)=> 
          <Todo 
            key={todo.id} 
            info={todo} 
            deleteTodo={deleteTodo} 
            editTodo={editTodo}
            checkTodo={checkTodo} 
          />) }
    </div>
  </>)
  
  
  
};

export default Todos;
