import "./App.css";
import Header from "./components/Header";
import NotesListPage from "./pages/NotesListPage";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import NotePage from "./pages/NotePage";

function App() {
  return (
    <Router>
      <div className="container ">
        <div className="app">
          <Header></Header>
          <Routes>
            <Route path="/" element={<NotesListPage></NotesListPage>}></Route>
            <Route path="/note/:id" element={<NotePage></NotePage>}></Route>
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
