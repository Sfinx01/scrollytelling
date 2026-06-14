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
      mobileLabel: "Growth",
      viz: {
        key: "timeline",
        title: "Growth of the Corporate Green Bond Market",
        mount: "svg",
        legend: true,
        props: {
          series: ["Green Bonds", "Conventional"],
          colors: { "Green Bonds": "#1E8449", "Conventional": "#7F8C8D" },
          data: [
            { year: 2014, "Green Bonds": 5, "Conventional": 80 },
            { year: 2016, "Green Bonds": 15, "Conventional": 85 },
            { year: 2018, "Green Bonds": 40, "Conventional": 90 },
            { year: 2020, "Green Bonds": 85, "Conventional": 92 },
            { year: 2022, "Green Bonds": 150, "Conventional": 95 }
          ],
          annotation: { year: 2018, label: "Market Acceleration" }
        }
      }
    },
    {
      id: "flaw",
      navLabel: "The Flaw",
      mobileLabel: "Fungibility",
      viz: {
        key: "bubbles",
        title: "Capital Fungibility Map",
        mount: "svg",
        props: {
          centers: [
            { id: "green", label: "Green\nProjects", dx: -110, dy: 0, r: 44, color: "#1E8449" },
            { id: "brown", label: "General\nCashflow", dx: 110, dy: 0, r: 44, color: "#7F8C8D" }
          ],
          vars: [
            { label: "Bond Proceeds", cat: "media", angle: -100, dist: 190, r: 30, color: "#27AE60" },
            { label: "Existing Capital", cat: "media", angle: -40, dist: 185, r: 30, color: "#95A5A6" }
          ],
          cornerLabels: {
            media: "CAPITAL INFLOW",
            socioEcon: "PROJECT OUTFLOW"
          }
        }
      }
    },
    {
      id: "methodology",
      navLabel: "Methodology",
      mobileLabel: "Matching",
      viz: {
        key: "matrix",
        title: "Coarsened Exact Matching Criteria",
        mount: "svg",
        props: {
          parties: ["Firm Size", "Region", "Industry", "Pre-Emissions"],
          media: ["Treated (Green)", "Control (Conv.)"],
          sigData: {
            "Firm Size": { "Treated (Green)": "Matched", "Control (Conv.)": "Matched" },
            "Region": { "Treated (Green)": "Matched", "Control (Conv.)": "Matched" },
            "Industry": { "Treated (Green)": "Matched", "Control (Conv.)": "Matched" },
            "Pre-Emissions": { "Treated (Green)": "Matched", "Control (Conv.)": "Matched" }
          }
        }
      }
    },
    {
      id: "capex",
      navLabel: "Investment",
      mobileLabel: "CAPEX",
      viz: {
        key: "bars",
        title: "CAPEX-to-Assets Ratio Post-Issuance",
        mount: "svg",
        props: {
          data: [
            { party: "T=0", media: 4.8, combined: 4.8 },
            { party: "T+1", media: 5.1, combined: 5.2 },
            { party: "T+2", media: 5.4, combined: 5.3 }
          ],
          colors: { media: "#1E8449", combined: "#7F8C8D" },
          highlight: { party: "T+2", key: "media", value: 5.4 }
        }
      }
    },
    {
      id: "emissions",
      navLabel: "Emissions",
      mobileLabel: "Emissions",
      viz: {
        key: "sem",
        title: "Testing the Physical Transition",
        mount: "svg",
        props: {
          nodes: [
            { id: "gb", label: "Green Bond\nIssuance", x: 80, y: 140, w: 100, h: 50, color: "#1E8449" },
            { id: "capex", label: "CAPEX", x: 480, y: 80, w: 100, h: 50, color: "#7F8C8D" },
            { id: "ghg", label: "Scope 1 & 2\nIntensity", x: 480, y: 200, w: 100, h: 50, color: "#7F8C8D" }
          ],
          paths: [
            { from: "gb", to: "capex", sig: false, coef: "Tight Null" },
            { from: "gb", to: "ghg", sig: false, coef: "High Variance" }
          ],
          legend: { sigLabel: "Significant Change", insigLabel: "No Measurable Effect" }
        }
      }
    },
    {
      id: "conclusion",
      navLabel: "Conclusion",
      mobileLabel: "Summary",
      viz: {
        key: "equation",
        title: "Signaling vs. Transition",
        mount: "svg",
        props: {}
      }
    }
  ]
};
