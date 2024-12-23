import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

/**
 * Composant Header
 */
function Header() {
  return (
    <header style={{ textAlign: 'center', margin: '20px 0' }}>
      {/* Remplace l'URL ci-dessous par ton propre logo de formation, si besoin */}
      <img
        src="C:\Users\hp\MyApps\td-react-AbdelhadiJazouli\tdreact\src\assets\universite-cote-dazur.jpeg"
        alt="Logo Formation"
        style={{ display: 'block', margin: '0 auto 20px' }}
      />
      <h1>Abdelhadi Jazouli</h1>
      <h2>A la découverte des premières notions de React</h2>
    </header>
  )
}

/**
 * Composant MainContent
 * - Contient l'exemple Vite/React (bouton, images, compteur)
 * - Ajoute la phrase demandée
 */
function MainContent({ count, setCount }) {
  return (
    <main style={{ textAlign: 'center' }}>
      {/* Liens vers la doc Vite et React */}
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>

      <h1>Vite + React</h1>
      {/* Phrase demandée dans le TD */}
      <p>Ici, nous afficherons des informations interessantes :)</p>

      <div className="card">
        <button onClick={() => setCount((prevCount) => prevCount + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>

      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </main>
  )
}

/**
 * Composant Footer
 */
function Footer() {
  return (
    <footer style={{ textAlign: 'center', marginTop: '20px' }}>
      <p>Tous droits réservés - [Nom] [Prénom]</p>
    </footer>
  )
}

/**
 * Composant principal App
 */
function App() {
  const [count, setCount] = useState(0)

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header />
      {/* MainContent gère la logique du compteur via les props */}
      <MainContent count={count} setCount={setCount} />
      <Footer />
    </div>
  )
}

export default App
