import { useState, useEffect, useRef } from "react";
import ProjectInfo from "./ProjectInfo";
import ProjectImages from "./ProjectImages";
import dummyImg from "./assets/dummyImg.jpg";
function ProjectSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const cardRefs = useRef([]);
  const desktopRefs = useRef([]);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  const imgList = [dummyImg, dummyImg, dummyImg];
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
      title: "Tetris",
      summary: `Can you keep up as the blocks tumble from above? 
                Stack, spin, and clear lines before the screen fills up! 
                A retro puzzle game rebuilt with modern web tech.`,
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
    <section className="w-full bg-gray-500 center-items relative px-5">
      <div className="xl:w-[80rem]">
        <div className="w-full center-items">
          <h2 className="text-4xl">Projects</h2>
        </div>

        <div className="block flex flex-col w-full lg:hidden">
          {projects.map((proj, i) => (
            <div key={i} ref={(el) => (cardRefs.current[i] = el)} data-index={i} className="my-[20px] w-full">
              <ProjectInfo
                {...proj}
                focus={activeIndex === i}
              />
              <ProjectImages images={imgList} hide={false}/>
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
              <ProjectImages images={imgList} hide={activeIndex !== 0}/>
              <ProjectImages images={imgList} hide={activeIndex !== 1}/>
              <ProjectImages images={imgList} hide={activeIndex !== 2}/>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ProjectSection;

/**
 *        
 */