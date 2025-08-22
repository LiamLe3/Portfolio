import { useState, useEffect, useRef } from "react";
import ProjectCard from "./ProjectCard";
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
      summary: "Summary",
      techUsed: ["JavaScript, HTML, CSS"],
      liveLink: "https://liamle3.github.io/Tetris/",
      githubLink: "https://github.com/LiamLe3/Tetris",
      images: "image1",
    },
    {
      title: "MTG Card Search",
      summary: "Summary",
      techUsed: ["React, HTML, CSS"],
      liveLink: "https://mtgcardsearch.netlify.app/",
      githubLink: "https://github.com/LiamLe3/MTG-Search",
      images: "image2",
    },
    {
      title: "Pokedex",
      summary: "Summary",
      techUsed: ["Jest, JavaScript, HTML, CSS"],
      liveLink: "https://liamle3.github.io/Pokedex/",
      githubLink: "https://github.com/LiamLe3/Pokedex",
      images: "image3",
    },
  ];

  return (
    <section className="w-full bg-gray-500 center-items relative">
      <div className="section">
        <h2>Projects</h2>
        {projects.map((proj, i) => (
          <div
            key={i}
            ref={(el) => (cardRefs.current[i] = el)} // store ref
            data-index={i}
          >
            <ProjectCard
              {...proj}
              focus={activeIndex === i}
            />
          </div>
        ))}
      </div>
    </section>
  );
}

export default ProjectSection;