import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
  useSearchParams
} from "react-router-dom";
import App from "./App";
import TTT from "./TTT";

const rootElement = document.getElementById("root");

const PageSelector = () => {
  let [searchParams] = useSearchParams();
  return searchParams.has("ttt") ? <TTT /> : <App />;
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <PageSelector />
  }
]);

if (rootElement) {
  const root = createRoot(rootElement);

  root.render(<RouterProvider router={router} />);
}
