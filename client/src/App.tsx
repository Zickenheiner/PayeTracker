import { Outlet, useLocation } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import Header from "./components/Header";
import Navbar from "./components/Navbar";

function App() {
  const location = useLocation();
  return (
    <>
      {location.pathname !== "/login" && location.pathname !== "/register" && (
        <Header />
      )}
      <Outlet />
      {location.pathname !== "/login" && location.pathname !== "/register" && (
        <Navbar />
      )}
    </>
  );
}

export default App;
