import { Routes, Route, Link, BrowserRouter } from "react-router-dom";
import Home from "./Home";
import Page from "./Page";
import BottomNavigation from "../organisms/BottomNavigationBar";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="page" element={<Page />} />
        </Routes>

        <Link to="/">Home</Link>
        <Link to="/page">Page</Link>
        <BottomNavigation />
      </BrowserRouter>
    </div>
  );
}

export default App;
