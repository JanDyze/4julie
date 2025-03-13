import React from "react";
import useUIStore from "@/store/uiStore";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { DndContext } from "@dnd-kit/core";
import DraggableElement from "@/components/DraggableElement"; // Import the fixed component

const UIBuilder: React.FC = () => {
  const { elements, addElement, removeElement, updateElement } = useUIStore();

  const handleDragEnd = (event: any) => {
    const { id, delta } = event;
    updateElement(id, {
      x: (delta?.x || 0),
      y: (delta?.y || 0),
    });
  };

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <div className="flex flex-col items-center space-y-4 w-full max-w-2xl">
        {/* Toolbar */}
        <div className="flex space-x-2">
          <Button onClick={() => addElement("button")}>Add Button</Button>
          <Button onClick={() => addElement("card")}>Add Card</Button>
          <Button onClick={() => addElement("input")}>Add Input</Button>
        </div>

        {/* UI Canvas */}
        <div className="relative border w-full min-h-[400px] bg-gray-100 rounded-md p-4">
          {elements.map((el) => (
            <DraggableElement key={el.id} id={el.id} x={el.x} y={el.y}>
              <div className="relative p-2 border rounded bg-white shadow-md">
                {el.type === "button" && <Button>{el.content}</Button>}
                {el.type === "card" && <Card className="p-4">{el.content}</Card>}
                {el.type === "input" && <Input placeholder={el.content} />}
                <button
                  onClick={() => removeElement(el.id)}
                  className="absolute top-1 right-1 bg-red-500 text-white p-1 text-xs rounded"
                >
                  ✕
                </button>
              </div>
            </DraggableElement>
          ))}
        </div>
      </div>
    </DndContext>
  );
};

export default UIBuilder;
