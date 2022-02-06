import React from "react";
import AddTodo from "_molecules/AddTodo";
import TodoList from "_organisms/TodoList";

import Section from "react-bulma-companion/lib/Section";
import Title from "react-bulma-companion/lib/Title";
import Columns from "react-bulma-companion/lib/Columns";
import Column from "react-bulma-companion/lib/Column";
import BudgetGraph from "../../organisms/BudgetGraph";

export default function TodoSection() {
  return (
    <Section className="todo-section">
      <Title size="1" className="has-text-centered">
        Budget
      </Title>
      <Columns>
        <Column size="4" className="has-text-centered">
          <AddTodo />
        </Column>
        <Column size="4" offset="2" className="has-text-centered">
          <BudgetGraph />
        </Column>
      </Columns>
      <Columns offset="2">
        <Column size="12" className="has-text-left">
          <TodoList />
        </Column>
      </Columns>
    </Section>
  );
}
