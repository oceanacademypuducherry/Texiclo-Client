import "../App.css";
import { RouterProvider } from "react-router-dom";

import { Provider } from "react-redux";
import { store } from "./store";
import Dispatcher from "../common/Dispatcher";
import { router } from "../router/router";
function App() {
  console.log("🖥️ App component rendered");

  return (
    // <Provider store={store}>
      // <Dispatcher>
        <RouterProvider router={router} />
      // {/* </Dispatcher> */}
    // </Provider>
  );
}

export default App;
