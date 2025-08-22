import React from "react";
import { Button } from "./Button";

function App() {
  return (
    <div className="p-4 space-x-2">
      <Button>Default</Button>
      <Button variant="destructive">Delete</Button>
      <Button variant="outline" size="sm">Small</Button>
      <Button variant="secondary" size="lg">Large</Button>
      <Button asChild>
        <a href="/signup">Sign Up</a>
      </Button>
    </div>
  );
}

export default App;
