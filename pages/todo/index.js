import { Button, Label, TextInput, Checkbox } from "flowbite-react";
import { useState } from "react";
import Form from "./form";
import List from "./list";

export default function All() {
  const [toDoText, setToDoText] = useState("");
  const [toDoList, setToDoList] = useState([]);
  const onSubmit = (e) => {
    e.preventDefault();

    if (!toDoText) return;
    const nextToDoList = {
      id: toDoList.length,
      text: toDoText,
      checked: false,
    };

    //setToDoList(nextToDoList);
    setToDoList((prev) => [...prev, nextToDoList]);
    setToDoText("");
  };

  return (
    <>
      <div className="mx-auto py-20 text-center text-4xl font-extrabold">
        <h1>ToDo List 관리</h1>
      </div>
      <List toDoList={toDoList} setToDoList={setToDoList} />
      <form onSubmit={onSubmit} className="mb-40">
        <Form toDoText={toDoText} setToDoText={setToDoText} />
      </form>
    </>
  );
}
