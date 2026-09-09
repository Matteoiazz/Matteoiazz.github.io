import { Nav } from "@/components/nav"
import { Hero } from "@/components/hero"
import { About } from "@/components/about"
import { Projects } from "@/components/projects"
import { Experience } from "@/components/experience"
import { Contact } from "@/components/contact"
import { TechMarquee } from "@/components/tech-marquee"

export default function Page() {
  return (
    <main className="relative">
      <Nav />
      <Hero />
      <About />
      <TechMarquee />
      <Projects />
      <Experience />
      <Contact />
    </main>
  )
}
