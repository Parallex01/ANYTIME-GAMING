import React, { useEffect, useState } from "react";
import "./App.css";

const pages = ["home", "about", "services", "games", "contact"];

const getTodayDate = () => {
  const today = new Date();
  today.setMinutes(today.getMinutes() - today.getTimezoneOffset());
  return today.toISOString().slice(0, 10);
};

const getPageFromHash = () => {
  const hash = window.location.hash.slice(1).toLowerCase();
  const page = hash === "pricing" ? "services" : hash;
  return pages.includes(page) ? page : "home";
};

const services = [
  {
    name: "PC GAMING",
    price: "₹80",
    detail: "High-performance gaming PCs",
    image:
      "https://i.pinimg.com/736x/d1/d9/14/d1d914efabd1c49c4318ed7310eff0f2.jpg",
  },
  {
    name: "PS4 GAMING",
    price: "₹100",
    detail: "Console gaming with friends",
    image:
      "https://i.pinimg.com/1200x/46/f2/42/46f24237e05ea9d2fb80f4064225732a.jpg",
  },
  {
    name: "PS5 GAMING",
    price: "₹120",
    detail: "Next-generation gaming",
    image:
      "https://i.pinimg.com/736x/24/28/f0/2428f01bb5ae0a7f746ddf745571f996.jpg",
  },
  {
    name: "RACING SIMULATOR",
    price: "₹150",
    detail: "Experience realistic racing",
    image:
      "https://i.pinimg.com/736x/2b/c3/c8/2bc3c82014b35ce8dba996327726c4f1.jpg",
  },
  {
    name: "VR GAMING",
    price: "₹200",
    detail: "Enter a virtual world",
    image:
      "https://i.pinimg.com/1200x/bb/56/c3/bb56c3db04b3cf99efb6ae49cf8991fa.jpg",
  },
];

const games = [
  {
    name: "ASPHALT",
    genre: "Racing",
    platforms: ["PC", "PS4", "PS5", "Racing Simulator"],
    description: "Race through vibrant city streets, master sharp turns, and chase the finish line at full speed.",
    image:
      "https://cdn.corenexis.com/f/xvR5b8WX.png",
  },
  {
    name: "WARZONE",
    genre: "Action",
    platforms: ["PC", "PS4", "PS5"],
    description: "Drop into a large-scale battlefield, gear up with your squad, and fight to be the last team standing.",
    image:
      "https://cdn.corenexis.com/f/U6Y3Rw4d.png",
  },
  {
    name: "GTA V",
    genre: "Open World",
    platforms: ["PC", "PS4", "PS5"],
    description: "Explore a sprawling city, take on daring missions, and make your own path through Los Santos.",
    image:
      "https://cdn.corenexis.com/f/W8RcQaTz.png",
  },
  {
    name: "RDR2",
    genre: "Adventure",
    platforms: ["PC", "PS4"],
    description: "Journey across a vast frontier in a story of outlaws, wild landscapes, and life on the run.",
    image:
      "https://cdn.corenexis.com/f/ZsZhMQ7n.png",
  },
  {
    name: "FREE FIRE",
    genre: "Battle Royale",
    platforms: ["PC"],
    description: "Land, collect gear, and outlast your rivals in quick-paced survival matches.",
    image:
      "https://i.pinimg.com/736x/d2/e4/d4/d2e4d46ce9b1cc9c37953c908a6e5dc4.jpg",
  },
  {
    name: "MINECRAFT",
    genre: "Adventure",
    platforms: ["PC", "PS4", "PS5"],
    description: "Build anything you can imagine, explore blocky worlds, and survive your own adventures.",
    image:
      "https://i.pinimg.com/736x/9a/31/16/9a3116733571bb94a1c57220400f747a.jpg",
  },
  {
    name: "PUBG",
    genre: "Battle Royale",
    platforms: ["PC", "PS4", "PS5"],
    description: "Search for supplies, plan your next move, and compete to survive as the play zone closes in.",
    image:
      "https://i.pinimg.com/736x/3d/6e/97/3d6e973dbc5062b97facc26016f1b5ba.jpg",
  },
  {
    name: "CALL OF DUTY MOBILE",
    genre: "Shooter",
    platforms: ["PC", "PS4", "PS5"],
    description: "Jump into fast-paced combat, coordinate with your team, and take on tactical missions.",
    image:
      "https://i.pinimg.com/236x/cd/fe/2e/cdfe2e5953dad361e79d87f080adf30e.jpg",
  },
  {
    name: "FC-27",
    genre: "Sports",
    platforms: ["PC", "PS4", "PS5"],
    description: "Build your dream lineup, control every pass, and compete for a memorable match-day win.",
    image:
      "https://i.pinimg.com/736x/93/6b/04/936b0450205a520ee07d7c56670fd41e.jpg",
  },
  {
    name: "NEED FOR SPEED",
    genre: "Racing",
    platforms: ["PC", "PS4", "PS5", "Racing Simulator"],
    description: "Tune your ride, hit the streets, and leave the competition behind in high-speed races.",
    image:
      "https://i.pinimg.com/736x/63/b6/78/63b678e0eebfb94ba57a5be14492650f.jpg",
  },
   {
    name: " Valorant ",
    genre: "Tactical Shooter",
    platforms: ["PC", "PS4", "PS5", "Racing Simulator"],
    description: "Engage in team-based tactical combat, master unique agent abilities, and secure victory through strategy and precision.",
    image:
      "https://i.pinimg.com/736x/79/aa/f7/79aaf76e647b1eac1329b41a661ab60d.jpg",
  },
  { name: "COUNTER-STRIKE 2", genre: "Tactical Shooter", platforms: ["PC"],
    description: "Join the fight in intense tactical battles, coordinate with your team, and outsmart opponents in classic counter-terrorist missions.",
    image:
      "https://i.pinimg.com/1200x/5c/72/18/5c7218fb96e67ec06e225ca60bdb8d46.jpg",
   },
  { name: "FORTNITE", genre: "Battle Royale", platforms: ["PC", "PS4", "PS5"] ,
    description : "Drop into a vibrant world, build structures, and compete to be the last player standing in this popular battle royale game.",
    image:
      "https://i.pinimg.com/736x/7e/e8/c4/7ee8c4361736ed806711ae99f7d6762c.jpg",
  },
  { name: "APEX LEGENDS", genre: "Battle Royale", platforms: ["PC", "PS4", "PS5"],
    description: "Form squads, choose unique legends, and engage in fast-paced battles to claim victory in this action-packed battle royale game.",
    image:
      "https://i.pinimg.com/736x/5c/e3/12/5ce3125d6ad98ca2bbf186c1d77b6445.jpg",
   },
  { name: "OVERWATCH 2", genre: "Shooter", platforms: ["PC", "PS5"],
    description: "Team up with heroes, utilize their abilities, and engage in dynamic team-based combat to achieve objectives and secure victory.",
    image:
      "https://i.pinimg.com/1200x/90/2b/d3/902bd3459a2fb7225ab4a8c629e45c1a.jpg",
   },
  { name: "RAINBOW SIX SIEGE", genre: "Tactical Shooter", platforms: ["PC", "PS4", "PS5"] ,
    description: "Plan and execute tactical operations, breach fortified positions, and engage in intense close-quarters combat in this strategic shooter.",
    image:
      "https://i.pinimg.com/736x/21/54/a9/2154a9849b641e416199fab5faa3544c.jpg",
  },
  { name: "ROCKET LEAGUE", genre: "Sports", platforms: ["PC", "PS4", "PS5"],
    description: "Drive rocket-powered cars, score goals in high-flying matches, and experience the thrill of competitive vehicular soccer.",
    image:
      "https://i.pinimg.com/1200x/e2/61/3c/e2613c9a55379ada84f72d6f5edf1fd2.jpg",
   },
  { name: "LEAGUE OF LEGENDS", genre: "Strategy", platforms: ["PC"],
    description: "Choose your champion, strategize with your team, and battle against opponents in this popular multiplayer online battle arena game.",
    image:
      "https://i.pinimg.com/736x/a2/ed/11/a2ed11c6731859330fb6c28b6b59facd.jpg",
   },
  { name: "DOTA 2", genre: "Strategy", platforms: ["PC"] ,
    description: "Select heroes, coordinate with your team, and engage in strategic battles to destroy the enemy's Ancient in this competitive multiplayer online battle arena game.",
    image:    
  "https://i.pinimg.com/1200x/58/75/01/587501baf64257f20217a47533d650c4.jpg",
  },
  { name: "TEKKEN 8", genre: "Fighting", platforms: ["PC", "PS5"] ,
    description: "Master martial arts techniques, engage in intense one-on-one battles, and prove your skills in this fast-paced fighting game.",
    image:
      "https://i.pinimg.com/736x/3d/6e/97/3d6e973dbc5062b97facc26016f1b5ba.jpg",
  },
  { name: "STREET FIGHTER 6", genre: "Fighting", platforms: ["PC", "PS4", "PS5"],
    description: "Choose your fighter, execute powerful combos, and compete in thrilling matches to become the ultimate street fighting champion.",
    image:
      "https://i.pinimg.com/736x/79/06/81/7906818110f82592853e7adff7ab7498.jpg",
   },
  { name: "MORTAL KOMBAT 1", genre: "Fighting", platforms: ["PC", "PS5"],
    description: "Engage in brutal combat, unleash devastating fatalities, and prove your dominance in this iconic fighting game franchise.",
    image:
      "https://i.pinimg.com/1200x/24/f7/4c/24f74c600fbd83cb79db042e61bea279.jpg",
   },
  { name: "GOD OF WAR RAGNAROK", genre: "Action Adventure", platforms: ["PC", "PS4", "PS5"],
    description: "Embark on an epic journey through Norse mythology, battle formidable foes, and uncover the secrets of the gods in this action-packed adventure.",
    image:
      "https://i.pinimg.com/1200x/73/76/16/7376161d93cba6f27a286d593bbc3e5a.jpg",
   },
  { name: "HORIZON FORBIDDEN WEST", genre: "Action Adventure", platforms: ["PC", "PS5"],
    description: "Explore a post-apocalyptic world, encounter robotic creatures, and uncover the mysteries of a fallen civilization in this action-packed adventure.",
    image:
      "https://i.pinimg.com/736x/7c/b6/23/7cb623455e431d1f311309ccced1647e.jpg",
   },
  { name: "RESIDENT Evil 4", genre: "Action Adventure", platforms: ["PS5"],
    description: "Experience the intense horror and action of this critically acclaimed survival horror game.",
    image:
      "https://i.pinimg.com/1200x/cd/85/6c/cd856ce613dcc3f85e837952776b6740.jpg",
   },
  { name: "MARVEL'S SPIDER-MAN 2", genre: "Action Adventure", platforms: ["PS5"],
    description: "Swing through the streets of New York City, battle iconic villains, and embrace the power of Spider-Man in this thrilling action-adventure game.",
    image:
      "https://i.pinimg.com/1200x/2b/b7/a7/2bb7a7a1cb7d44ece6bb42674f782a31.jpg",
   },
  { name: "GHOST OF TSUSHIMA", genre: "Action Adventure", platforms: ["PC", "PS4", "PS5"] ,
    description: "Step into the shoes of a samurai, explore feudal Japan, and engage in epic battles to protect your homeland in this action-packed adventure.",
    image:
      "https://i.pinimg.com/736x/aa/65/be/aa65be39f98195b92ee2239b97c9866e.jpg",
   },
  { name: "ELDEN RING", genre: "Action RPG", platforms: ["PC", "PS4", "PS5"],
    description: "Embark on a dark and challenging journey through a vast open world, battling formidable foes and uncovering the secrets of the Elden Ring.",
    image:
      "https://i.pinimg.com/1200x/65/56/9e/65569e168b35deb2518ca6e089c0f25a.jpg",
   },
  { name: "BLACK MYTH: WUKONG", genre: "Action RPG", platforms: ["PC", "PS5"] ,
    description: "Experience an epic journey inspired by Chinese mythology, wield powerful abilities, and face mythical creatures in this action-packed RPG.",
    image:
      "https://i.pinimg.com/1200x/f1/e5/77/f1e57729cce5a3cdbb2a8feb0a72f13c.jpg",
  },
  { name: "CYBERPUNK 2077", genre: "Open World", platforms: ["PC", "PS4", "PS5"],
    description: "Dive into a dystopian future, explore a sprawling city, and make choices that shape your destiny in this open-world RPG.",
    image:
      "https://i.pinimg.com/736x/14/c8/96/14c896e0730044e222018d65a338eab5.jpg",
   },
  { name: "FORZA HORIZON 5", genre: "Racing", platforms: ["PC", "PS5", "Racing Simulator"],
    description: "Race through stunning landscapes, customize your cars, and experience the thrill of open-world racing in this action-packed racing game.",
    image:  
  "https://i.pinimg.com/1200x/7f/93/80/7f9380b7e030851d4edbce9c51c49af8.jpg",
   },
  { name: "GRAN TURISMO 7", genre: "Racing", platforms: ["PS4", "PS5", "Racing Simulator"],
    description: "Get behind the wheel of a wide range of cars, master realistic driving physics, and compete in thrilling races in this acclaimed racing simulator.",
    image:
      "https://i.pinimg.com/1200x/72/ff/db/72ffdb429f72cc5d82b04ce214e81d9a.jpg",
   },
  { name: "F1 25", genre: "Racing", platforms: ["PC", "PS5", "Racing Simulator"] ,
    description: "Experience the adrenaline of Formula 1 racing, compete on iconic tracks, and manage your team to victory in this high-speed racing game.",
    image:
      "https://i.pinimg.com/736x/8f/c2/fc/8fc2fc70c76a7981270e71d793e25522.jpg",
  },
  { name: "ASSETTO CORSA COMPETIZIONE", genre: "Racing", platforms: ["PC", "PS4", "PS5", "Racing Simulator"] ,
    description: "Immerse yourself in realistic racing, compete in GT championships, and experience the thrill of high-performance cars in this racing simulator.",
    image:
      "https://i.pinimg.com/1200x/97/a3/64/97a364c28a561e46f2d2dd280519b353.jpg",
  },
  { name: "DIRT RALLY 2.0", genre: "Racing", platforms: ["PC", "PS4", "Racing Simulator"],
    description: "Take on challenging rally stages, master different terrains, and push your driving skills to the limit in this off-road racing game.",
    image:
      "https://i.pinimg.com/736x/d6/23/c4/d623c4b41e9a9244df142f2ad1528594.jpg",
   },
  { name: "EURO TRUCK SIMULATOR 2", genre: "Driving Simulator", platforms: ["PC", "Racing Simulator"],
    description: "Experience the life of a truck driver, deliver cargo across Europe, and manage your own trucking business in this realistic driving simulator.",
    image:
      "https://i.pinimg.com/736x/10/36/af/1036afd87b8d33860f25c2812049be56.jpg",
   },
  { name: "sansad showdown ", genre: "political fighting game ", platforms: ["PC", "fighting simulator"],
    description: "Engage in intense political battles, strategize your moves, and fight for dominance in this unique political fighting game.",
    image:
      "https://th.bing.com/th/id/OIP.pGp8ppamYXMXkPKit8KvaQHaHa?r=0&o=7rm=3&rs=1&pid=ImgDetMain&o=7&rm=3",
   },
  { name: "EA SPORTS WRC", genre: "Racing", platforms: ["PC", "PS5", "Racing Simulator"] ,
    description: "Compete in the World Rally Championship, tackle challenging rally stages, and experience the thrill of high-speed racing in this official WRC game.",
    image:
      "https://i.pinimg.com/1200x/51/fe/da/51feda90bd62b363b5d391d4e6941a5f.jpg",
   },
  { name: "PROJECT CARS 2", genre: "Racing", platforms: ["PC", "PS4", "Racing Simulator"],
    description: "Race in a variety of motorsport disciplines, customize your cars, and experience realistic driving physics in this immersive racing simulator.",
    image:
      "https://i.pinimg.com/736x/5a/63/55/5a6355840b9fc9e478f4fe07431c591c.jpg",
   },
  { name: "TRACKMANIA", genre: "Racing", platforms: ["PC", "PS5", "Racing Simulator"] ,
    description: "Compete in fast-paced time trials, create your own tracks, and showcase your racing skills in this high-speed arcade racing game.",
    image:
      "https://i.pinimg.com/1200x/2d/ca/1d/2dca1d0ca9d0fc56ed9d84d9281aa775.jpg",
   },
  { name: "BEAT SABER", genre: "Rhythm", platforms: ["PC", "PS5", "VR"] ,
    description: "Slice through blocks to the beat of the music, immerse yourself in a virtual rhythm experience, and test your reflexes in this popular VR rhythm game.",
    image:
      "https://i.pinimg.com/236x/d9/ae/d2/d9aed25bfb85dd18912842fa2daef8f6.jpg",
   },
  { name: "HALF-LIFE: ALYX", genre: "Action", platforms: ["PC", "VR"] ,
    description: "Step into the world of Half-Life, solve puzzles, and engage in intense combat in this critically acclaimed VR action game.",
    image:
      "https://i.pinimg.com/236x/a7/09/64/a70964cd4c1fa67611685d9c1f943c5d.jpg",
   },
  { name: "SUPERHOT VR", genre: "Action", platforms: ["PC", "PS4", "PS5", "VR"],
    description: "Experience time-bending action, dodge bullets, and take down enemies in this unique VR shooter where time moves only when you do.",
    image:
      "https://i.pinimg.com/236x/a6/b6/e2/a6b6e2d9473e50bda63de7e6622fb79c.jpg",
   },
  { name: "BLOODY ROAR", genre: "Fighting", platforms: ["PC", "PS5", "VR"],
    description: "Immerse yourself in a rhythm-based shooting experience, where you must hit targets in sync with the music to achieve high scores.",
    image:
      "https://i.pinimg.com/1200x/4e/fe/e5/4efee5b78190dd4756d5004f0ad67b6a.jpg",
   },
];

const platformImages = {
  PC: "https://i.pinimg.com/736x/cd/fe/2e/cdfe2e5953dad361e79d87f080adf30e.jpg",
  PS4: "https://i.pinimg.com/736x/3d/6e/97/3d6e973dbc5062b97facc26016f1b5ba.jpg",
  PS5: "https://i.pinimg.com/736x/9a/31/16/9a3116733571bb94a1c57220400f747a.jpg",
  "Racing Simulator": "https://i.pinimg.com/736x/63/b6/78/63b678e0eebfb94ba57a5be14492650f.jpg",
  VR: "https://i.pinimg.com/736x/d2/e4/d4/d2e4d46ce9b1cc9c37953c908a6e5dc4.jpg",
};

const getGameImage = (game) =>
  game.image || platformImages[game.platforms[0]] || platformImages.PC;

const aboutFeaturedGames = games.filter((game) =>
  ["MARVEL'S SPIDER-MAN 2", "GOD OF WAR RAGNAROK", "BLACK MYTH: WUKONG"].includes(game.name)
);

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activePage, setActivePage] = useState(getPageFromHash);
  const [selectedGame, setSelectedGame] = useState(null);
  const [gameSearch, setGameSearch] = useState("");
  const [selectedService, setSelectedService] = useState(null);
  const [bookingDate, setBookingDate] = useState("");
  const normalizedGameSearch = gameSearch.trim().toLowerCase();
  const filteredGames = games.filter((game) =>
    `${game.name} ${game.genre} ${game.platforms.join(" ")}`
      .toLowerCase()
      .includes(normalizedGameSearch)
  );

  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const updateForm = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const subject = encodeURIComponent(
      `Enquiry from ${form.name}`
    );

    const body = encodeURIComponent(
      `Name: ${form.name}\nEmail: ${form.email}\nMessage: ${form.message}`
    );

    window.location.href =
      `mailto:abcd@gmail.com?subject=${subject}&body=${body}`;
  };

  const handleBookingSubmit = (event) => {
    event.preventDefault();

    const subject = encodeURIComponent(
      `Booking request: ${selectedService.name}`
    );
    const body = encodeURIComponent(
      `Service: ${selectedService.name}\nPrice: ${selectedService.price} per hour\nRequested date: ${bookingDate}\n\nPlease confirm availability.`
    );

    window.location.href =
      `mailto:abcd@gmail.com?subject=${subject}&body=${body}`;
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  const navigateTo = (event, page) => {
    event.preventDefault();
    closeMenu();
    setSelectedGame(null);
    setSelectedService(null);
    setBookingDate("");
    if (window.location.hash !== `#${page}`) {
      window.history.pushState(null, "", `#${page}`);
    }
    setActivePage(page);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  };

  useEffect(() => {
    const syncPageWithLocation = () => {
      setActivePage(getPageFromHash());
      setSelectedGame(null);
      setSelectedService(null);
      setBookingDate("");
      closeMenu();
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    };

    window.addEventListener("popstate", syncPageWithLocation);
    window.addEventListener("hashchange", syncPageWithLocation);
    return () => {
      window.removeEventListener("popstate", syncPageWithLocation);
      window.removeEventListener("hashchange", syncPageWithLocation);
    };
  }, []);

  return (
    <div className="app">
      <header className="navbar">
        <a href="#home" className="logo" onClick={(event) => navigateTo(event, "home")}>
          ANY<span>TIME</span>
        </a>

        <button
          className="menu-toggle"
          type="button"
          aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? "✕" : "☰"}
        </button>

        <nav className={menuOpen ? "nav-links active" : "nav-links"} aria-label="Main navigation">
          {[
            ["HOME", "home"],
            ["ABOUT", "about"],
            ["SERVICES", "services"],
            ["GAMES", "games"],
            ["CONTACT", "contact"],
          ].map(([item, page]) => (
              <a
                href={`#${page}`}
                key={item}
                aria-current={activePage === page ? "page" : undefined}
                onClick={(event) => navigateTo(event, page)}
              >
                {item}
              </a>
          ))}
        </nav>
      </header>

      <main>
        {activePage === "home" && <section className="hero" id="home">

        <div className="hero-content">

          <p className="orange-text">
            PLAY. COMPETE. REPEAT.
          </p>

          <h1>ANYTIME</h1>

          <h2>
            GAMING CAFE
          </h2>

          <p className="hero-description">
            Your next level gaming destination.
            Experience premium gaming setups,
            immersive gameplay and unforgettable competition.
          </p>

          <a href="#services" className="primary-btn" onClick={(event) => navigateTo(event, "services")}>
            EXPLORE OUR SETUPS ↗
          </a>

        </div>

        <div className="hero-bottom">
          <span>01 / 05</span>
          <span>THE GAME STARTS HERE</span>
          <a href="#about" onClick={(event) => navigateTo(event, "about")}>SCROLL TO EXPLORE ↓</a>
        </div>

      </section>}

      {activePage === "about" && <section className="about section" id="about">

        <p className="section-label">
          01 — WHO WE ARE
        </p>

        <div className="about-container">

          <div className="about-copy">
            <div className="about-heading">
              <h2 className="section-title">
                BUILT FOR
                <br />
                <span>THE PLAYERS.</span>
              </h2>
              <p>YOUR SPACE TO PLAY, CONNECT, AND LEVEL UP.</p>
            </div>

            <div className="about-intro">
              <h3>MORE THAN A GAMING CAFE. IT'S YOUR PLAYGROUND.</h3>

              <p>
                Welcome to Anytime Gaming Cafe, a place made for gamers,
                explorers, and competitive spirits. From PC and console gaming
                to racing simulators and VR, discover your next gaming experience
                under one roof.
              </p>
            </div>
          </div>

          <div className="about-artwork">
            <p>FEATURED GAME WORLDS</p>
            <div className="about-artwork-grid">
              {aboutFeaturedGames.map((game) => (
                <figure className="about-artwork-card" key={game.name}>
                  <img
                    src={getGameImage(game)}
                    alt={`${game.name} character artwork`}
                    loading="lazy"
                  />
                  <figcaption>{game.name}</figcaption>
                </figure>
              ))}
            </div>
          </div>

          <div className="stats">

              <button
                className="stat-card"
                type="button"
                aria-label="Explore the game collection"
                onClick={(event) => navigateTo(event, "games")}
              >
                <h2>50<span>+</span></h2>
                <p>GAMES AVAILABLE</p>
                <span className="stat-card-arrow" aria-hidden="true">↗</span>
              </button>

              <button
                className="stat-card"
                type="button"
                aria-label="Explore PC and PS5 services"
                onClick={(event) => navigateTo(event, "services")}
              >
                <h2>7<span>+</span></h2>
                <p>PCs & PS5</p>
                <span className="stat-card-arrow" aria-hidden="true">↗</span>
              </button>

              <button
                className="stat-card"
                type="button"
                aria-label="Explore VR games"
                onClick={(event) => navigateTo(event, "games")}
              >
                <h2>2<span>+</span></h2>
                <p>VR GAMING</p>
                <span className="stat-card-arrow" aria-hidden="true">↗</span>
              </button>

          </div>

        </div>

      </section>}

      {activePage === "services" && <>
      <section className="services section" id="services">

        <div className="section-heading">

          <div>
            <p className="section-label">
              02 — WHAT YOU CAN PLAY
            </p>

            <h2 className="section-title">
              OUR <span>SERVICES.</span>
            </h2>
          </div>

          <p>
            Choose your setup.
            <br />
            Enter the game.
          </p>

        </div>

        <div className="service-grid">

          {services.map((service, index) => (

            <button
              className="service-card"
              key={service.name}
              type="button"
              aria-label={`View ${service.name} games`}
              onClick={(event) => navigateTo(event, "games")}
            >

              <div
                className="service-image"
                style={{
                  backgroundImage: `url(${service.image})`,
                }}
              >

                <span className="service-number">
                  0{index + 1}
                </span>

              </div>

              <div className="service-info">

                <div>
                  <h3>{service.name}</h3>
                  <p>{service.detail}</p>
                </div>

                <div className="service-price">
                  <h2>{service.price}</h2>
                  <p>/ HOUR</p>
                </div>

              </div>

            </button>

          ))}

        </div>

      </section>

      {/* PRICING SECTION */}

      <section className="pricing section" id="pricing">

        <div className="pricing-heading">

          <p className="section-label">
            03 — PLAY YOUR WAY
          </p>

          <h2 className="section-title">
            SIMPLE <span>PRICING.</span>
          </h2>

          <p>
            Pick your platform. Book your time.
            Let the game begin.
          </p>

        </div>

        <div className="price-list">

          {services.map((service, index) => (

            <button
              className="price-row"
              key={service.name}
              type="button"
              aria-label={`Book ${service.name}`}
              aria-expanded={selectedService && selectedService.name === service.name}
              onClick={() => {
                setSelectedService(service);
                setBookingDate("");
              }}
            >

              <span>0{index + 1}</span>

              <h3>{service.name}</h3>

              <div className="price-dots"></div>

              <h2>
                {service.price}
                <small> / HOUR</small>
              </h2>

            </button>

          ))}

        </div>

        {selectedService && (
          <form className="booking-panel" onSubmit={handleBookingSubmit}>
            <div className="booking-summary">
              <p className="section-label">BOOK A SESSION</p>
              <h3>{selectedService.name}</h3>
              <p>
                <strong>{selectedService.price}</strong> per 1 hour
              </p>
            </div>

            <div className="booking-date-field">
              <label htmlFor="booking-date">When would you like to book?</label>
              <input
                id="booking-date"
                type="date"
                min={getTodayDate()}
                value={bookingDate}
                onChange={(event) => setBookingDate(event.target.value)}
                required
              />
              <button type="submit" className="primary-btn">
                REQUEST BOOKING ↗
              </button>
            </div>

            <p className="booking-note">
              Your email app will open with the booking request. We will confirm availability.
            </p>
          </form>
        )}

      </section>
      </>}

      {activePage === "games" && <section className="games section" id="games">

        <div className="section-heading">

          <div>
            <p className="section-label">
              04 — PICK YOUR WORLD
            </p>

            <h2 className="section-title">
              POPULAR <span>GAMES.</span>
            </h2>
          </div>

          <p>
            From high-speed races
            <br />
            to intense battles.
          </p>

        </div>

        {!selectedGame && (
          <div className="game-search">
            <label htmlFor="game-search">SEARCH GAMES</label>
            <input
              id="game-search"
              type="search"
              placeholder="Search by game, genre, or platform..."
              value={gameSearch}
              onChange={(event) => setGameSearch(event.target.value)}
            />
            <p aria-live="polite">{filteredGames.length} GAMES FOUND</p>
          </div>
        )}

        {selectedGame ? (
          <div className="game-detail">
            <button
              className="game-back"
              type="button"
              onClick={() => setSelectedGame(null)}
            >
              ← BACK TO GAMES
            </button>

            <div className="game-detail-content">
              <div className="game-preview" role="img" aria-label={`${selectedGame.name} animated preview`}>
                <img src={selectedGame.image} alt="" />
                <span className="preview-label">GAME PREVIEW</span>
                <span className="preview-play" aria-hidden="true">▶</span>
              </div>

              <div className="game-detail-info">
                <p className="section-label">{selectedGame.genre} — GAME SPOTLIGHT</p>
                <h3 className="section-title">{selectedGame.name}</h3>
                <p>
                  {selectedGame.description ||
                    `${selectedGame.name} is a ${selectedGame.genre.toLowerCase()} game. Explore it on your selected gaming setup.`}
                </p>
                <div className="game-platform-detail">
                  <span>AVAILABLE ON</span>
                  <p>{selectedGame.platforms.join(" · ")}</p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          filteredGames.length > 0 ? (
            <div className="games-grid">
              {filteredGames.map((game) => (
              <button
                className="game-card"
                key={game.name}
                type="button"
                onClick={() =>
                  setSelectedGame({
                    ...game,
                    image: getGameImage(game),
                  })
                }
                aria-label={`View ${game.name} details`}
              >
                <img src={getGameImage(game)} alt="" loading="lazy" />
                <div className="game-info">
                  <p>{game.genre}</p>
                  <h3>{game.name}</h3>
                  <div className="game-platforms">
                    {game.platforms.map((platform) => (
                      <span key={platform}>{platform}</span>
                    ))}
                  </div>
                </div>
                <span className="game-card-action">VIEW GAME ↗</span>
              </button>
              ))}
            </div>
          ) : (
            <p className="empty-games">No games found. Try another game, genre, or platform.</p>
          )
        )}

      </section>}

      {activePage === "contact" && <section className="contact section" id="contact">

        <div className="contact-banner">

          <img
            src="https://images.unsplash.com/photo-1593305841991-05c297ba4575?auto=format&fit=crop&w=1600&q=90"
            alt="Gaming setup"
          />

          <h2>
            READY PLAYER
            <span> ONE?</span>
          </h2>

        </div>

        <div className="contact-content">

          <p className="section-label">
            05 — GET IN TOUCH
          </p>

          <h2 className="section-title">
            LET'S <span>CONNECT.</span>
          </h2>

          <div className="contact-container">

            <div className="contact-details">

              <h3>
                HAVE A QUESTION?
                <br />
                WANT TO PLAY?
              </h3>

              <p>EMAIL</p>
              <a href="mailto:abcd@gmail.com">
                abcd@gmail.com
              </a>

              <p>PHONE</p>
              <a href="tel:7351344304">
                7351344304
              </a>

              <a href="tel:7252889967">
                7252889967
              </a>

            </div>

            <form
              className="contact-form"
              onSubmit={handleSubmit}
            >

              <input
                type="text"
                name="name"
                placeholder="YOUR NAME"
                value={form.name}
                onChange={updateForm}
                required
              />

              <input
                type="email"
                name="email"
                placeholder="YOUR EMAIL"
                value={form.email}
                onChange={updateForm}
                required
              />

              <textarea
                name="message"
                placeholder="YOUR MESSAGE"
                rows="4"
                value={form.message}
                onChange={updateForm}
                required
              />

              <button type="submit" className="primary-btn">
                SEND MESSAGE ↗
              </button>

            </form>

          </div>

        </div>

      </section>}
      </main>

      {activePage === "home" && (
        <div className="hero-image" role="img" aria-label="Gaming setup">
          <div className="hero-stamp">
            <p>LEVEL UP</p>
            <h3>YOUR GAME.</h3>
          </div>
        </div>
      )}

      <footer className="footer">
        <a href="#home" className="logo" onClick={(event) => navigateTo(event, "home")}>
          ANY<span>TIME</span>
        </a>

        <p>PLAY HARD. STAY IN THE GAME.</p>

        <a href="#home" onClick={(event) => navigateTo(event, "home")}>BACK TO TOP ↑</a>

        <small>
          © {new Date().getFullYear()}
          ANYTIME GAMING & CAFE.
          ALL RIGHTS RESERVED.
        </small>

      </footer>

    </div>
  );
}

export default App;