import { Routes, Route } from "react-router-dom";
import { useState } from "react";
import { loadStore, saveStore } from "./utils"; // wherever you put helpers
import Home from "./pages/Home";
import Stats from "./pages/Stats";
import Redirect from "./pages/Redirect";
import Error from "./pages/Error";

export default function App() {
  const [store, setStore] = useState(() => loadStore());

  return (
    <Routes>
      <Route path="/" element={<Home store={store} setStore={setStore} />} />
      <Route path="/stats" element={<Stats store={store} />} />
      <Route path="/:slug" element={<Redirect store={store} setStore={setStore} />} />
      <Route path="/error" element={<Error />} />
    </Routes>
  );
}
