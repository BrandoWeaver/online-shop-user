import React, { useCallback, useState } from "react";
import ItemList from "./Component/ItemList";

interface Item {
  id: number;
  name: string;
  quantity: number;
}

const generateItems = (count: number): Item[] => {
  return Array.from({ length: count }, (_, index) => ({
    id: index,
    name: `Item ${index}`,
    quantity: 1,
  }));
};

const App: React.FC = () => {
  const [items, setItems] = useState<Item[]>(generateItems(1000));

  const handleUpdateItem = useCallback((id: number) => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  }, []);

  return (
    <div>
      <h1>Item List</h1>
      <ItemList items={items} onUpdateItem={handleUpdateItem} />
    </div>
  );
};

export default App;
