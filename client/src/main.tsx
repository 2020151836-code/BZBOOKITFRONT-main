import { UNAUTHED_ERR_MSG } from '@shared/const';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createRoot } from "react-dom/client";
import App from "./App";
import { getLoginUrl } from "./const";
import "./index.css";

// -------------------------------
// Query Client + Global Error Handler
// -------------------------------

const queryClient = new QueryClient();

const redirectToLoginIfUnauthorized = (error: any) => {
  if (!error || typeof window === "undefined") return;

  const isUnauthorized =
    error?.message === UNAUTHED_ERR_MSG ||
    error?.status === 401 ||
    error?.response?.status === 401;

  if (isUnauthorized) {
    window.location.href = getLoginUrl();
  }
};

// Query Error Handler
queryClient.getQueryCache().subscribe((event) => {
  if (event.type === "updated" && event.action.type === "error") {
    const error = event.query.state.error;
    redirectToLoginIfUnauthorized(error);
    console.error("[API Query Error]", error);
  }
});

// Mutation Error Handler
queryClient.getMutationCache().subscribe((event) => {
  if (event.type === "updated" && event.action.type === "error") {
    const error = event.mutation.state.error;
    redirectToLoginIfUnauthorized(error);
    console.error("[API Mutation Error]", error);
  }
});

// -------------------------------
// Render
// -------------------------------

createRoot(document.getElementById("root")!).render(
  <QueryClientProvider client={queryClient}>
    <App />
  </QueryClientProvider>
);
