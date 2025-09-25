import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './componentes/Navbar';
import Tarefas from './pages/Tarefas';
import Favoritos from './pages/Favoritos';


function App() {
  return (
    <>
      <Navbar />
      <main className="container">
        <Routes>
          <Route path="/" element={<Tarefas />} />
          <Route path="/favoritos" element={<Favoritos />} />
        </Routes>
      </main>
    </>
  );
}

export default App;