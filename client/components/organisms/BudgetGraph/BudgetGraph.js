import React from "react";
import { useSelector } from "react-redux";
import R from "ramda";
import { PieChart } from "react-minimal-pie-chart";

export default function BudgetGraph() {
  const { todos } = useSelector(R.pick(["todos"]));
  var budgetData = [];
  todos.reduce(function (res, value) {
    if (!res[value.category]) {
      res[value.category] = {
        category: value.category,
        price: 0,
        label: value.category,
      };
      budgetData.push(res[value.category]);
    }
    res[value.category].price += value.price;
    res[value.category].color =
      "#" + Math.floor(Math.random() * 16777215).toString(16);
    res[value.category].label = res[value.category].category;
    return res;
  }, {});
  budgetData = budgetData.map(
    ({ price: value, category: title, color, label }) => ({
      value,
      title,
      color,
      label,
    })
  );
  console.log("result", budgetData);

  const defaultLabelStyle = {
    fontSize: "5px",
    fontFamily: "sans-serif",
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
      }}
    >
      <PieChart
        data={budgetData}
        label={({ dataEntry }) => dataEntry.percentage + "% " + dataEntry.title}
        labelStyle={{
          ...defaultLabelStyle,
        }}
      />
    </div>
  );
}
