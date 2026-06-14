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
        title: "Global Green Bond Issuance (USD bn)",
        mount: "svg",
        legend: true,
        props: {
          series: ["Green Bond Issuance"],
          colors: { "Green Bond Issuance": "#1E8449" },
          yScale: "log", // Ensures the recent acceleration stays readable
          data: [
            { year: 2014, "Green Bond Issuance": 37 },
            { year: 2016, "Green Bond Issuance": 87 },
            { year: 2018, "Green Bond Issuance": 171 },
            { year: 2020, "Green Bond Issuance": 290 },
            { year: 2022, "Green Bond Issuance": 487 }
          ],
          annotation: { year: 2018, label: "Market Acceleration" }
        }
      }
    },
    {
      id: "machine",
      navLabel: "The Claim",
      mobileLabel: "The Claim",
      viz: {
        key: "sem",
        title: "The Chain the Market Assumes",
        mount: "svg",
        props: {
          nodes: [
            { id: "gb", label: "Green Bond\nIssuance", x: 30, y: 120, w: 110, h: 56, color: "#1E8449" },
            { id: "capex", label: "CAPEX /\nAssets (H1)", x: 240, y: 120, w: 110, h: 56, color: "#1E8449" },
            { id: "ghg", label: "Scope 1 & 2\nIntensity (H2)", x: 450, y: 120, w: 110, h: 56, color: "#1E8449" },
            { id: "cert", label: "External\nReview (H3)", x: 135, y: 220, w: 110, h: 56, color: "#1E8449" }
          ],
          paths: [
            { from: "gb", to: "capex", sig: true, coef: "Expected +" },
            { from: "capex", to: "ghg", sig: true, coef: "Expected -" },
            { from: "cert", to: "capex", sig: true, coef: "Strengthens" }
          ],
          legend: { sigLabel: "Hypothesised effect", insigLabel: "No measurable effect" }
        }
      }
    },
    {
      id: "methodology",
      navLabel: "Method",
      mobileLabel: "Matching",
      viz: {
        key: "bubbles",
        title: "Covariate Balancing via Exact Matching",
        mount: "svg",
        props: {
          centers: [
            { id: "treated", label: "Treated\nIssuers", dx: -90, dy: 10, r: 46, color: "#1E8449" },
            { id: "control", label: "Matched\nControls", dx: 90, dy: 10, r: 46, color: "#7F8C8D" }
          ],
          vars: [
            { label: "Firm Size\n(log assets)", cat: "media", angle: -90, dist: 130, r: 32, color: "#2980B9" },
            { label: "Region", cat: "media", angle: -30, dist: 150, r: 28, color: "#2980B9" },
            { label: "Industry\n(SIC)", cat: "socio", angle: 210, dist: 150, r: 28, color: "#2980B9" },
            { label: "Pre-Trend\nEmissions", cat: "socio", angle: 90, dist: 130, r: 32, color: "#2980B9" }
          ],
          cornerLabels: { media: "MATCHING COVARIATES", socioEcon: "BALANCED SAMPLE" }
        }
      }
    },
    {
      id: "capex",
      navLabel: "Investment",
      mobileLabel: "CAPEX",
      viz: {
        key: "scatter",
        title: "Dynamic Effect on CAPEX / Assets (Callaway-Sant'Anna)",
        mount: "svg",
        props: {
          xLabel: "Years relative to issuance",
          yLabel: "ATT on CAPEX / Assets",
          xName: "Event time",
          yName: "ATT",
          xTickSuffix: "",
          yTickSuffix: "",
          xDomain: [-10, 5],
          yDomain: [-0.02, 0.02],
          showTrendLine: false,
          referenceLine: { y: 0, label: "No effect", color: "#7F8C8D" },
          vLine: { x: 0, label: "Issuance", color: "#1E8449" },
          islandColors: { "Pre-issuance": "#95A5A6", "Post-issuance": "#1E8449" },
          provinces: [
            { name: "t-10", x: -10, y: 0.001, ylo: -0.005, yhi: 0.007, group: "Pre-issuance" },
            { name: "t-9", x: -9, y: -0.002, ylo: -0.008, yhi: 0.004, group: "Pre-issuance" },
            { name: "t-8", x: -8, y: 0.000, ylo: -0.006, yhi: 0.006, group: "Pre-issuance" },
            { name: "t-7", x: -7, y: 0.001, ylo: -0.005, yhi: 0.007, group: "Pre-issuance" },
            { name: "t-6", x: -6, y: -0.001, ylo: -0.007, yhi: 0.005, group: "Pre-issuance" },
            { name: "t-5", x: -5, y: 0.000, ylo: -0.006, yhi: 0.006, group: "Pre-issuance" },
            { name: "t-4", x: -4, y: 0.001, ylo: -0.006, yhi: 0.008, group: "Pre-issuance" },
            { name: "t-3", x: -3, y: -0.001, ylo: -0.007, yhi: 0.006, group: "Pre-issuance" },
            { name: "t-2", x: -2, y: 0.000, ylo: -0.006, yhi: 0.006, group: "Pre-issuance" },
            { name: "t-1", x: -1, y: 0.001, ylo: -0.005, yhi: 0.007, group: "Pre-issuance" },
            { name: "t0", x: 0, y: 0.002, ylo: -0.005, yhi: 0.009, group: "Post-issuance" },
            { name: "t+1", x: 1, y: 0.002, ylo: -0.005, yhi: 0.009, group: "Post-issuance" },
            { name: "t+2", x: 2, y: 0.003, ylo: -0.005, yhi: 0.010, group: "Post-issuance" },
            { name: "t+3", x: 3, y: 0.002, ylo: -0.006, yhi: 0.010, group: "Post-issuance" },
            { name: "t+4", x: 4, y: 0.001, ylo: -0.008, yhi: 0.010, group: "Post-issuance" },
            { name: "t+5", x: 5, y: 0.000, ylo: -0.009, yhi: 0.009, group: "Post-issuance" }
          ]
        }
      }
    },
    {
      id: "hypotheses",
      navLabel: "Significance",
      mobileLabel: "Null Test",
      viz: {
        key: "scatter",
        title: "Simplified Estimates vs 5% Threshold",
        mount: "svg",
        props: {
          xLabel: "Hypothesis tested",
          yLabel: "Share of 5% threshold reached",
          xName: "Test",
          yName: "Value",
          xTickSuffix: "",
          yTickSuffix: "",
          xDomain: [0, 4],
          yDomain: [-1.2, 1.2],
          showTrendLine: false,
          referenceLine: { y: 0, label: "Zero Effect", color: "#7F8C8D" },
          islandColors: { "H1": "#2980B9", "H2": "#D4AC0D", "H3": "#C0392B" },
          provinces: [
            { name: "H1: CAPEX", x: 1, y: 0.26, ylo: -0.26, yhi: 0.78, group: "H1" },
            { name: "H2: GHG", x: 2, y: -0.31, ylo: -0.95, yhi: 0.33, group: "H2" },
            { name: "H3: Cert", x: 3, y: 0.51, ylo: -0.49, yhi: 1.51, group: "H3" }
          ]
        }
      }
    },
    {
      id: "robustness",
      navLabel: "Robustness",
      mobileLabel: "Robust",
      viz: {
        key: "bubbles",
        title: "The Null Survives Every Specification",
        mount: "svg",
        props: {
          centers: [
            { id: "null", label: "Tight\nNull", dx: 0, dy: 0, r: 50, color: "#7F8C8D" }
          ],
          vars: [
            { label: "Broad\nPool", cat: "media", angle: -45, dist: 130, r: 35, color: "#95A5A6" },
            { label: "4 Bins", cat: "media", angle: -135, dist: 130, r: 35, color: "#95A5A6" },
            { label: "Post-2015", cat: "socio", angle: 45, dist: 130, r: 35, color: "#95A5A6" },
            { label: "Placebo\n(t-2)", cat: "socio", angle: 135, dist: 130, r: 35, color: "#95A5A6" }
          ],
          cornerLabels: { media: "SPECIFICATIONS", socioEcon: "ROBUSTNESS CHECKS" }
        }
      }
    },
    {
      id: "verdict",
      navLabel: "The Verdict",
      mobileLabel: "Verdict",
      viz: {
        key: "sem",
        title: "The Mechanism, Measured",
        mount: "svg",
        props: {
          nodes: [
            { id: "gb", label: "Green Bond\nIssuance", x: 30, y: 120, w: 110, h: 56, color: "#1E8449" },
            { id: "capex", label: "CAPEX /\nAssets (H1)", x: 240, y: 120, w: 110, h: 56, color: "#7F8C8D" },
            { id: "ghg", label: "Scope 1 & 2\nIntensity (H2)", x: 450, y: 120, w: 110, h: 56, color: "#7F8C8D" },
            { id: "cert", label: "External\nReview (H3)", x: 135, y: 220, w: 110, h: 56, color: "#7F8C8D" }
          ],
          paths: [
            { from: "gb", to: "capex", sig: false, coef: "Tight null (0.002)" },
            { from: "capex", to: "ghg", sig: false, coef: "Not detected" },
            { from: "cert", to: "capex", sig: false, coef: "n.s. (H3)" }
          ],
          legend: { sigLabel: "Hypothesised effect", insigLabel: "No measurable effect" }
        }
      }
    },
    {
      id: "implication",
      navLabel: "Implication",
      mobileLabel: "Why",
      viz: {
        key: "upgrade",
        title: "Capital Fungibility: Why the Money Does Not Move the Needle",
        mount: "svg",
        props: {} // Renders the flow diagram from the upgrade blueprint
      }
    },
    {
      id: "conclusion",
      navLabel: "Connect",
      mobileLabel: "Connect",
      viz: {
        key: "equation",
        title: "The Fungibility Identity",
        mount: "svg",
        props: {
          formula: "Total Assets_{t+1} = \\sum (Green_{t} + Conventional_{t})",
          labels: [
            "Green bonds do not create new investment,",
            "they re-label existing cash flow priorities."
          ]
        }
      }
    }
  ]
};
