import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import AppRouter from "./app-router/AppRouter";
import AuthContextProvider from "./contexts/AuthContext";
import BlogContextProvider from "./contexts/BlogContext";
import { ToastContainer } from "react-toastify";

const App = () => {  
  return (
    <div>
      <AuthContextProvider>
        <BlogContextProvider>
          <AppRouter />
          <ToastContainer />
        </BlogContextProvider>
      </AuthContextProvider>
    </div>
  );
};

export default App;