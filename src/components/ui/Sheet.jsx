import * as React from "react";

// This is a placeholder to allow the build to succeed.
// You should replace this with the actual component from shadcn/ui
// by running `npx shadcn-ui@latest add sheet` in your terminal.

const Sheet = ({ children }) => <div>{children}</div>;
const SheetTrigger = ({ children }) => <div style={{ display: "contents" }}>{children}</div>;
const SheetContent = ({ children }) => <div>{children}</div>;
const SheetClose = ({ children }) => <div style={{ display: "contents" }}>{children}</div>;

export {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetClose,
};