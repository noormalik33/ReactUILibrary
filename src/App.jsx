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
    else setIsScrollableModalOpen(true);
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
      
      <section>
        <h2 className="text-xl sm:text-2xl font-bold text-purple-600 mb-3 sm:mb-4 border-b-2 border-purple-600 text-center">Cards</h2>
        <div className={`cards-container ${isGridLayout ? 'grid-layout' : 'list-layout'}`}>
          <style>
            {`
              .grid-layout { 
                display: grid; 
                grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); 
                gap: 1rem; 
                padding: 0 1rem;
              }
              .list-layout { 
                display: flex; 
                flex-direction: column; 
                gap: 1rem; 
                padding: 0 1rem;
              }
              .card-image {
                width: 100%;
                height: 200px;
                object-fit: cover;
                border-radius: 8px;
                display: block;
              }
              @media (min-width: 640px) {
                .grid-layout { 
                  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); 
                  gap: 1.5rem; 
                }
              }
              @media (min-width: 1024px) {
                .grid-layout { 
                  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr)); 
                  gap: 2rem; 
                }
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
          <Card 
            title="Desert Card" 
            content={showDetails["Desert Card"] ? "Details: Vast dunes and unique desert flora." : "Explore the sandy expanses."}
            imageUrl="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80"
            videoUrl="https://www.sample-videos.com/video123/mp4/720/big_buck_bunny_720p_6mb.mp4"
            actions={
              <>
                <Button variant="secondary" size="small" onClick={() => openModalForCard("Desert Card")} disabled={areCardsDisabled}><FaEye /> Show Details</Button>
                <Button variant="outline" size="small" onClick={() => toggleCardDetails("Desert Card")} disabled={areCardsDisabled}><FaShareAlt /> Toggle Details</Button>
                <Button variant="danger" size="small" onClick={() => alert("Liked Desert Card!")} disabled={areCardsDisabled}><FaHeart /> Like</Button>
              </>
            }
            linkUrl="https://www.nps.gov/deserts"
          />
          <Card 
            title="Forest Card" 
            content={showDetails["Forest Card"] ? "Details: Dense woods and wildlife habitats." : "Immerse in lush greenery."}
            imageUrl="https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=800&q=80"
            videoUrl="https://www.sample-videos.com/video123/mp4/720/big_buck_bunny_720p_7mb.mp4"
            actions={
              <>
                <Button variant="primary" size="small" onClick={() => openModalForCard("Forest Card")} disabled={areCardsDisabled}><FaEye /> View Info</Button>
                <Button variant="outline" size="small" onClick={() => toggleCardDetails("Forest Card")} disabled={areCardsDisabled}><FaShareAlt /> Toggle Details</Button>
                <Button variant="danger" size="small" onClick={() => alert("Liked Forest Card!")} disabled={areCardsDisabled}><FaHeart /> Like</Button>
              </>
            }
            linkUrl="https://www.worldwildlife.org/habitats/forests"
          />
          <Card 
            title="Ocean Card" 
            content={showDetails["Ocean Card"] ? "Details: Deep waters and marine life." : "Dive into ocean beauty."}
            imageUrl="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80"
            videoUrl="https://www.sample-videos.com/video123/mp4/720/big_buck_bunny_720p_8mb.mp4"
            actions={
              <>
                <Button variant="secondary" size="small" onClick={() => openModalForCard("Ocean Card")} disabled={areCardsDisabled}><FaEye /> Show Details</Button>
                <Button variant="outline" size="small" onClick={() => toggleCardDetails("Ocean Card")} disabled={areCardsDisabled}><FaShareAlt /> Toggle Details</Button>
                <Button variant="danger" size="small" onClick={() => alert("Liked Ocean Card!")} disabled={areCardsDisabled}><FaHeart /> Like</Button>
              </>
            }
            linkUrl="https://www.oceanconservancy.org"
          />
          <Card 
            title="Urban Park Card" 
            content={showDetails["Urban Park Card"] ? "Details: City oases with green spaces." : "Relax in urban parks."}
            imageUrl="https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=800&q=80"
            videoUrl="https://www.sample-videos.com/video123/mp4/720/big_buck_bunny_720p_9mb.mp4"
            actions={
              <>
                <Button variant="primary" size="small" onClick={() => openModalForCard("Urban Park Card")} disabled={areCardsDisabled}><FaEye /> View Info</Button>
                <Button variant="outline" size="small" onClick={() => toggleCardDetails("Urban Park Card")} disabled={areCardsDisabled}><FaShareAlt /> Toggle Details</Button>
                <Button variant="danger" size="small" onClick={() => alert("Liked Urban Park Card!")} disabled={areCardsDisabled}><FaHeart /> Like</Button>
              </>
            }
            linkUrl="https://www.tpl.org/our-work/parks"
          />
          <Card 
            title="Sunset Card" 
            content={showDetails["Sunset Card"] ? "Details: Vibrant skies at dusk." : "Enjoy stunning sunsets."}
            imageUrl="https://images.unsplash.com/photo-1503803548695-c2a7b4a5b875?auto=format&fit=crop&w=800&q=80"
            videoUrl="https://www.sample-videos.com/video123/mp4/720/big_buck_bunny_720p_10mb.mp4"
            actions={
              <>
                <Button variant="secondary" size="small" onClick={() => openModalForCard("Sunset Card")} disabled={areCardsDisabled}><FaEye /> Show Details</Button>
                <Button variant="outline" size="small" onClick={() => toggleCardDetails("Sunset Card")} disabled={areCardsDisabled}><FaShareAlt /> Toggle Details</Button>
                <Button variant="danger" size="small" onClick={() => alert("Liked Sunset Card!")} disabled={areCardsDisabled}><FaHeart /> Like</Button>
              </>
            }
            linkUrl="https://www.nationalgeographic.com/travel/article/sunset"
          />
          <Card 
            title="Wildlife Card" 
            content={showDetails["Wildlife Card"] ? "Details: Diverse animals in their habitats." : "Discover wildlife wonders."}
            imageUrl="https://images.unsplash.com/photo-1474511320723-9a56873867b5?auto=format&fit=crop&w=800&q=80"
            videoUrl="https://www.sample-videos.com/video123/mp4/720/big_buck_bunny_720p_11mb.mp4"
            actions={
              <>
                <Button variant="primary" size="small" onClick={() => openModalForCard("Wildlife Card")} disabled={areCardsDisabled}><FaEye /> View Info</Button>
                <Button variant="outline" size="small" onClick={() => toggleCardDetails("Wildlife Card")} disabled={areCardsDisabled}><FaShareAlt /> Toggle Details</Button>
                <Button variant="danger" size="small" onClick={() => alert("Liked Wildlife Card!")} disabled={areCardsDisabled}><FaHeart /> Like</Button>
              </>
            }
            linkUrl="https://www.nwf.org"
          />
          <Card 
            title="Space Card" 
            content={showDetails["Space Card"] ? "Details: Stars, planets, and galaxies." : "Explore the cosmos."}
            imageUrl="https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80"
            videoUrl="https://www.sample-videos.com/video123/mp4/720/big_buck_bunny_720p_12mb.mp4"
            actions={
              <>
                <Button variant="secondary" size="small" onClick={() => openModalForCard("Space Card")} disabled={areCardsDisabled}><FaEye /> Show Details</Button>
                <Button variant="outline" size="small" onClick={() => toggleCardDetails("Space Card")} disabled={areCardsDisabled}><FaShareAlt /> Toggle Details</Button>
                <Button variant="danger" size="small" onClick={() => alert("Liked Space Card!")} disabled={areCardsDisabled}><FaHeart /> Like</Button>
              </>
            }
            linkUrl="https://www.nasa.gov"
          />
          <Card 
            title="Waterfall Card" 
            content={showDetails["Waterfall Card"] ? "Details: Cascading waters in serene settings." : "Marvel at majestic waterfalls."}
            imageUrl="https://images.unsplash.com/photo-1516796181074-bf453fbfa3e6?auto=format&fit=crop&w=800&q=80"
            videoUrl="https://www.sample-videos.com/video123/mp4/720/big_buck_bunny_720p_13mb.mp4"
            actions={
              <>
                <Button variant="primary" size="small" onClick={() => openModalForCard("Waterfall Card")} disabled={areCardsDisabled}><FaEye /> View Info</Button>
                <Button variant="outline" size="small" onClick={() => toggleCardDetails("Waterfall Card")} disabled={areCardsDisabled}><FaShareAlt /> Toggle Details</Button>
                <Button variant="danger" size="small" onClick={() => alert("Liked Waterfall Card!")} disabled={areCardsDisabled}><FaHeart /> Like</Button>
              </>
            }
            linkUrl="https://www.worldwaterfalldatabase.com"
          />
          <Card 
            title="Countryside Card" 
            content={showDetails["Countryside Card"] ? "Details: Rolling hills and peaceful fields." : "Relax in the countryside."}
            imageUrl="https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?auto=format&fit=crop&w=800&q=80"
            videoUrl="https://www.sample-videos.com/video123/mp4/720/big_buck_bunny_720p_14mb.mp4"
            actions={
              <>
                <Button variant="secondary" size="small" onClick={() => openModalForCard("Countryside Card")} disabled={areCardsDisabled}><FaEye /> Show Details</Button>
                <Button variant="outline" size="small" onClick={() => toggleCardDetails("Countryside Card")} disabled={areCardsDisabled}><FaShareAlt /> Toggle Details</Button>
                <Button variant="danger" size="small" onClick={() => alert("Liked Countryside Card!")} disabled={areCardsDisabled}><FaHeart /> Like</Button>
              </>
            }
            linkUrl="https://www.ruraltourism.com"
          />
          <Card 
            title="Historic Card" 
            content={showDetails["Historic Card"] ? "Details: Ancient ruins and cultural heritage." : "Discover historic landmarks."}
            imageUrl="https://images.unsplash.com/photo-1499856871958-5b9627545d1a?auto=format&fit=crop&w=800&q=80"
            videoUrl="https://www.sample-videos.com/video123/mp4/720/big_buck_bunny_720p_15mb.mp4"
            actions={
              <>
                <Button variant="primary" size="small" onClick={() => openModalForCard("Historic Card")} disabled={areCardsDisabled}><FaEye /> View Info</Button>
                <Button variant="outline" size="small" onClick={() => toggleCardDetails("Historic Card")} disabled={areCardsDisabled}><FaShareAlt /> Toggle Details</Button>
                <Button variant="danger" size="small" onClick={() => alert("Liked Historic Card!")} disabled={areCardsDisabled}><FaHeart /> Like</Button>
              </>
            }
            linkUrl="https://www.unesco.org"
          />
        </div>
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
              <p>A spicy garlic chutney with a tang kick.</p>
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
            footer={<p>{selectedCard === "Preview" ? "This is a sample preview! Close to exit." : "Explore more Pakistani flavors! Close to exit."}</p>}
            size="large"
          >
            <div style={{ padding: '20px' }}>
              {selectedCard === "Preview" ? (
                <Card 
                  title="Sample Landscape Card"
                  content="A breathtaking view of a serene valley, perfect for nature lovers."
                  imageUrl="https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?auto=format&fit=crop&w=800&q=80"
                  actions={
                    <>
                      <Button variant="primary" size="small" onClick={() => alert("View full gallery!")}>
                        <FaEye /> View Gallery
                      </Button>
                      <Button variant="outline" size="small" onClick={() => alert("Share this view!")}>
                        <FaShareAlt /> Share
                      </Button>
                      <Button variant="danger" size="small" onClick={() => alert("Liked the view!")}>
                        <FaHeart /> Like
                      </Button>
                    </>
                  }
                  linkUrl="https://www.unsplash.com"
                />
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
        className={`w-full p-3 sm:p-4 md:p-5 ${
          theme === 'light' ? 'bg-gray-100 text-gray-800' : theme === 'dark' ? 'bg-gray-800 text-gray-100' : 'bg-mixed-accent text-text-mixed'
        } text-xs xs:text-sm sm:text-base font-inter fixed bottom-0 left-0 z-40 flex flex-col items-center gap-2 sm:gap-3 md:gap-4`}
      >
        <div className="flex flex-wrap justify-center items-center gap-2 xs:gap-3 sm:gap-4 md:gap-6 max-w-5xl mx-auto">
          <span className="text-center">Developed by</span>
          <a
            href="https://noor-malik-portfolio.netlify.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-mixed-accent transition-colors flex items-center gap-1 text-center whitespace-nowrap"
          >
            <FaBriefcase className="inline-block w-3 h-3 xs:w-4 xs:h-4 sm:w-5 sm:h-5" /> Noor Malik
          </a>
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
            className="hover:text-mixed-accent transition-colors flex items-center gap-1 text-center whitespace-nowrap"
          >
            <FaEnvelope className="inline-block w-3 h-3 xs:w-4 xs:h-4 sm:w-5 sm:h-5" /> Email
          </a>
          <a
            href="https://www.linkedin.com/in/noormalik56500/"
            className="hover:text-mixed-accent transition-colors flex items-center gap-1 text-center whitespace-nowrap"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaLinkedin className="inline-block w-3 h-3 xs:w-4 xs:h-4 sm:w-5 sm:h-5" /> LinkedIn
          </a>
          <a
            href="https://github.com/noormalik33"
            className="hover:text-mixed-accent transition-colors flex items-center gap-1 text-center whitespace-nowrap"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaGithub className="inline-block w-3 h-3 xs:w-4 xs:h-4 sm:w-5 sm:h-5" /> GitHub
          </a>
          <a
            href="https://www.youtube.com/@CoreITTech1"
            className="hover:text-mixed-accent transition-colors flex items-center gap-1 text-center whitespace-nowrap"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaYoutube className="inline-block w-3 h-3 xs:w-4 xs:h-4 sm:w-5 sm:h-5" /> YouTube
          </a>
          <a
            href="https://www.instagram.com/coreit.tech"
            className="hover:text-mixed-accent transition-colors flex items-center gap-1 text-center whitespace-nowrap"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaInstagram className="inline-block w-3 h-3 xs:w-4 xs:h-4 sm:w-5 sm:h-5" /> Instagram
          </a>
          <a
            href="https://www.facebook.com/share/1AmgLDUnc9/"
            className="hover:text-mixed-accent transition-colors flex items-center gap-1 text-center whitespace-nowrap"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaFacebook className="inline-block w-3 h-3 xs:w-4 xs:h-4 sm:w-5 sm:h-5" /> Facebook
          </a>
        </div>
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