import NavigationBar from './NavigationBar';
import HomeSection from './HomeSection';
import SkillSection from './SkillSection';
import ProjectSection from './ProjectSection';
import ContactSection from './ContactSection';
function App() {

  return (
    <div className="w-full center-items flex-col bg-black">
      <div className="grid-background"></div>
      <NavigationBar />
      <HomeSection />
      <SkillSection />
      <ProjectSection />
      <ContactSection />
    </div>
  );
}

export default App
