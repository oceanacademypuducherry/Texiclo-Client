import "../App.css";
import { RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store";
import Dispatcher from "../common/Dispatcher";
import { router } from "../router/router";

// ✅ Import Toastify
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  console.log("🖥️ App component rendered");

  return (
    <Provider store={store}>
      <Dispatcher>
        <RouterProvider router={router} />
        {/* ✅ Add ToastContainer once globally */}
        <ToastContainer position="top-center" autoClose={3000} />
      </Dispatcher>
    </Provider>
  );
}

export default App;
