import React, { useRef, useState, useEffect } from "react";
import { Form } from "react-bootstrap";
import classes from "./inputForm.module.scss";

const InputForm = ({
  addTodo,
  applyEditTodo,
  editTodoIsActive,
  targetEditTodoInfo,
  cancelEdit
}) => {
  const inPut = useRef();

  const [value, setValue] = useState('Hello World');
  const handleChange = (e) => setValue(e.target.value);

  editTodoIsActive && inPut.current.focus();

  const formSubmitHandler = (e) => {
    const todoTitle = inPut.current.value;
    e.preventDefault();
    if (todoTitle.trim("").length > 3) {

      editTodoIsActive
        ? applyEditTodo(targetEditTodoInfo.id, todoTitle)
        : addTodo(todoTitle);

        setValue("");

    } else {
      alert("Please enter a valid todo name");
    }
  };

  useEffect(() => {
     setValue(targetEditTodoInfo?.title || "");
  }, [targetEditTodoInfo]);

  return (
    <Form className={classes.todoForm} onSubmit={formSubmitHandler}>
      <Form.Group className="mb-3 w-50">
        <Form.Control
          value={value}
          onChange={handleChange}
          onBlur={cancelEdit}           
          ref={inPut}
          type="text"
          placeholder="Add a todo.."
        />

      </Form.Group>
    </Form>
  );
};

export default InputForm;
