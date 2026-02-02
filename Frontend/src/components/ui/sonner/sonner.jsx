import { useTheme } from "next-themes";
import { Toaster as SonnerLib } from "sonner";
import "./sonner.css";

const Toaster = ({ ...props }) => {
  const { theme = "system" } = useTheme();

  return (
    <SonnerLib
      theme={theme}
      className="toaster"
      toastOptions={{
        classNames: {
          toast: "toast",
          description: "description",
          actionButton: "actionButton",
          cancelButton: "cancelButton",
        },
      }}
      {...props}
    />
  );
};

export { Toaster };
