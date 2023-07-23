import { Alert } from "flowbite-react";
import { useState } from "react";
export default function SelectBox(props) {
  const [isAlertOpen, setIsAlertOpen] = useState(props.isOpen);
  return (
    <>
      {isAlertOpen && (
        <Alert color={props.color} onDismiss={() => setIsAlertOpen(false)}>
          <span className=" mr-3 font-extrabold">Info alert!</span>
          {props.message}
        </Alert>
      )}
    </>
  );
}
