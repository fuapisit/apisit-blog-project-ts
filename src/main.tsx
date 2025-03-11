import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'

function App() {
  return (
    <div className="text-3xl font-bold text-blue-500">
      Hello Tailwind!
    </div>
  )
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
