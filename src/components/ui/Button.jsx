import React from "react";

// Button Component
export const Button = ({ children, variant = "default", size = "md", asChild, ...props }) => {
  const className = `
    rounded-2xl px-4 py-2 font-medium shadow-md
    ${variant === "destructive" ? "bg-red-600 text-white" : ""}
    ${variant === "outline" ? "border border-gray-400" : ""}
    ${variant === "secondary" ? "bg-gray-200 text-black" : ""}
    ${variant === "default" ? "bg-blue-600 text-white" : ""}
    ${size === "sm" ? "text-sm px-2 py-1" : ""}
    ${size === "lg" ? "text-lg px-6 py-3" : ""}
  `;

  if (asChild) {
    return React.cloneElement(children, { className, ...props });
  }

  return (
    <button className={className} {...props}>
      {children}
    </button>
  );
};

// App Component
function App() {
  return (
    <div className="p-4 flex gap-4">
      <Button variant="default">Default</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="destructive">Destructive</Button>
      <Button size="sm">Small</Button>
      <Button size="lg">Large</Button>
    </div>
  );
}

export default App;
