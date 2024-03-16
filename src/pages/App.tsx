import { Routes, Route, BrowserRouter } from "react-router-dom";
import Input from "./Input";
import Note from "./Note";
import Calendar from "./Calendar";
import Graph from "./Graph";
import Settings from "./Settings";
import NotFound from "./NotFound";
import ResponsiveDrawer from "../organisms/ResponsiveDrawer";
import BottomNavigationBar from "../organisms/BottomNavigationBar";
import Register from "./Register";
import Login from "./Login";

const App: React.FC = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <ResponsiveDrawer>
          <Routes>
            {/* 認証関連ページ */}
            <Route path="/register/" element={<Register />} />
            <Route path="/login/" element={<Login />} />
            {/* 本ページ */}
            <Route path="/input/" element={<Input />} />
            <Route path="/note/" element={<Note />} />
            <Route path="/calendar/" element={<Calendar />} />
            <Route path="/graph/" element={<Graph />} />
            <Route path="/settings/" element={<Settings />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </ResponsiveDrawer>
        <BottomNavigationBar />
      </BrowserRouter>
    </div>
  );
};

export default App;
