import React, { useState } from "react";
import { useDispatch } from "react-redux";

import Columns from "react-bulma-companion/lib/Columns";
import Column from "react-bulma-companion/lib/Column";
import Button from "react-bulma-companion/lib/Button";
import Input from "react-bulma-companion/lib/Input";
import Label from "react-bulma-companion/lib/Label";
import Field from "react-bulma-companion/lib/Field";
import Card from "react-bulma-companion/lib/Card";

import { attemptAddTodo } from "_thunks/todos";
import useKeyPress from "_hooks/useKeyPress";

export default function AddTodo() {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [category, setCategory] = useState("Shopping");

  const handleAddTodo = () => {
    if (name) {
      dispatch(attemptAddTodo(name, price, category));
      setName("");
      setPrice(0);
    }
  };

  useKeyPress("Enter", handleAddTodo);

  const updateText = (e) => setName(e.target.value);
  const updatePrice = (e) => setPrice(e.target.value);
  const updateCategory = (e) => setCategory(e.target.value);

  return (
    <Columns className="add-todo" gapless>
      <Card size="16">
        <Column size="12">
          <Field>
            <Label className="left-label">Name</Label>
            <Input value={name} onChange={updateText} />
          </Field>
          <Field>
            <Label className="left-label">Price</Label>
            <Input value={price} onChange={updatePrice} />
          </Field>
          <Field>
            <Label className="left-label">Category</Label>
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
          </Field>
          <Button color="success" onClick={handleAddTodo} fullwidth>
            Add
          </Button>
        </Column>
      </Card>
    </Columns>
  );
}
