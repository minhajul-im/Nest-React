import { getHomePageData } from "./service";
import { HeroSectionWithSlider } from "./hero-section/hero-section-with-slider";

export const ScreenHomePage = async () => {
  const { title, description } = await getHomePageData();
  return (
    <main>
      <HeroSectionWithSlider />
      <div className="container mx-auto py-20">
        <h1 className="text-4xl font-bold text-center">{title}</h1>
        <p className="text-wrap text-base tracking-wide">{description}</p>
      </div>
    </main>
  );
};
