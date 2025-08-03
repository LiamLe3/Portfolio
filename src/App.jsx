import NavigationBar from './NavigationBar';
import HomeSection from './HomeSection';
import SkillSection from './SkillSection';
import ProjectSection from './ProjectSection';
function App() {

  return (
    <div className="center-items flex-col bg-black">
      <div className="grid-background"></div>
      <NavigationBar />
      <HomeSection />
      <SkillSection />
      <ProjectSection />
    </div>
  );
}

export default App
