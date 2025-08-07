import ProjectCard from "./ProjectCard";
function ProjectSection() {

  return (
    <section className="w-full bg-gray-500 center-items relative">
      <div className="section">
        <h2>Projects</h2>
        <ProjectCard 
          title="Tetris"
          summary="Summary"
          techUsed="tech used"
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