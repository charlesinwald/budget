import React, { useState } from "react";
import { useSelector } from "react-redux";
import R from "ramda";
import Table from "react-bulma-companion/lib/Table";
import { attemptDeleteTodo } from "_thunks/todos";
import { useDispatch } from "react-redux";

// import Todo from "_molecules/Todo";
import Todo from "./Todo";

export default function TodoList() {
  const dispatch = useDispatch();

  const { todos } = useSelector(R.pick(["todos"]));
  console.log("todos", todos);
  const [selected, setSelected] = useState([]);

  return (
    <ul className="todo-list">
      {/* {R.reverse(todos).map(todo => <Todo key={todo.id} {...todo} />)} */}
      <Table size="fullwidth" style={{ width: "100%" }}>
        <thead>
          <tr>
            <th></th>
            <th>Name</th>
            <th>Price</th>
            <th>Category</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {todos.map((todo) => (
            <Todo
              todo={todo}
              selectedList={selected}
              key={todo.id}
              checked={selected.includes(todo.id)}
              onCheck={() => setSelected([...selected, todo.id])}
            />
          ))}
          <tr>
            <td>
              <b>Sum</b>
            </td>
            <td>
              <b>
                {todos
                  ?.reduce(function (prev, current) {
                    return parseFloat(prev) + parseFloat(current.price);
                  }, 0)
                  ?.toFixed(2)}
              </b>
            </td>
          </tr>
        </tbody>
      </Table>
    </ul>
  );
}
