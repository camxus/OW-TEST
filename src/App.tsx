import React, { Suspense } from "react";
import {
  Route,
  BrowserRouter,
  Routes,
} from "react-router-dom";
import Home from "@pages/Home";
import Details from "@pages/Details";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/:title_number" element={ <Details/>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
