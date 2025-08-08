import ProjectCard from "./ProjectCard";
function ProjectSection() {

  return (
    <section className="w-full bg-gray-500 center-items relative">
      <div className="section">
        <h2>Projects</h2>
        <ProjectCard 
          title="Tetris"
          summary="Summary"
          techUsed={["JavaScript, HTML, CSS"]}
          liveLink="https://liamle3.github.io/Tetris/"
          githubLink="https://github.com/LiamLe3/Tetris"
          images="image"
          focus={true}
        />
        <ProjectCard 
          title="MTG Card Search"
          summary="Summary"
          techUsed={["React, HTML, CSS"]}
          liveLink="https://liamle3.github.io/Tetris/"
          githubLink="https://github.com/LiamLe3/Tetris"
          images="image"
          focus={true}
        />
        <ProjectCard 
          title="Pokedex"
          summary="Summary"
          techUsed={["Jest, JavaScript, HTML, CSS"]}
          liveLink="https://liamle3.github.io/Tetris/"
          githubLink="https://github.com/LiamLe3/Tetris"
          images="image"
          focus={true}
        />
      </div>
    </section>
  );
}

export default ProjectSection;