import { useState, useEffect, useRef } from "react";
import ProjectInfo from "./ProjectInfo";
import ProjectImages from "./ProjectImages";
import dummyImg from "./assets/dummyImg.jpg";
import MTGImg1 from "./images/MTGImg1.png";
import MTGImg2 from "./images/MTGImg2.png";
import MTGImg3 from "./images/MTGImg3.png";
import TetrisPC from "./images/TetrisPC.png";
import TetrisPhone from "./images/TetrisPhone.png";
import PokemonHome from "./images/PokemonHome.png";
import PokemonPC from "./images/PokemonPC.png";
import PokemonMobile from "./images/PokemonMobile.png";


function ProjectSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const cardRefs = useRef([]);
  const desktopRefs = useRef([]);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  const imgList = [dummyImg, dummyImg, dummyImg];

  const MTGList = [MTGImg1, MTGImg2, MTGImg3];
  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 767px)");
    const handler = (e) => setIsMobile(e.matches);

    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if(entry.isIntersecting) {
            const index = Number(entry.target.dataset.index);
            setActiveIndex(index);
          }
        })
      },
      {
        rootMargin: "-50% 0% -50% 0%",
        threshold: 0
      }
    );

    const refsToUse = isMobile ? cardRefs.current : desktopRefs.current;
    refsToUse.forEach(ref => {
      observer.observe(ref);
    });

    return () => observer.disconnect();
  }, [isMobile]);

  const projects = [
    {
      title: "MTG Card Search",
            summary: `Can you keep up as the blocks tumble from above? 
                Stack, spin, and clear lines before the screen fills up! 
                A retro-inspired puzzle game rebuilt with modern web tech.`,
      techUsed: ["React"],
      liveLink: "https://mtgcardsearch.netlify.app/",
      githubLink: "https://github.com/LiamLe3/MTG-Search",
      images: [MTGImg1, MTGImg2, MTGImg3],
      colour: "#fda4af"
    },
    {
      title: "Tetris",
      summary: `Can you keep up as the blocks tumble from above? 
                Stack, spin, and clear lines before the screen fills up! 
                A retro puzzle game rebuilt with modern web tech.`,
      techUsed: ["JavaScript", "HTML", "CSS"],
      liveLink: "https://liamle3.github.io/Tetris/",
      githubLink: "https://github.com/LiamLe3/Tetris",
      images: [TetrisPC, TetrisPhone],
      colour: "#d8b4fe"
    },
    
    {
      title: "Pokedex",
            summary: `Can you keep up as the blocks tumble from above? 
                Stack, spin, and clear lines before the screen fills up! 
                A retro-inspired puzzle game rebuilt with modern web tech.`,
      techUsed: ["Jest", "JavaScript", "HTML", "CSS"],
      liveLink: "https://liamle3.github.io/Pokedex/",
      githubLink: "https://github.com/LiamLe3/Pokedex",
      images: [PokemonPC, PokemonMobile, PokemonHome],
      colour: "#a7c1e0"
    },
  ];

  return (
    <section id="projects" className="w-full bg-[#1A1A1A] center-items relative px-5 pt-10 pb-15 mt-16 border-y-2 border-white">
      <div className="xl:w-[80rem] text-white">
        <h2 className="w-full text-center pb-8 text-5xl">
          Projects
        </h2>

        <div className="block flex flex-col w-full lg:hidden">
          {projects.map((proj, i) => (
            <div key={i} ref={(el) => (cardRefs.current[i] = el)} data-index={i} className="my-[20px] w-full">
              <ProjectInfo
                {...proj}
                focus={activeIndex === i}
              />
              <ProjectImages images={proj.images} colour={proj.colour} hide={false}/>
            </div>
          ))}
        </div>
        <div className="hidden gap-10 lg:flex">
          <div className="w-1/2">
            {projects.map((proj, i) => (
              <div key={i} ref={(el) => (desktopRefs.current[i] = el)} data-index={i} className="my-[20px]">
                <ProjectInfo
                  {...proj}
                  focus={activeIndex === i}
                />
              </div>
            ))}
          </div>
          <div className="w-1/2">
            <div className="sticky top-[calc(50%-250px)]">
              {projects.map((proj, i) => (
                <ProjectImages
                  key={i}
                  images={proj.images}
                  colour={proj.colour}
                  hide={activeIndex !== i}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ProjectSection;