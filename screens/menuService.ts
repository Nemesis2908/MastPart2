export interface MenuItem {
  id: string;
  name:string;
  description: string;
  course: string;
  price: string;
}
// array of food items
let menuItems: MenuItem[] = [
  { id: '1', name: 'Margherita Pizza', description: 'Fresh mozzarella, tomatoes, and basil.', course: "Main Dish", price: 'R200' },
  { id: '2', name: 'Classic Burger', description: 'Beef patty with lettuce, tomato, and our special sauce.', course: "Main Dish", price: 'R100' },
];

type Listener = (items: MenuItem[]) => void;
let listeners: Listener[] = [];

export const getMenuItems = () => menuItems;

export const addMenuItem = (newMeal: { name: string; description: string; course: string; price: string; }) => {
  const newMenuItem: MenuItem = {
    id: String(menuItems.length + 1),
    ...newMeal,
  };
  menuItems = [...menuItems, newMenuItem];
  listeners.forEach(listener => listener(menuItems));
};

export const subscribe = (listener: Listener) => {
  listeners.push(listener);
  // Return an unsubscribe function
  return () => {
    listeners = listeners.filter(l => l !== listener);
  };
};

export const removeMenuItem = (itemId: string) => {
  menuItems = menuItems.filter(item => item.id !== itemId);
  listeners.forEach(listener => listener(menuItems));
};