import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { RouterProvider } from "react-router-dom";
import router from "./routes/Routes.jsx";
import AuthProvider from "./Auth/AuthProvider.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ApiComponent from "./API/ApiComponent.jsx";
import { NavigationProvider } from "./Auth/NavigationContext.jsx";
import { DarkModeProvider } from "./Context/DarkModeContext.jsx";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <DarkModeProvider>
          
            <RouterProvider router={router}></RouterProvider>
       
        </DarkModeProvider>
      </AuthProvider>
    </QueryClientProvider>
  </StrictMode>
);
