function SkillCard({bgColor, imgSrc, techName, techDesc}) {

  return (
    <div className="flex flex-1 bg-[#1A1A1A] hover:bg-[#303030] border border-[#1A1A1A] hover:border-[#404040] rounded-lg text-white p-3 gap-5">
      <div className={`p-3 ${bgColor} rounded-lg w-fit`}>
        <img alt={`${techName} logo`} className="size-8" src={imgSrc}/>
      </div>
      <div>
        <h2>{techName}</h2>
        <p>{techDesc}</p>
      </div>
    </div>
  );
}

export default SkillCard;