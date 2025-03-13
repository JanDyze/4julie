import React, { ReactNode } from "react";
import { useDraggable } from "@dnd-kit/core";

interface DraggableElementProps {
  id: string;
  x: number;
  y: number;
  children: ReactNode;
}

const DraggableElement: React.FC<DraggableElementProps> = ({ id, x, y, children }) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id,
  });

  return (
    <div
      ref={setNodeRef}
      style={{
        transform: `translate(${transform?.x ?? x}px, ${transform?.y ?? y}px)`,
        position: "absolute",
        cursor: "grab",
      }}
      {...listeners}
      {...attributes}
    >
      {children}
    </div>
  );
};

export default DraggableElement;
