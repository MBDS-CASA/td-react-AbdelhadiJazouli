import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import data from './data.json'

/**
 * Exemple d'import de la police "Poppins" depuis Google Fonts :
 * (À insérer dans votre index.html ou via <link>)
 *
 * <link rel="preconnect" href="https://fonts.gstatic.com" />
 * <link
 *   href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap"
 *   rel="stylesheet"
 * />
 *
 * Vous pouvez ensuite utiliser fontFamily: 'Poppins, sans-serif' dans vos styles.
 */

/**
 * Fonction utilitaire pour tirer un élément aléatoirement.
 */
function getRandomItem(array) {
  const randomIndex = Math.floor(Math.random() * array.length)
  return array[randomIndex]
}

/**
 * Composant Header
 * - Navbar fixe, police, couleurs améliorées
 */
function Header() {
  const handleMenuClick = (menuItem) => {
    alert(`Vous avez cliqué sur : ${menuItem}`)
  }

  // Styles de la navbar (fixe, en haut)
  const navbarStyle = {
    background: '#183d5d', // Bleu foncé
    color: '#ffffff',
    padding: '10px 24px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    position: 'fixed',
    width: '100%',   // Important : la navbar occupe la largeur
    top: 0,
    left: 0,
    zIndex: 999,
    fontFamily: 'Poppins, sans-serif',
  }

  const navLeftStyle = {
    display: 'flex',
    alignItems: 'center',
  }

  const brandStyle = {
    marginLeft: '8px',
    fontWeight: '600',
    fontSize: '1.4rem',
    cursor: 'default',
  }

  const menuListStyle = {
    listStyle: 'none',
    display: 'flex',
    gap: '16px',
    margin: 0,
    padding: 0,
  }

  const menuItemStyle = {
    cursor: 'pointer',
    padding: '8px 12px',
    borderRadius: '6px',
    transition: 'background-color 0.3s, color 0.3s',
  }

  // Gère le hover (onMouseEnter/onMouseLeave)
  const handleMouseEnter = (e) => {
    e.target.style.backgroundColor = '#2a567b' // Survol plus clair
  }
  const handleMouseLeave = (e) => {
    e.target.style.backgroundColor = 'transparent'
  }

  // On change la couleur du texte au clic (simple exemple) ?
  // Ici on se contente d'une alerte, déjà gérée.

  return (
    <header style={navbarStyle}>
      {/* Logo + Brand */}
      <div style={navLeftStyle}>
        <img
          src="C:\Users\hp\MyApps\td-react-AbdelhadiJazouli\tdreact\src\assets\universite-cote-dazur.jpeg"
          alt="Logo Formation"
          style={{
            width: '48px',
            height: '48px',
            borderRadius: '50%',
            objectFit: 'cover',
          }}
        />
        <span style={brandStyle}>React TD</span>
      </div>

      {/* Menu à droite */}
      <nav>
        <ul style={menuListStyle}>
          {['Notes', 'Etudiants', 'Matières', 'A propos'].map((item) => (
            <li
              key={item}
              style={menuItemStyle}
              onClick={() => handleMenuClick(item)}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              {item}
            </li>
          ))}
        </ul>
      </nav>
    </header>
  )
}

/**
 * Composant pour afficher un "item" sous forme de "card"
 */
function RandomDataItem({ item }) {
  if (!item) return <p style={{ fontFamily: 'Poppins, sans-serif' }}>Aucun élément à afficher</p>

  const { course, student, date, grade } = item
  const { firstname, lastname, id } = student

  // Style de la card
  const cardStyle = {
    borderRadius: '10px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
    padding: '16px',
    margin: '24px auto',
    maxWidth: '400px',
    backgroundColor: '#ffffff',
    textAlign: 'left',
    fontFamily: 'Poppins, sans-serif',
  }

  const titleStyle = {
    marginTop: 0,
    marginBottom: '8px',
    fontSize: '1.2rem',
    fontWeight: '600',
  }

  const paragraphStyle = {
    margin: '4px 0',
  }

  return (
    <div style={cardStyle}>
      <h3 style={titleStyle}>
        {firstname} {lastname} (ID: {id})
      </h3>
      <p style={paragraphStyle}>
        <strong>Course:</strong> {course}
      </p>
      <p style={paragraphStyle}>
        <strong>Date:</strong> {date}
      </p>
      <p style={paragraphStyle}>
        <strong>Grade:</strong> {grade}
      </p>
    </div>
  )
}

/**
 * Composant MainContent
 * - Date/heure courante
 * - Boutons stylés
 * - Tirage d'un élément aléatoire
 */
function MainContent({ count, setCount }) {
  // Date/heure
  const now = new Date()
  const jour = now.getDate()
  const mois = now.getMonth() + 1
  const annee = now.getFullYear()
  const heure = now.getHours()
  const minute = now.getMinutes()
  const seconde = now.getSeconds()

  // État pour l'élément aléatoire
  const [randomItem, setRandomItem] = useState(() => getRandomItem(data))

  const handleNewRandom = () => {
    setRandomItem(getRandomItem(data))
  }

  // Style de la zone principale (avec offset top à cause du header fixe)
  const mainContainerStyle = {
    textAlign: 'center',
    flex: 1,
    padding: '80px 20px 40px', // +80px pour laisser la navbar visible
    background: 'linear-gradient(to bottom, #e7eff7, #d5e0ec)',
    fontFamily: 'Poppins, sans-serif',
    minHeight: 'calc(100vh - 60px)',
  }

  const headingStyle = {
    fontSize: '2rem',
    fontWeight: '600',
    margin: '20px 0',
    color: '#183d5d',
  }

  const paragraphStyle = {
    maxWidth: '600px',
    margin: '0 auto 20px',
    lineHeight: '1.5',
    fontSize: '1rem',
    color: '#333333',
  }

  const buttonStyle = {
    padding: '12px 20px',
    fontSize: '1rem',
    border: 'none',
    borderRadius: '6px',
    backgroundColor: '#ff9f43',
    color: '#ffffff',
    cursor: 'pointer',
    marginTop: '20px',
    marginRight: '8px',
    transition: 'background-color 0.3s',
    fontWeight: '600',
  }

  const handleButtonHoverEnter = (e) => {
    e.target.style.backgroundColor = '#fbbb70'
  }
  const handleButtonHoverLeave = (e) => {
    e.target.style.backgroundColor = '#ff9f43'
  }

  const cardStyle = {
    display: 'inline-block',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0,0,0,0.15)',
    padding: '16px',
    marginTop: '16px',
    backgroundColor: '#ffffff',
  }

  const dateTimeStyle = {
    color: '#444444',
    fontSize: '1rem',
    marginBottom: '16px',
  }

  return (
    <main style={mainContainerStyle}>
      <p style={dateTimeStyle}>
        Bonjour, on est le {jour}/{mois}/{annee} et il est {heure}:{minute}:{seconde}
      </p>

      <div>
        <a href="https://vite.dev" target="_blank" rel="noreferrer">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank" rel="noreferrer">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>

      <h1 style={headingStyle}>Vite + React</h1>
      <p style={paragraphStyle}>
        Ici, nous afficherons des informations interessantes :)  
        (Ex: Tirage d’un élément aléatoire du JSON ci-dessous)
      </p>

      <div style={cardStyle}>
        <button
          onClick={() => setCount((prevCount) => prevCount + 1)}
          style={{ ...buttonStyle, marginTop: 0 }}
          onMouseEnter={handleButtonHoverEnter}
          onMouseLeave={handleButtonHoverLeave}
        >
          count is {count}
        </button>
        <p style={{ margin: '12px 0 0' }}>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>

      <p className="read-the-docs" style={{ marginTop: '20px', color: '#666666' }}>
        Click on the Vite and React logos to learn more
      </p>

      <button
        onClick={handleNewRandom}
        style={buttonStyle}
        onMouseEnter={handleButtonHoverEnter}
        onMouseLeave={handleButtonHoverLeave}
      >
        Obtenir un nouvel élément aléatoire
      </button>

      <RandomDataItem item={randomItem} />
    </main>
  )
}

/**
 * Composant Footer
 */
function Footer() {
  const now = new Date()
  const annee = now.getFullYear()

  const footerStyle = {
    textAlign: 'center',
    padding: '20px',
    backgroundColor: '#183d5d',
    color: '#ffffff',
    fontFamily: 'Poppins, sans-serif',
  }

  return (
    <footer style={footerStyle}>
      <p>© {annee} - Abdelhadi.Jazouli, Tous droits réservés.</p>
    </footer>
  )
}

/**
 * Composant principal App
 */
function App() {
  const [count, setCount] = useState(0)

  // Conteneur global : flex column
  const appContainerStyle = {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
    backgroundColor: '#f2f2f2',
    fontFamily: 'Poppins, sans-serif',
  }

  return (
    <div style={appContainerStyle}>
      <Header />
      <MainContent count={count} setCount={setCount} />
      <Footer />
    </div>
  )
}

export default App
