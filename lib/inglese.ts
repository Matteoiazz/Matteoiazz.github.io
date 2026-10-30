// -----------------------------------------------------------------------------
// TESTI IN INGLESE — affiancano quelli italiani di portfolio-data.ts.
// Le chiavi sono gli slug dei progetti e i ruoli del percorso.
// -----------------------------------------------------------------------------

export const progettiEn: Record<string, { kind: string; team: string; tagline: string }> = {
  tripify: {
    kind: "Android app",
    team: "Team of four · Enterprise Architecture, UniCal · I built catalogue and itineraries, backend and app",
    tagline:
      "A travel platform of microservices for flights, hotels and activities. I built the catalogue and itineraries, from the Spring Boot services to the Android app.",
  },
  tesi: {
    kind: "Desktop app · Thesis",
    team: "Bachelor's thesis in Computer Science · UniCal · solo project",
    tagline:
      "A desktop app a lecturer uses to prepare programming exams for Moodle: tasks, solutions verified against tests, an export ready to import.",
  },
  goldenstay: {
    kind: "Web app",
    team: "Pair project · Web Application course, UniCal",
    tagline:
      "Bookings for a seaside resort in Tropea: search by dates, rooms and suites, payment and back office.",
  },
  moneymind: {
    kind: "Web app",
    team: "Team of four, my contribution full-stack",
    tagline: "Personal finance and investing: shared wallets, budgets, transactions and markets.",
  },
  "muscle-fitness": {
    kind: "Site and members area",
    team: "Personal project",
    tagline: "A site for a smart gym with a members area: memberships, QR badge and medical certificates.",
  },
  wavely: {
    kind: "Desktop app",
    team: "Exam project for three · refactored by me in 2026",
    tagline: "A JavaFX desktop music player: playlists, artists, equaliser and themes.",
  },
  "alghe-4d": {
    kind: "Desktop app · R&D",
    team: "Team of eight · Research and Development Methodologies, UniCal master's · for the Physics Department · just started",
    tagline:
      "A Python desktop app for a physics lab: it opens microscope acquisitions up to 8 GB, shows them in 3D over time and tracks the algae.",
  },
}

export const percorsoEn: Record<string, { tipo: string; role: string; period: string; description: string }> = {
  "Laurea Magistrale in Artificial Intelligence and Computer Science": {
    tipo: "Education",
    role: "MSc in Artificial Intelligence and Computer Science",
    period: "From October 2026",
    description:
      "First semester: Deep Learning and Research and Development Methodologies, with an eight-person Scrum project for the Physics Department on 3D analysis of algae under the microscope.",
  },
  "Laurea Triennale in Informatica": {
    tipo: "Education",
    role: "BSc in Computer Science",
    period: "In progress · expected Dec 2026",
    description: "Third year. University projects across web, mobile and enterprise architecture, alongside personal projects.",
  },
  "Operatore volontario": {
    tipo: "Experience",
    role: "Volunteer",
    period: "Sep 2025 · Sep 2026",
    description: "A year of Italian Universal Civil Service as a volunteer, alongside my studies.",
  },
  "Diploma Scientifico — Scienze Applicate": {
    tipo: "Education",
    role: "Scientific high school diploma — Applied Sciences",
    period: "2023 · 97/100",
    description: "Applied Sciences track, my first structured contact with programming.",
  },
}

export const introEn =
  "Third-year Computer Science student at the University of Calabria, graduating in December 2026 with a thesis that brings AI into a teaching tool. Since October 2026 I have also been attending the master's in Artificial Intelligence and Computer Science at UniCal, working in a team of eight on a project for the Physics Department. Along the way I have built university and personal projects for web, mobile and desktop: full-stack development, Android apps and microservice architectures."
