import IntroductionSection from "@/components/home/sections/IntroductionSection";
import ProjectsSection from "@/components/home/sections/ProjectsSection";

export default function Home() {
    return (
        <main className="mx-4 md:mx-8 lg:mx-16 space-y-8 py-12">
            <IntroductionSection />
            <ProjectsSection />
        </main>
    );
}
