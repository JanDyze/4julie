import { create } from "zustand";

export type UIElement = {
  id: string;
  type: "button" | "card" | "input";
  content: string;
  x: number;
  y: number;
};

interface UIStore {
  elements: UIElement[];
  addElement: (type: UIElement["type"]) => void;
  updateElement: (id: string, newProps: Partial<UIElement>) => void;
  removeElement: (id: string) => void;
}

const useUIStore = create<UIStore>((set) => ({
  elements: [],
  
  addElement: (type) =>
    set((state) => ({
      elements: [
        ...state.elements,
        { id: crypto.randomUUID(), type, content: "New " + type, x: 50, y: 50 },
      ],
    })),

  updateElement: (id, newProps) =>
    set((state) => ({
      elements: state.elements.map((el) =>
        el.id === id ? { ...el, ...newProps } : el
      ),
    })),

  removeElement: (id) =>
    set((state) => ({
      elements: state.elements.filter((el) => el.id !== id),
    })),
}));

export default useUIStore;
