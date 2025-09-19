import SkillCard from "./SkillCard";
import cssLogo from "./assets/css.svg";
import htmlLogo from "./assets/html.svg";
import javascriptLogo from "./assets/javascript.svg";
import typescriptLogo from "./assets/typescript.svg";
import reactLogo from "./assets/react.svg";
import tailwindLogo from "./assets/tailwind.svg";
import gitLogo from "./assets/git.svg"
import jestLogo from "./assets/jest.svg"
function SkillSection() {

  return (
    <section id="skills" className="text-white relative px-5 w-screen">
      <div className="xl:w-[80rem] mx-auto">
        <h1 className="w-full text-center pb-8 text-5xl">My Tech Arsenel</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 items-center justify-between">
          <SkillCard bgColor="bg-[#e44c27]/20" imgSrc={htmlLogo} techName="HTML" techDesc="Markup language"/>
          <SkillCard bgColor="bg-[#1672b6]/20" imgSrc={cssLogo} techName="CSS" techDesc="Styling language"/>
          <SkillCard bgColor="bg-[#f0db4f]/20" imgSrc={javascriptLogo} techName="JavaScript" techDesc="Language"/>
          <SkillCard bgColor="bg-[#007acc]/20" imgSrc={typescriptLogo} techName="TypeScript" techDesc="Typed JavaScript"/>
          <SkillCard bgColor="bg-[#62dafb]/20" imgSrc={reactLogo} techName="React" techDesc="JavaScript library"/>
          <SkillCard bgColor="bg-[#38bdf8]/20" imgSrc={tailwindLogo} techName="Tailwind" techDesc="CSS framework"/>
          <SkillCard bgColor="bg-[#f34f28]/20" imgSrc={gitLogo} techName="Git" techDesc="Version control"/>
          <SkillCard bgColor="bg-[#ff618f]/20" imgSrc={jestLogo} techName="Jest" techDesc="Testing"/>
        </div>
      </div>  
    </section>
  );
}

export default SkillSection;