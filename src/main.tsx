import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import ErrorBoundary from "./components/ErrorBoundary.tsx";
import "./smartlook-loader"; // Import for side-effects (auto-init in production)

const root = createRoot(document.getElementById("root")!);

root.render(
  <ErrorBoundary>
    <App />
  </ErrorBoundary>
);
