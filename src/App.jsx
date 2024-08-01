import { useState } from 'react'
import viteLogo from '/vite.svg'
import './App.css'

import "modern-normalize";

// import { lazy, Suspense } from "react";


function App() {
  const [count, setCount] = useState(0)

  return (
    // <Suspense fallback={<div>Loading...</div>}>
    //   <Routes>
    //     <Route path="/some-path" element={<MyComponent />} />
    //     {/* Інші маршрути */}
    //   </Routes>
    // </Suspense>
    <>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
    </>
  )
}

export default App
