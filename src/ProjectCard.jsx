function ProjectCard({title, summary, techUsed, liveLink, githubLink, images, focus}) {

  return (
    <div className="flex flex-row h-[500px]">
      <div className={`w-1/2 flex justify-start flex-col ${focus ? "" : "opacity-35"}`}>
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
      {focus && (
      <div className="w-1/2 center-items bg-red-200">
        <p>{images}</p>
      </div>
    )}
    </div>
  );
}

export default ProjectCard;