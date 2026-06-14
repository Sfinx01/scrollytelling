const sortByDate = true;

const rawProjects = [
  {
    title: "Do Green Bonds Finance Real Transition?",
    subtitle: "MSc Thesis",
    type: "research",
    date: "2026-06-14",
    url: "/green-bonds",
    // We are temporarily borrowing a green placeholder image from the repo 
    coverImage: "https://ik.imagekit.io/raihankalla/research_section_cover/esg-perception.png",
  }
];

export const featuredProjects = sortByDate
  ? [...rawProjects].sort((a, b) => new Date(b.date || 0).getTime() - new Date(a.date || 0).getTime())
  : rawProjects;
