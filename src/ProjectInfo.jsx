import DemoLogo from "./assets/demo.svg?react"
import GitHubLogo from "./assets/github.svg?react"
function ProjectInfo({title, summary, techUsed, liveLink, githubLink, focus}) {

  return (
    <div className={`w-full flex justify-start flex-col mb-[20px] ${focus ? "" : "opacity-35"}`}>
      <h3 className="text-4xl">{title}</h3>
      <div className="text-lg pb-1">{summary}</div>
      <div className="flex flex-wrap pb-1">
        {techUsed.map((tech, i) => (
          <div key={i} className="mr-[10px] mb-[10px] pb-1 px-3 bg-[#262626] hover:bg-[#404040] border border-[#404040] rounded-md font-sans text-lg">
            {tech}
          </div>
        ))}
      </div>
      <div className="flex text-lg">
        <a className="bg-[#404040] text-white flex-1 py-1 px-3 mr-[20px] rounded-md inline-flex items-center justify-center gap-2" href={liveLink} target="-blank" rel="noopener noreferrer">
          <DemoLogo className="fill-white size-4"/>
          Demo
        </a>
        <a className="bg-[#ffffff] flex-1 py-1 px-3 rounded-md inline-flex items-center justify-center gap-2 text-black" href={githubLink} target="-blank" rel="noopener noreferrer">
          <GitHubLogo className="fill-white size-4"/>
          Code
        </a>
      </div>
    </div>
  );
}

export default ProjectInfo;