import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Upload from "./components/Upload";

export const routes = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/:id",
        element: <Upload />,
      },
    ],
  },
]);
