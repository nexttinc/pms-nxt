import React from "react";
import { Button, Label, TextInput, Checkbox } from "flowbite-react";
export default function Form(props) {
  const checkedToggle = (id) => {
    props.setToDoList(
      props.toDoList.map((todoItem) =>
        todoItem.id === id
          ? { ...todoItem, checked: !todoItem.checked }
          : todoItem
      )
    );
  };

  const onDelete = (id) => {
    props.setToDoList(props.toDoList.filter((todoItem) => todoItem.id !== id));
  };

  return (
    <>
      <div className="text-center">
        {props.toDoList.length == 0 ? "No Data" : ""}
      </div>
      {props.toDoList.map((toDoItem, index) => (
        <div
          key={index}
          className="relative text-justify w-7/12 -translate-x-1/2 left-1/2 h-11"
        >
          <div className="absolute top-1 left-1">
            <Checkbox
              id={toDoItem.id}
              className="mt-0.5"
              onClick={() => checkedToggle(toDoItem.id)}
            />

            <Label htmlFor={toDoItem.id} className="mx-3 mt-2">
              <span className={toDoItem.checked ? "line-through" : ""}>
                {toDoItem.text}
              </span>
            </Label>
          </div>
          <div className="absolute right-1">
            <Button
              gradientDuoTone="purpleToPink"
              type="button"
              className="inline-block float-right"
              onClick={() => onDelete(toDoItem.id)}
            >
              삭제
            </Button>
          </div>
        </div>
      ))}
    </>
  );
}
