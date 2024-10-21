import { Routes, Route } from "react-router-dom";

// import HomePage from "./pages/HomePage";
import CRUD from "./pages/CRUD";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" Component={CRUD}></Route>
      </Routes>
    </div>
  );
}

export default App;
