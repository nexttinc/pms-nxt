import { useState } from "react";

export default function SelectBox(props) {
  const [items, setItems] = useState(props.value);
  const [value, setValue] = useState(props.default);
  const onChange = () => {};
  return (
    <select value={value} onChange={onChange}>
      <option value="">{props.name} 선택</option>
      {items.map((item) => (
        <option key={item.id} value={item.id}>
          {item.value}
        </option>
      ))}
    </select>
  );
}
