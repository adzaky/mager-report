"use client";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "./button";

const ThemeToggle = () => {
  const { setTheme, theme } = useTheme();

  return (
    <Button
      isIconOnly
      variant="outline"
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      className="ml-auto px-3 py-2"
    >
      {theme === "light" ? <Sun className="size-4" /> : <Moon className="size-4" />}
    </Button>
  );
};
export default ThemeToggle;
