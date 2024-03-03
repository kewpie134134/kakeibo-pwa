import { Routes, Route, BrowserRouter } from "react-router-dom";
import Input from "./Input";
import Note from "./Note";
import BottomNavigation from "../organisms/BottomNavigationBar";
import Calendar from "./Calendar";
import Graph from "./Graph";
import Settings from "./Settings";
import NotFound from "./NotFound";

const App: React.FC = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Input />} />
          <Route path="/input" element={<Input />} />
          <Route path="/note" element={<Note />} />
          <Route path="/calendar" element={<Calendar />} />
          <Route path="/graph" element={<Graph />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <BottomNavigation />
      </BrowserRouter>
    </div>
  );
};

export default App;
