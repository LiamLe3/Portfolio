function ProjectText({title, summary, techUsed, liveLink, githubLink, images}) {

  return (
    <div>
      <div>
        <h3>{title}</h3>
        <p>{summary}</p>
        <p>{liveLink}</p>
        <p>{githubLink}</p>
        <div></div>
      </div>
    </div>
  );
}

export default ProjectText;