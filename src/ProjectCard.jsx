function ProjectCard({title, summary, techUsed, liveLink, githubLink, images, focus}) {

  return (
    <div className="flex flex-row">
      <div className="w-1/2 center-items flex-col">
        <h3>{title}</h3>
        <p>{summary}</p>
        <p>{techUsed}</p>
        <div className="flex justify-around">
          <a href={liveLink} target="-blank" rel="noopener noreferrer">
            View It Live
          </a>
          <a href={githubLink} target="-blank" rel="noopener noreferrer">
            View Github Repo
          </a>
        </div>
      </div>
      <div className="w-1/2 center-items">
        <p>{images}</p>
      </div>
    </div>
  );
}

export default ProjectCard;