import { useState, useCallback, useEffect, memo } from 'react';
import {
  FaBook,
  FaUserGraduate,
  FaChalkboardTeacher,
  FaInfoCircle
} from 'react-icons/fa';
import { IoIosRocket } from 'react-icons/io';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import data from './data.json';

// --------------------------------------------------------------------------------
// 1. Composants dédiés pour chaque item du menu
// --------------------------------------------------------------------------------
function Notes() {
  return <h2 style={{ textAlign: 'center' }}>Composant : Notes</h2>;
}

function Etudiants() {
  return <h2 style={{ textAlign: 'center' }}>Composant : Etudiants</h2>;
}

function Matieres() {
  return <h2 style={{ textAlign: 'center' }}>Composant : Matières</h2>;
}

function APropos() {
  return <h2 style={{ textAlign: 'center' }}>Composant : A propos</h2>;
}

// --------------------------------------------------------------------------------
// 2. Thèmes
// --------------------------------------------------------------------------------
const THEMES = {
  light: {
    primary: '#4facfe',
    secondary: '#00f2fe',
    accent: '#ff9f43',
    text: '#183d5d',
    background: '#f2f2f2',
    card: '#ffffff',
    hover: '#fbbb70'
  },
  dark: {
    primary: '#2a5298',
    secondary: '#1e3c72',
    accent: '#ff9f43',
    text: '#ffffff',
    background: '#1a1a1a',
    card: '#2d2d2d',
    hover: '#fbbb70'
  }
};

// --------------------------------------------------------------------------------
// 3. Génération de styles dynamiques (createStyles)
// --------------------------------------------------------------------------------
const createStyles = (theme) => ({
  app: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
    fontFamily: 'Poppins, sans-serif',
    backgroundColor: theme.background,
    color: theme.text,
    transition: 'all 0.3s ease',
  },
  navbar: {
    background: 'rgba(0,0,0,0.3)',
    padding: '10px 24px',
    position: 'sticky',
    top: 0,
    left: 0,
    zIndex: 9999,
    backdropFilter: 'blur(10px)',
  },
  navContent: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    maxWidth: '1200px',
    margin: '0 auto',
    '@media (max-width: 768px)': {
      flexDirection: 'column',
      alignItems: 'flex-start',
      gap: '16px',
    },
  },
  brand: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    color: 'white',
    fontSize: '1.3rem',
    fontWeight: '600',
    '@media (max-width: 480px)': {
      fontSize: '1.1rem',
    },
  },
  navList: {
    display: 'flex',
    gap: '24px',
    listStyle: 'none',
    margin: 0,
    padding: 0,
    '@media (max-width: 768px)': {
      flexDirection: 'column',
      width: '100%',
      gap: '16px',
    },
  },
  hero: {
    background: `linear-gradient(to bottom right, ${theme.primary}, ${theme.secondary})`,
    color: 'white',
    padding: '120px 20px 60px',
    textAlign: 'center',
    clipPath: 'ellipse(150% 100% at 50% 0%)',
    overflow: 'hidden',
    '@media (max-width: 768px)': {
      padding: '80px 20px 40px',
      clipPath: 'ellipse(180% 100% at 50% 0%)',
    },
    '@media (max-width: 480px)': {
      padding: '60px 10px 30px',
      clipPath: 'ellipse(200% 100% at 50% 0%)',
    },
  },
  mainContent: {
    padding: '40px 20px',
    background: theme.card,
    minHeight: '50vh',
    maxWidth: '1200px',
    margin: '0 auto',
    borderRadius: '20px',
    boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
    '@media (max-width: 768px)': {
      padding: '30px 16px',
    },
    '@media (max-width: 480px)': {
      padding: '24px 12px',
      borderRadius: '12px',
    },
  },
  card: {
    borderRadius: '12px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
    padding: '20px',
    margin: '24px auto',
    maxWidth: '400px',
    backgroundColor: theme.card,
    color: theme.text,
    transition: 'transform 0.3s',
    '@media (max-width: 480px)': {
      width: '100%',
      maxWidth: '100%',
      margin: '16px auto',
      padding: '16px',
    },
  },
  button: {
    padding: '12px 20px',
    fontSize: '1rem',
    border: 'none',
    borderRadius: '6px',
    backgroundColor: theme.accent,
    color: 'white',
    cursor: 'pointer',
    transition: 'all 0.3s',
    fontWeight: '600',
    '&:hover': {
      backgroundColor: theme.hover,
      transform: 'scale(1.05)'
    },
    '@media (max-width: 480px)': {
      width: '100%',
      padding: '12px',
    },
  },
  footer: {
    textAlign: 'center',
    padding: '20px',
    backgroundColor: theme.secondary,
    color: 'white',
    marginTop: 'auto',
    '@media (max-width: 768px)': {
      padding: '16px',
    },
    '@media (max-width: 480px)': {
      padding: '12px',
    },
  },
  themeToggle: {
    position: 'fixed',
    bottom: '20px',
    right: '20px',
    padding: '10px',
    borderRadius: '50%',
    backgroundColor: theme.accent,
    color: 'white',
    cursor: 'pointer',
    border: 'none',
    boxShadow: '0 2px 5px rgba(0,0,0,0.2)',
    zIndex: 1000,
    '@media (max-width: 480px)': {
      bottom: '10px',
      right: '10px',
      padding: '8px',
    },
  },
});

// --------------------------------------------------------------------------------
// 4. Custom Hooks (useTheme, useDateTime)
// --------------------------------------------------------------------------------
const useTheme = () => {
  const [theme, setTheme] = useState('light');
  
  const toggleTheme = useCallback(() => {
    setTheme(current => (current === 'light' ? 'dark' : 'light'));
  }, []);

  return { theme, toggleTheme, styles: createStyles(THEMES[theme]) };
};

const useDateTime = () => {
  const [dateTime, setDateTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setDateTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return dateTime;
};

// --------------------------------------------------------------------------------
// 5. Mémoisation : NavItem, AnimatedCard
// --------------------------------------------------------------------------------
const NavItem = memo(({ Icon, text, onClick, isActive }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <li
      style={{
        padding: '8px 16px',
        borderRadius: '8px',
        cursor: 'pointer',
        color: 'white',
        backgroundColor: isActive
          ? 'rgba(255,255,255,0.3)'
          : isHovered
            ? 'rgba(255,255,255,0.2)'
            : 'transparent',
        transition: 'all 0.3s ease',
        transform: isActive
          ? 'scale(1.07)'
          : isHovered
            ? 'scale(1.05)'
            : 'scale(1)',
        display: 'flex',
        alignItems: 'center',
        gap: '8px'
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => onClick(text)}
    >
      <Icon />
      {text}
    </li>
  );
});

const AnimatedCard = memo(({ children, style }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <div
      style={{
        ...style,
        transform: isHovered ? 'translateY(-5px)' : 'translateY(0)',
        transition: 'all 0.3s ease'
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {children}
    </div>
  );
});

// --------------------------------------------------------------------------------
// 6. Header : Menu dynamique (avec item actif)
// --------------------------------------------------------------------------------
function Header({ styles, activeItem, setActiveItem }) {
  // Menu d’items + icônes
  const menuItems = [
    { Icon: FaBook, text: 'Notes' },
    { Icon: FaUserGraduate, text: 'Etudiants' },
    { Icon: FaChalkboardTeacher, text: 'Matières' },
    { Icon: FaInfoCircle, text: 'A propos' }
  ];

  return (
    <header style={styles.navbar}>
      <div style={styles.navContent}>
        <div style={styles.brand}>
          <IoIosRocket size={32} />
          React TD
        </div>
        <nav>
          <ul style={styles.navList}>
            {menuItems.map((item) => (
              <NavItem
                key={item.text}
                Icon={item.Icon}
                text={item.text}
                // isActive si l'item du menu correspond à activeItem
                isActive={activeItem === item.text}
                onClick={setActiveItem}
              />
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}

// --------------------------------------------------------------------------------
// 7. DataCard : (existant)
// --------------------------------------------------------------------------------
function DataCard({ item, styles }) {
  if (!item) return null;

  const { course, student, date, grade } = item;
  const { firstname, lastname, id } = student;

  return (
    <AnimatedCard style={styles.card}>
      <h3 style={{ margin: '0 0 1rem' }}>
        {firstname} {lastname} (ID: {id})
      </h3>
      <div style={{ display: 'grid', gap: '0.5rem' }}>
        <p><strong>Course:</strong> {course}</p>
        <p><strong>Date:</strong> {date}</p>
        <p><strong>Grade:</strong> {grade}</p>
      </div>
    </AnimatedCard>
  );
}

// --------------------------------------------------------------------------------
// 8. MainContent : Rendu conditionnel selon l’activeItem
// --------------------------------------------------------------------------------
function MainContent({ count, setCount, styles, activeItem }) {
  const dateTime = useDateTime();
  const [randomItem, setRandomItem] = useState(() => getRandomItem(data));

  const handleNewRandom = useCallback(() => {
    setRandomItem(getRandomItem(data));
  }, []);

  // Choix du composant central en fonction de activeItem
  let content;
  switch (activeItem) {
    case 'Notes':
      content = <Notes />;
      break;
    case 'Etudiants':
      content = <Etudiants />;
      break;
    case 'Matières':
      content = <Matieres />;
      break;
    case 'A propos':
      content = <APropos />;
      break;
    default:
      content = <Notes />;
  }

  return (
    <main style={styles.mainContent}>
      {/* Date/heure */}
      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <time style={{ color: 'inherit', opacity: 0.8 }}>
          {dateTime.toLocaleString()}
        </time>
      </div>

      {/* Logos */}
      <div 
        style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          gap: '2rem', 
          marginBottom: '2rem',
          flexWrap: 'wrap'
        }}
      >
        <a href="https://vitejs.dev" target="_blank" rel="noreferrer">
          <img src={viteLogo} alt="Vite logo" style={{ height: '6em' }} />
        </a>
        <a href="https://react.dev" target="_blank" rel="noreferrer">
          <img 
            src={reactLogo} 
            alt="React logo" 
            style={{ 
              height: '6em',
              animation: 'spin 20s linear infinite'
            }} 
          />
        </a>
      </div>

      {/* Carte compteur */}
      <AnimatedCard style={styles.card}>
        <button onClick={() => setCount(c => c + 1)} style={styles.button}>
          count is {count}
        </button>
        <p style={{ marginTop: '1rem' }}>
          Éditez <code>src/App.jsx</code> et sauvegardez pour tester le HMR
        </p>
      </AnimatedCard>

      {/* Bouton + DataCard */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
        <button onClick={handleNewRandom} style={styles.button}>
          Obtenir un nouvel élément aléatoire
        </button>
        <DataCard item={randomItem} styles={styles} />
      </div>

      {/* Rendu conditionnel : Notes / Etudiants / Matières / A propos */}
      <div style={{ marginTop: '2rem' }}>
        {content}
      </div>
    </main>
  );
}

// --------------------------------------------------------------------------------
// 9. Footer
// --------------------------------------------------------------------------------
function Footer({ styles }) {
  return (
    <footer style={styles.footer}>
      <p>© {new Date().getFullYear()} - Abdelhadi.Jazouli, Tous droits réservés.</p>
    </footer>
  );
}

// --------------------------------------------------------------------------------
// 10. Utils
// --------------------------------------------------------------------------------
function getRandomItem(array) {
  return array[Math.floor(Math.random() * array.length)];
}

// --------------------------------------------------------------------------------
// 11. Composant principal App
// --------------------------------------------------------------------------------
function App() {
  const { theme, toggleTheme, styles } = useTheme();

  // Compteur existant
  const [count, setCount] = useState(0);

  // Nouvel état pour gérer l’item actif dans le menu
  const [activeItem, setActiveItem] = useState('Notes');

  return (
    <div style={styles.app}>
      <Header
        styles={styles}
        activeItem={activeItem}
        setActiveItem={setActiveItem}
      />
      
      <section style={styles.hero}>
        <IoIosRocket size={64} style={{ marginBottom: '16px' }} />
        <h1
          style={{
            fontWeight: 700,
            fontSize: '2.2rem',
            margin: '0 0 12px'
          }}
        >
          Bienvenue sur l'application React TD
        </h1>
        <p
          style={{
            maxWidth: '600px',
            margin: '0 auto',
            lineHeight: '1.5',
            fontSize: '1.1rem'
          }}
        >
          Explorez nos fonctionnalités avancées, testez l'interface réactive
          et apprenez-en plus sur React, Vite et l'intégration de librairies.
        </p>
      </section>

      <MainContent
        count={count}
        setCount={setCount}
        styles={styles}
        activeItem={activeItem}
      />
      
      <Footer styles={styles} />

      {/* Toggle theme */}
      <button
        onClick={toggleTheme}
        style={styles.themeToggle}
        aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
      >
        {theme === 'light' ? '🌙' : '☀️'}
      </button>
    </div>
  );
}

export default App;
