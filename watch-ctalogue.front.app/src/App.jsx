import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AddProductForm from "./components/AddProductForm";
import WatchProductList from "./components/WatchProductList";
import Home from "./components/Home";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/add-product" element={<AddProductForm />} />
          <Route path="/view-products" element={<WatchProductList />} />
          <Route path="/" element={<Home />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;