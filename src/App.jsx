import React, { useState, useContext } from 'react';
import './App.css';
import Button from './components/Button/Button';
import Card from './components/Card/Card';
import Modal from './components/Modal/Modal';
import { FaHeart, FaShareAlt, FaEye, FaTimes, FaSpinner, FaBriefcase, FaLinkedin, FaGithub, FaYoutube, FaInstagram, FaFacebook, FaEnvelope } from 'react-icons/fa';
import { ThemeContext, ThemeProvider } from './ThemeContext';

function AppContent() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSecondModalOpen, setIsSecondModalOpen] = useState(false);
  const [isScrollableModalOpen, setIsScrollableModalOpen] = useState(false);
  const { theme, setTheme } = useContext(ThemeContext);
  const [selectedCard, setSelectedCard] = useState(null);
  const [showDetails, setShowDetails] = useState({});
  const [counter, setCounter] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [areCardsDisabled, setAreCardsDisabled] = useState(false);
  const [isGridLayout, setIsGridLayout] = useState(true);

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : theme === 'dark' ? 'mixed' : 'light');
  };

  const openModalForCard = (cardTitle) => {
    setSelectedCard(cardTitle);
    if (cardTitle === "Nature Card") setIsModalOpen(true);
    else if (cardTitle === "City Card") setIsSecondModalOpen(true);
    else if (cardTitle === "Mountain Card" || cardTitle === "Beach Card") setIsScrollableModalOpen(true);
  };

  const toggleCardDetails = (cardTitle) => {
    setShowDetails(prev => ({ ...prev, [cardTitle]: !prev[cardTitle] }));
  };

  const simulateAsyncTask = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      alert('Async task completed!');
    }, 2000);
  };

  const toggleCardsDisabled = () => {
    setAreCardsDisabled(!areCardsDisabled);
  };

  const clearAllStates = () => {
    setIsModalOpen(false);
    setIsSecondModalOpen(false);
    setIsScrollableModalOpen(false);
    setShowDetails({});
    setCounter(0);
    setIsLoading(false);
    setAreCardsDisabled(false);
    setIsGridLayout(true);
    alert('All states cleared!');
  };

  const openPreviewModal = () => {
    setIsSecondModalOpen(true);
    setSelectedCard("Preview");
  };

  const toggleLayout = () => {
    setIsGridLayout(!isGridLayout);
  };

  const incrementCounter = () => {
    setCounter(prev => prev + 1);
  };

  const recipeSteps = {
    "Mutton Pulao": "1. Marinate mutton with spices. 2. Cook rice with broth. 3. Serve hot.",
    "Lahsun ki Chutney": "1. Blend garlic with chilies. 2. Add salt and vinegar. 3. Mix well.",
    "Chicken Karahi": "1. Stir-fry chicken with tomatoes. 2. Add spices and cook. 3. Garnish with cilantro.",
    "Seekh Kabab": "1. Mix minced meat with spices. 2. Shape into skewers. 3. Grill until done.",
    "Butter Chicken": "1. Marinate chicken. 2. Cook in tomato-butter sauce. 3. Simmer and serve.",
    "Nihari": "1. Slow-cook beef with spices. 2. Thicken with flour. 3. Serve with naan."
  };

  return (
    <div className={`App ${theme}`}>
      <h1 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-purple-500 to-blue-600 bg-clip-text text-transparent shadow-lg mb-6 sm:mb-8 text-center transition-transform duration-300 hover:scale-105">React UI Library App</h1>
      
      <section>
        <h2 className="text-xl sm:text-2xl font-bold text-purple-600 mb-3 sm:mb-4 border-b-2 border-purple-600 text-center">Buttons</h2>
        <div className="flex flex-col sm:flex-row flex-wrap gap-2 sm:gap-4 justify-center">
          <Button variant="primary" size="large" icon={<FaHeart />} tooltip="Switch theme" onClick={toggleTheme}>
            Toggle Theme
          </Button>
          <Button variant="secondary" loading={isLoading} icon={<FaSpinner />} tooltip="Simulate an async task" onClick={simulateAsyncTask}>
            Simulate Async Task
          </Button>
          <Button variant="danger" tooltip="Toggle card interactions" onClick={toggleCardsDisabled}>
            Toggle All Cards
          </Button>
          <Button variant="info" tooltip="Reset all demo states" onClick={clearAllStates}>
            Clear All States
          </Button>
          <Button variant="primary" tooltip="Increment counter" onClick={incrementCounter}>
            Increase Counter (Count: {counter})
          </Button>
          <Button variant="secondary" tooltip="Preview a modal" onClick={openPreviewModal}>
            Preview Modal
          </Button>
          <Button variant="success" tooltip="Switch between grid and list layout" onClick={toggleLayout}>
            Switch Layout
          </Button>
        </div>
      </section>
      
      <section className={`cards-container ${isGridLayout ? 'grid-layout' : 'list-layout'}`}>
        <style>
          {`
            .grid-layout { display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 1rem; }
            .list-layout { display: flex; flex-direction: column; gap: 1rem; }
            @media (min-width: 640px) {
              .grid-layout { grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 1.5rem; }
            }
            @media (min-width: 1024px) {
              .grid-layout { grid-template-columns: repeat(auto-fit, minmax(350px, 1fr)); gap: 2rem; }
            }
          `}
        </style>
        <Card 
          title="Nature Card" 
          content={showDetails["Nature Card"] ? "Details: Lush forests and rivers, ideal for hiking." : "Explore stunning landscapes."}
          imageUrl="https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=800&q=80"
          videoUrl="https://www.sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4"
          actions={
            <>
              <Button variant="secondary" size="small" onClick={() => openModalForCard("Nature Card")} disabled={areCardsDisabled}><FaEye /> Show Details</Button>
              <Button variant="outline" size="small" onClick={() => toggleCardDetails("Nature Card")} disabled={areCardsDisabled}><FaShareAlt /> Toggle Details</Button>
              <Button variant="danger" size="small" onClick={() => alert("Liked Nature Card!")} disabled={areCardsDisabled}><FaHeart /> Like</Button>
            </>
          }
          linkUrl="https://www.nationalgeographic.com/nature"
        />
        <Card 
          title="City Card" 
          content={showDetails["City Card"] ? "Details: Skyscrapers and cultural landmarks." : "Urban vibes and architecture."}
          imageUrl="https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=800&q=80"
          videoUrl="https://www.sample-videos.com/video123/mp4/720/big_buck_bunny_720p_2mb.mp4"
          actions={
            <>
              <Button variant="primary" size="small" onClick={() => openModalForCard("City Card")} disabled={areCardsDisabled}><FaEye /> View Info</Button>
              <Button variant="outline" size="small" onClick={() => toggleCardDetails("City Card")} disabled={areCardsDisabled}><FaShareAlt /> Toggle Details</Button>
              <Button variant="danger" size="small" onClick={() => alert("Liked City Card!")} disabled={areCardsDisabled}><FaHeart /> Like</Button>
            </>
          }
          linkUrl="https://www.timeout.com/cities"
        />
        <Card 
          title="Tech Card" 
          content={showDetails["Tech Card"] ? "Details: Cutting-edge gadgets and software." : "Innovative technology showcase."}
          imageUrl="https://images.unsplash.com/photo-1518773553398-650c184e0bb3?auto=format&fit=crop&w=800&q=80"
          videoUrl="https://www.sample-videos.com/video123/mp4/720/big_buck_bunny_720p_5mb.mp4"
          actions={
            <>
              <Button variant="outline" size="small" onClick={() => alert("Tech demo feature coming soon!")} disabled={areCardsDisabled}><FaEye /> Demo Feature</Button>
              <Button variant="secondary" size="small" onClick={() => toggleCardDetails("Tech Card")} disabled={areCardsDisabled}><FaShareAlt /> Toggle Details</Button>
              <Button variant="danger" size="small" onClick={() => alert("Liked Tech Card!")} disabled={areCardsDisabled}><FaHeart /> Like</Button>
            </>
          }
          linkUrl="https://www.techradar.com"
        />
        <Card 
          title="Abstract Card" 
          content={showDetails["Abstract Card"] ? "Details: Bold colors and modern art patterns." : "Modern abstract design with vibrant colors."}
          imageUrl="https://images.unsplash.com/photo-1418065460487-3e41a6c84dc5?auto=format&fit=crop&w=800&q=80"
          videoUrl="https://www.sample-videos.com/video123/mp4/720/big_buck_bunny_720p_3mb.mp4"
          actions={
            <>
              <Button variant="danger" size="small" onClick={() => alert("Abstract design preview!")} disabled={areCardsDisabled}><FaEye /> Preview Design</Button>
              <Button variant="outline" size="small" onClick={() => toggleCardDetails("Abstract Card")} disabled={areCardsDisabled}><FaShareAlt /> Toggle Details</Button>
              <Button variant="secondary" size="small" onClick={() => alert("Liked Abstract Card!")} disabled={areCardsDisabled}><FaHeart /> Like</Button>
            </>
          }
          linkUrl="https://www.behance.net/search/projects?search=abstract"
        />
        <Card 
          title="Mountain Card" 
          content={showDetails["Mountain Card"] ? "Details: Peaks perfect for climbing and skiing." : "Majestic mountain views."}
          imageUrl="https://images.unsplash.com/photo-1472214103451-9374bd1c798e?auto=format&fit=crop&w=800&q=80"
          videoUrl="https://www.sample-videos.com/video123/mp4/720/big_buck_bunny_720p_4mb.mp4"
          actions={
            <>
              <Button variant="secondary" size="small" onClick={() => openModalForCard("Mountain Card")} disabled={areCardsDisabled}><FaEye /> Show Details</Button>
              <Button variant="outline" size="small" onClick={() => toggleCardDetails("Mountain Card")} disabled={areCardsDisabled}><FaShareAlt /> Toggle Details</Button>
              <Button variant="danger" size="small" onClick={() => alert("Liked Mountain Card!")} disabled={areCardsDisabled}><FaHeart /> Like</Button>
            </>
          }
          linkUrl="https://www.nationalparks.org"
        />
        <Card 
          title="Beach Card" 
          content={showDetails["Beach Card"] ? "Details: Sandy shores and clear waters." : "Serene beach scenery."}
          imageUrl="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80"
          videoUrl="https://www.sample-videos.com/video123/mp4/720/big_buck_bunny_720p_5mb.mp4"
          actions={
            <>
              <Button variant="primary" size="small" onClick={() => openModalForCard("Beach Card")} disabled={areCardsDisabled}><FaEye /> View Info</Button>
              <Button variant="outline" size="small" onClick={() => toggleCardDetails("Beach Card")} disabled={areCardsDisabled}><FaShareAlt /> Toggle Details</Button>
              <Button variant="danger" size="small" onClick={() => alert("Liked Beach Card!")} disabled={areCardsDisabled}><FaHeart /> Like</Button>
            </>
          }
          linkUrl="https://www.beachguide.com"
        />
      </section>
      
      <section>
        <h2 className="text-xl sm:text-2xl font-bold text-purple-600 mb-3 sm:mb-4 border-b-2 border-purple-600 text-center">Modals</h2>
        <div className="flex flex-col sm:flex-row flex-wrap gap-2 sm:gap-4 justify-center">
          <Button onClick={() => setIsModalOpen(true)}>Open Small Modal</Button>
          <Modal 
            isOpen={isModalOpen} 
            onClose={() => setIsModalOpen(false)}
            videoBg="https://www.sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4"
            header={<h2>Modal Header - Pakistani Cookbook</h2>}
            footer={<p>Enjoy these traditional Pakistani recipes! Close to return.</p>}
            size="small"
          >
            <div style={{ padding: '20px' }}>
              <h3>Mutton Pulao Recipe</h3>
              <p>Aromatic rice cooked with tender mutton in a spiced broth.</p>
              <Button variant="outline" size="small" onClick={() => alert(recipeSteps["Mutton Pulao"])}><FaEye /> View Steps</Button>
              <Button variant="secondary" size="small" onClick={() => setIsModalOpen(false)}><FaTimes /> Close</Button>
              <h3>Lahsun ki Chutney Recipe</h3>
              <p>A spicy garlic chutney with a tangy kick.</p>
              <Button variant="outline" size="small" onClick={() => alert(recipeSteps["Lahsun ki Chutney"])}><FaEye /> View Steps</Button>
              <Button variant="secondary" size="small" onClick={() => setIsModalOpen(false)}><FaTimes /> Close</Button>
            </div>
          </Modal>

          <Button onClick={() => setIsSecondModalOpen(true)}>Open Large Modal</Button>
          <Modal 
            isOpen={isSecondModalOpen} 
            onClose={() => setIsSecondModalOpen(false)}
            videoBg="https://www.sample-videos.com/video123/mp4/720/big_buck_bunny_720p_2mb.mp4"
            header={<h2>{selectedCard === "Preview" ? "Preview Modal" : "Another Modal - Pakistani Cookbook"}</h2>}
            footer={<p>{selectedCard === "Preview" ? "This is a preview! Close to exit." : "Explore more Pakistani flavors! Close to exit."}</p>}
            size="large"
          >
            <div style={{ padding: '20px' }}>
              {selectedCard === "Preview" ? (
                <p>This is a sample modal preview. Use buttons to interact with the demo!</p>
              ) : (
                <>
                  <h3>Chicken Karahi Recipe</h3>
                  <p>A spicy, stir-fried chicken dish with tomatoes and green chilies.</p>
                  <Button variant="outline" size="small" onClick={() => alert(recipeSteps["Chicken Karahi"])}><FaEye /> View Steps</Button>
                  <Button variant="secondary" size="small" onClick={() => setIsSecondModalOpen(false)}><FaTimes /> Close</Button>
                  <h3>Seekh Kabab Recipe</h3>
                  <p>Juicy, spiced minced meat skewers grilled to perfection.</p>
                  <Button variant="outline" size="small" onClick={() => alert(recipeSteps["Seekh Kabab"])}><FaEye /> View Steps</Button>
                  <Button variant="secondary" size="small" onClick={() => setIsSecondModalOpen(false)}><FaTimes /> Close</Button>
                </>
              )}
            </div>
          </Modal>

          <Button onClick={() => setIsScrollableModalOpen(true)}>Open Scrollable Modal</Button>
          <Modal 
            isOpen={isScrollableModalOpen} 
            onClose={() => setIsScrollableModalOpen(false)}
            header={<h2>Scrollable Content Modal - Pakistani Cookbook</h2>}
            footer={<p>Discover more recipes! Scroll and close when done.</p>}
            size="medium"
          >
            <div style={{ padding: '20px' }}>
              <h3>Butter Chicken Recipe</h3>
              <p>A creamy tomato-based chicken curry with butter and spices.</p>
              <Button variant="outline" size="small" onClick={() => alert(recipeSteps["Butter Chicken"])}><FaEye /> View Steps</Button>
              <Button variant="secondary" size="small" onClick={() => setIsScrollableModalOpen(false)}><FaTimes /> Close</Button>
              <h3>Nihari Recipe</h3>
              <p>A slow-cooked beef stew with rich spices, a Pakistani classic.</p>
              <Button variant="outline" size="small" onClick={() => alert(recipeSteps["Nihari"])}><FaEye /> View Steps</Button>
              <Button variant="secondary" size="small" onClick={() => setIsScrollableModalOpen(false)}><FaTimes /> Close</Button>
              {Array.from({ length: 10 }).map((_, i) => <p key={i}>Line {i + 1}: Additional scrollable content.</p>)}
            </div>
          </Modal>
        </div>
      </section>
      
      <footer
        className={`w-full p-1 sm:p-2 md:p-4 ${
          theme === 'light' ? 'bg-gray-100 text-gray-800' : theme === 'dark' ? 'bg-gray-800 text-gray-100' : 'bg-mixed-accent text-text-mixed'
        } text-xs sm:text-sm flex flex-col sm:flex-row flex-wrap justify-center items-center gap-1 sm:gap-2 md:gap-3 font-inter fixed bottom-0 left-0 z-40`}
      >
        <span>Developed by </span>
        <a
          href="https://noor-malik-portfolio.netlify.app/"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-mixed-accent transition-colors flex items-center gap-1"
        >
          <FaBriefcase className="inline-block" />{' '} Noor Malik
        </a>
        <span className="hidden sm:inline"> | </span>
        <a
          href="mailto:noormalik56500@gmail.com"
          onClick={(e) => {
            e.preventDefault();
            if (/Mobi|Android/i.test(navigator.userAgent)) {
              window.location.href = 'mailto:noormalik56500@gmail.com';
            } else {
              window.open(
                'https://mail.google.com/mail/?view=cm&fs=1&to=noormalik56500@gmail.com',
                '_blank'
              );
            }
          }}
          className="hover:text-mixed-accent transition-colors flex items-center gap-1"
        >
          <FaEnvelope />{' '} Email
        </a>
        <span className="hidden sm:inline"> | </span>
        <a
          href="https://www.linkedin.com/in/noormalik56500/"
          className="hover:text-mixed-accent transition-colors flex items-center gap-1"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaLinkedin />{' '} LinkedIn
        </a>
        <span className="hidden sm:inline"> | </span>
        <a
          href="https://github.com/noormalik33"
          className="hover:text-mixed-accent transition-colors flex items-center gap-1"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaGithub />{' '} GitHub
        </a>
        <span className="hidden sm:inline"> | </span>
        <a
          href="https://www.youtube.com/@CoreITTech1"
          className="hover:text-mixed-accent transition-colors flex items-center gap-1"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaYoutube />{' '} YouTube
        </a>
        <span className="hidden sm:inline"> | </span>
        <a
          href="https://www.instagram.com/coreit.tech"
          className="hover:text-mixed-accent transition-colors flex items-center gap-1"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaInstagram />{' '} Instagram
        </a>
        <span className="hidden sm:inline"> | </span>
        <a
          href="https://www.facebook.com/share/1AmgLDUnc9/"
          className="hover:text-mixed-accent transition-colors flex items-center gap-1"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaFacebook />{' '} Facebook
        </a>
      </footer>
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

export default App;