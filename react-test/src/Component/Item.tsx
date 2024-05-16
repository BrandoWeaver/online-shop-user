import React from "react";

interface ItemProps {
  item: {
    id: number;
    name: string;
    quantity: number;
  };
  onUpdateItem: (id: number) => void;
}
let i = 0;
const Item: React.FC<ItemProps> = React.memo(({ item, onUpdateItem }) => {
  i++;
  console.log("rendering item", item.id);
  return (
    <div>
      <p>
        {item.name} - Quantity: {item.quantity}
      </p>
      <button onClick={() => onUpdateItem(item.id)}>Update Quantity</button>
    </div>
  );
});

export default Item;
