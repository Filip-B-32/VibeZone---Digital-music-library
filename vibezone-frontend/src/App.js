import React from "react";
import "./App.css";
import HomePage from "./components/HomePage/HomePage";

function App() {
  return (
    <div className="App">
      <section className="wrapper">
        <div className="top">VibeZone</div>
        <div className="bottom" aria-hidden="true">
          VibeZone
        </div>
      </section>
      <HomePage />
    </div>
  );
}

export default App;