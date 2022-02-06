import { snakeToCamelCase } from "json-style-converter/es5";
import R from "ramda";

import {
  getTodos,
  postTodo,
  putToggleCompleteTodo,
  putTodo,
  deleteTodo,
} from "_api/todos";
import {
  setTodos,
  addTodo,
  toggleCompleteTodo,
  updateTodo,
  removeTodo,
} from "_actions/todos";

import { dispatchError } from "_utils/api";

export const attemptGetTodos = () => (dispatch) =>
  getTodos()
    .then((data) => {
      const todos = R.map(
        (todo) =>
          R.omit(["Id"], R.assoc("id", todo._id, snakeToCamelCase(todo))),
        data.todos
      );

      dispatch(setTodos(todos));
      return data.todos;
    })
    .catch(dispatchError(dispatch));

export const attemptAddTodo = (text, price, category) => (dispatch) =>
  postTodo({ text, price, category })
    .then((data) => {
      const todo = R.omit(
        ["Id"],
        R.assoc("id", data.todo._id, snakeToCamelCase(data.todo))
      );

      dispatch(addTodo(todo));
      return data.user;
    })
    .catch(dispatchError(dispatch));

export const attemptToggleCompleteTodo = (id) => (dispatch) =>
  putToggleCompleteTodo({ id })
    .then((data) => {
      dispatch(toggleCompleteTodo(id));
      return data;
    })
    .catch(dispatchError(dispatch));

export const attemptUpdateTodo = (id, text, price, category) => (dispatch) =>
  putTodo({ id, text, price, category })
    .then((data) => {
      dispatch(
        updateTodo({
          id,
          text,
          price,
          category,
          updatedAt: data.todo.updated_at,
        })
      );
      return data;
    })
    .catch(dispatchError(dispatch));

export const attemptDeleteTodo = (id) => (dispatch) =>
  deleteTodo({ id })
    .then((data) => {
      dispatch(removeTodo(id));
      return data;
    })
    .catch(dispatchError(dispatch));
