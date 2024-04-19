import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/home";
import Movie from "./pages/movie";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="*" element={<h1>404</h1>} />
        <Route path="movie/:id" element={<Movie />} />
      </Routes>
    </div>
  );
}

export default App;
