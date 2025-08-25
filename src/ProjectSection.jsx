import { useState, useEffect, useRef } from "react";
import ProjectInfo from "./ProjectInfo";
import ProjectImages from "./ProjectImages";
function ProjectSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const cardRefs = useRef([]);

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

    cardRefs.current.forEach(ref => {
      observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  const projects = [
    {
      title: "Tetris",
      summary: `Can you keep up as the blocks tumble from above? 
                Stack, spin, and clear lines before the screen fills up! 
                A retro-inspired puzzle game rebuilt with modern web tech.`,
      techUsed: ["JavaScript", "JavaScript", "Java", "JavaScript", "JavaScript"],
      liveLink: "https://liamle3.github.io/Tetris/",
      githubLink: "https://github.com/LiamLe3/Tetris"
    },
    {
      title: "MTG Card Search",
            summary: `Can you keep up as the blocks tumble from above? 
                Stack, spin, and clear lines before the screen fills up! 
                A retro-inspired puzzle game rebuilt with modern web tech.`,
      techUsed: ["JavaScript", "JavaScript", "Java", "JavaScript", "JavaScript"],
      techUsed: ["React"],
      liveLink: "https://mtgcardsearch.netlify.app/",
      githubLink: "https://github.com/LiamLe3/MTG-Search"
    },
    {
      title: "Pokedex",
            summary: `Can you keep up as the blocks tumble from above? 
                Stack, spin, and clear lines before the screen fills up! 
                A retro-inspired puzzle game rebuilt with modern web tech.`,
      techUsed: ["JavaScript", "JavaScript", "Java", "JavaScript", "JavaScript"],
      techUsed: ["Jest", "JavaScript"],
      liveLink: "https://liamle3.github.io/Pokedex/",
      githubLink: "https://github.com/LiamLe3/Pokedex"
    },
  ];

  return (
    <section className="w-full bg-gray-500 center-items relative">
      <div className="section">
        <div className="w-full center-items">
          <h2 className="text-4xl">Projects</h2>
        </div>

        <div className="block md:hidden w-full">
          {projects.map((proj, i) => (
            <div key={i} ref={(el) => (cardRefs.current[i] = el)} data-index={i} className="my-[20px]">
              <ProjectInfo
                {...proj}
                focus={activeIndex === i}
              />
              <ProjectImages />
            </div>
          ))}
        </div>

        <div className="hidden md:flex">
          <div className="w-1/2">
            {projects.map((proj, i) => (
              <div key={i} ref={(el) => (cardRefs.current[i] = el)} data-index={i} className="my-[20px]">
                <ProjectInfo
                  {...proj}
                  focus={activeIndex === i}
                />
              </div>
            ))}
          </div>
          <div className="w-1/2">
            <div className="sticky top-[calc(50%-250px)]">
              <ProjectImages/>
            </div>
          </div>
        </div>
        <div className="h-[1000px]"></div>

      </div>
    </section>
  );
}

export default ProjectSection;

/*
        */