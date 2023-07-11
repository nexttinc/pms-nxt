import { Button, Label, TextInput, Checkbox } from "flowbite-react";
import { useState } from "react";

export default function ToDoList({ prop }) {
  const [toDoText, setToDoText] = useState("");
  const [toDoList, setToDoList] = useState([]);
  const onChangeInput = (e) => {
    setToDoText(e.target.value);
  };
  const onSubmit = (e) => {
    if (!toDoText) {
      return;
    }

    const nextToDoList = {
      id: toDoList.length,
      text: toDoText,
      checked: false,
    };

    //setToDoList(nextToDoList);
    setToDoList((prev) => [...prev, nextToDoList]);
    setToDoText("");
    e.preventDefault();
  };

  const checkedToggle = (id) => {
    setToDoList(
      toDoList.map((todoItem) =>
        todoItem.id === id
          ? { ...todoItem, checked: !todoItem.checked }
          : todoItem
      )
    );
  };

  const onDelete = (id) => {
    setToDoList(toDoList.filter((todoItem) => todoItem.id !== id));
  };

  return (
    <>
      <div className="mx-auto py-20 text-center text-4xl font-extrabold">
        <h1>ToDo List 관리</h1>
      </div>
      <div className="text-center">{toDoList.length == 0 ? "No Data" : ""}</div>
      {toDoList.map((toDoItem, index) => (
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

      <form onSubmit={onSubmit} className="mb-40">
        <div className="relative text-justify w-7/12 -translate-x-1/2 left-1/2">
          <hr className="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700"></hr>
          <div className="absolute left-1 w-9/12">
            <TextInput
              className="inline-block w-full"
              value={toDoText}
              onChange={onChangeInput}
            ></TextInput>
          </div>
          <div className="absolute right-1">
            <Button
              gradientDuoTone="purpleToPink"
              type="submit"
              className="inline-block float-right"
            >
              입력
            </Button>
          </div>
        </div>
      </form>
    </>
  );
}
