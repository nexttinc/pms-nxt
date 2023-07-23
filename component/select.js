import { useState } from "react";

export default function SelectBox(props) {
  const [items, setItems] = useState(props.items);
  const [value, setValue] = useState(props.default);
  const onChange = (e) => {
    setValue(e.target.value);
    props.setComponent(e.target.value);
  };
  return (
    <select onChange={onChange} value={value}>
      <option value="">{props.name} 선택</option>
      {items.map((item) => (
        <option key={item.id} value={item.id}>
          {item.value}
        </option>
      ))}
    </select>
  );
}
