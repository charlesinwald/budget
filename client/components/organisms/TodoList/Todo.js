/* eslint-disable react/prop-types */
/* eslint-disable quotes */
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons/faTrashAlt";
import { faPencilAlt } from "@fortawesome/free-solid-svg-icons/faPencilAlt";
import { faSave } from "@fortawesome/free-solid-svg-icons/faSave";
import { useDispatch } from "react-redux";
import Button from "_atoms/Button";
import Input from "react-bulma-companion/lib/Input";

import {
  attemptToggleCompleteTodo,
  attemptUpdateTodo,
  attemptDeleteTodo,
} from "_thunks/todos";

export default function Todo({ todo, onCheck, checked, selectedList }) {
  const dispatch = useDispatch();
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(todo.text);
  const [price, setPrice] = useState(todo.price);
  const [category, setCategory] = useState(todo.category);

  const updateName = (e) => setName(e.target.value);
  const updatePrice = (e) => setPrice(e.target.value);
  const updateCategory = (e) => setCategory(e.target.value);

  const handleUpdateTodo = () => {
    if (name) {
      dispatch(attemptUpdateTodo(todo.id, name, price, category)).then(() =>
        setEditing(false)
      );
    }
  };

  const deleteItems = () => {
    if (selectedList.length > 0) {
      selectedList.forEach((id) => {
        console.log("deleteItems", id);
        dispatch(attemptDeleteTodo(id));
      });
    } else {
      dispatch(attemptDeleteTodo(todo.id));
    }
  };

  return (
    <tr key={todo.id}>
      <td>
        <input
          type="checkbox"
          id="item"
          name="item"
          value={checked}
          onChange={onCheck}
        />
      </td>
      {!editing ? (
        <td>{todo.text}</td>
      ) : (
        <td>
          <Input value={name} onChange={updateName} />
        </td>
      )}
      {!editing ? (
        <td>{todo.price}</td>
      ) : (
        <td>
          <Input value={price} onChange={updatePrice} />
        </td>
      )}
      {!editing ? (
        <td>{todo.category}</td>
      ) : (
        <td>
          <div className="select category-dropdown-container">
            <select
              onChange={updateCategory}
              value={category}
              name="category"
              className="category-dropdown"
            >
              <option value="Shopping">Shopping</option>
              <option value="Food">Food</option>
              <option value="Entertainment">Entertainment</option>
              <option value="Other">Other</option>
            </select>
          </div>
        </td>
      )}
      <td onClick={() => setEditing(!editing)}>
        {!editing && <FontAwesomeIcon icon={faPencilAlt} size="lg" />}
      </td>
      <td onClick={deleteItems}>
        <FontAwesomeIcon icon={faTrashAlt} size="lg" />
      </td>
      {editing && (
        <td onClick={handleUpdateTodo}>
          <FontAwesomeIcon icon={faSave} size="lg" />
        </td>
      )}
    </tr>
  );
}
