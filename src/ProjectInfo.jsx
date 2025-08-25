import DemoLogo from "./assets/demo.svg?react"
import GitHubLogo from "./assets/github.svg?react"
function ProjectInfo({title, summary, techUsed, liveLink, githubLink, focus}) {

  return (
    <div className={`w-full flex justify-start flex-col mb-[20px] ${focus ? "" : "opacity-35"}`}>
      <h3 className="text-3xl">{title}</h3>
      <div className="text-base py-1">{summary}</div>
      <div className="flex flex-wrap py-1">
        {techUsed.map((tech, i) => (
          <div key={i} className="mr-[10px] mb-[10px] py-1 px-3 bg-red-200 rounded-md font-sans text-base">
            {tech}
          </div>
        ))}
      </div>
      <div className="flex">
        <a className="bg-black text-white flex-1 py-1 px-3 mr-[5px] rounded-md inline-flex items-center justify-center gap-2" href={liveLink} target="-blank" rel="noopener noreferrer">
          <DemoLogo className="fill-white size-4"/>
          Demo
        </a>
        <a className="bg-green-200 flex-1 py-1 px-3 rounded-md inline-flex items-center justify-center gap-2" href={githubLink} target="-blank" rel="noopener noreferrer">
          <GitHubLogo className="fill-white size-4"/>
          Code
        </a>
      </div>
    </div>
  );
}

export default ProjectInfo;