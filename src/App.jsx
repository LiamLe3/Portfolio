import NavigationBar from './NavigationBar';
import HomeSection from './HomeSection';
import SkillSection from './SkillSection';
function App() {

  return (
    <main className="relative center-items flex-col bg-black -z-2">
      <div className="grid-background pointer-events-none -z-1" ></div>
      <NavigationBar />
      <HomeSection />
      <SkillSection />
    </main>
  );
}

export default App
