import { Navbar } from "@/components/layout/Navbar";
import { ProjectGallery } from "@/components/home/ProjectGallery";

export default function ProjectsPage() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <div className="pt-32 pb-20">
        <ProjectGallery />
      </div>
    </main>
  );
}