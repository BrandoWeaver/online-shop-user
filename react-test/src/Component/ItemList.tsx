import React from "react";
import Item from "./Item";

interface ItemProps {
  id: number;
  name: string;
  quantity: number;
}

interface ItemListProps {
  items: ItemProps[];
  onUpdateItem: (id: number) => void;
}

const ItemList: React.FC<ItemListProps> = React.memo(
  ({ items, onUpdateItem }) => {
    return (
      <div>
        {items.map((item) => (
          <Item key={item.id} item={item} onUpdateItem={onUpdateItem} />
        ))}
      </div>
    );
  }
);

export default ItemList;
