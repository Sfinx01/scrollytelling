export const config = {
  metadata: {
    title: "Do Green Bonds Finance Real Transition?",
    brand: "Lucas Aarts",
    homeNavUrl: "/"
  },
  hero: {
    label: "MSc Thesis",
    titleHtml: "Do Green Bonds Finance Real Transition?",
    stats: [
      { target: 179, label: "Green Bond Issuers" },
      { target: 294, label: "Conventional Issuers" }
    ]
  },
  sections: [
    {
      id: "promise",
      navLabel: "The Promise",
      viz: { key: "timeline", props: {} }
    },
    {
      id: "flaw",
      navLabel: "The Flaw",
      viz: { key: "equation", props: {} }
    },
    {
      id: "methodology",
      navLabel: "Methodology",
      viz: { key: "matrix", props: {} }
    },
    {
      id: "capex",
      navLabel: "Investment",
      viz: { key: "bars", props: {} }
    },
    {
      id: "emissions",
      navLabel: "Emissions",
      viz: { key: "scatter", props: {} }
    },
    {
      id: "conclusion",
      navLabel: "Conclusion",
      viz: { key: "timeline", props: {} }
    }
  ]
};
