import React from "react";
import { Button, Label, TextInput, Checkbox } from "flowbite-react";
export default function Form(props) {
  const onChangeInput = (e) => {
    props.setToDoText(e.target.value);
  };

  return (
    <div>
      <div className="relative text-justify w-7/12 -translate-x-1/2 left-1/2">
        <hr className="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700"></hr>
        <div className="absolute left-1 w-9/12">
          <TextInput
            className="inline-block w-full"
            value={props.toDoText}
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
    </div>
  );
}
