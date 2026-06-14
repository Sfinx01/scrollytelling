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
            { id: "gb", label: "Green Bond\nIssuance", x: 40, y: 120, w: 120, h: 56, color: "#1E8449" },
            { id: "capex", label: "CAPEX /\nAssets (H1)", x: 470, y: 50, w: 120, h: 56, color: "#1E8449" },
            { id: "ghg", label: "Scope 1 & 2\nIntensity (H2)", x: 470, y: 190, w: 120, h: 56, color: "#1E8449" },
            { id: "cert", label: "External\nReview (H3)", x: 250, y: 200, w: 120, h: 56, color: "#1E8449" }
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
        key: "matrix",
        title: "Cohort-Aware Coarsened Exact Matching",
        mount: "svg",
        props: {
          parties: ["Firm Size", "Region", "Industry", "Pre-Emissions Trend"],
          media: ["Coarsening", "Post-Match Balance"],
          sigData: {
            "Firm Size": { "Coarsening": "5 bins (log assets)", "Post-Match Balance": "Balanced" },
            "Region": { "Coarsening": "Exact", "Post-Match Balance": "Balanced" },
            "Industry": { "Coarsening": "Exact (SIC division)", "Post-Match Balance": "Balanced" },
            "Pre-Emissions Trend": { "Coarsening": "5 bins (level fallback)", "Post-Match Balance": "Balanced" }
          }
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
          // PLACEHOLDER event-study points: replace with your aggte(type="dynamic")
          // output. y = att.egt, ylo = att.egt - 1.96*se.egt, yhi = att.egt + 1.96*se.egt.
          xLabel: "Years relative to issuance",
          yLabel: "ATT on CAPEX / Assets",
          xName: "Event time",
          yName: "ATT",
          xTickSuffix: "",
          yTickSuffix: "",
          xDomain: [-5, 5],
          yDomain: [-0.02, 0.02],
          showTrendLine: false,
          referenceLine: { y: 0, label: "No effect", color: "#7F8C8D" },
          vLine: { x: 0, label: "Issuance", color: "#1E8449" },
          islandColors: { "Pre-issuance": "#95A5A6", "Post-issuance": "#1E8449" },
          provinces: [
            { name: "t-4", x: -4, y: 0.001, ylo: -0.006, yhi: 0.008, group: "Pre-issuance" },
            { name: "t-3", x: -3, y: -0.001, ylo: -0.007, yhi: 0.006, group: "Pre-issuance" },
            { name: "t-2", x: -2, y: 0.000, ylo: -0.006, yhi: 0.006, group: "Pre-issuance" },
            { name: "t-1", x: -1, y: 0.001, ylo: -0.005, yhi: 0.007, group: "Pre-issuance" },
            { name: "t0", x: 0, y: 0.002, ylo: -0.005, yhi: 0.009, group: "Post-issuance" },
            { name: "t+1", x: 1, y: 0.002, ylo: -0.005, yhi: 0.009, group: "Post-issuance" },
            { name: "t+2", x: 2, y: 0.003, ylo: -0.005, yhi: 0.010, group: "Post-issuance" },
            { name: "t+3", x: 3, y: 0.002, ylo: -0.006, yhi: 0.010, group: "Post-issuance" },
            { name: "t+4", x: 4, y: 0.001, ylo: -0.008, yhi: 0.010, group: "Post-issuance" }
          ]
        }
      }
    },
    {
      id: "hypotheses",
      navLabel: "Significance",
      mobileLabel: "Null Test",
      viz: {
        key: "precision",
        title: "Distance From Significance: All Three Hypotheses",
        mount: "svg",
        props: {
          // v = coefficient / (1.96 * SE): the share of the 5% critical value reached.
          // |v| >= 1 would clear the threshold. All three sit well short of it.
          domain: [-1, 1],
          centerLabel: "No measurable effect (0)",
          legendLabel: "Each dot is a tested hypothesis; the edge marks 5% significance",
          valueName: "Share of 5% threshold",
          color: "#1E8449",
          minLabel: "Significant -",
          maxLabel: "Significant +",
          data: [
            { p: "H1: CAPEX / assets", v: 0.26 },
            { p: "H2: Carbon intensity", v: 0.31 },
            { p: "H3: Certification gap", v: 0.51 }
          ]
        }
      }
    },
    {
      id: "robustness",
      navLabel: "Robustness",
      mobileLabel: "Robust",
      viz: {
        key: "matrix",
        title: "The Null Survives Every Specification",
        mount: "svg",
        props: {
          parties: [
            "Matched conventional pool",
            "Broad Compustat pool",
            "CEM: 4 bins",
            "CEM: 8 bins",
            "Post-2015 cohorts",
            "Placebo (t-2)"
          ],
          media: ["CAPEX ATT", "Significant?"],
          sigData: {
            "Matched conventional pool": { "CAPEX ATT": "0.004", "Significant?": "No" },
            "Broad Compustat pool": { "CAPEX ATT": "0.003", "Significant?": "No" },
            "CEM: 4 bins": { "CAPEX ATT": "0.0025", "Significant?": "No" },
            "CEM: 8 bins": { "CAPEX ATT": "0.0038", "Significant?": "No" },
            "Post-2015 cohorts": { "CAPEX ATT": "0.0029", "Significant?": "No" },
            "Placebo (t-2)": { "CAPEX ATT": "~0", "Significant?": "Correctly null" }
          }
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
            { id: "gb", label: "Green Bond\nIssuance", x: 40, y: 120, w: 120, h: 56, color: "#1E8449" },
            { id: "capex", label: "CAPEX /\nAssets (H1)", x: 470, y: 50, w: 120, h: 56, color: "#7F8C8D" },
            { id: "ghg", label: "Scope 1 & 2\nIntensity (H2)", x: 470, y: 190, w: 120, h: 56, color: "#7F8C8D" },
            { id: "cert", label: "External\nReview (H3)", x: 250, y: 200, w: 120, h: 56, color: "#7F8C8D" }
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
        key: "bubbles",
        title: "Capital Fungibility: Why the Money Does Not Move the Needle",
        mount: "svg",
        props: {
          centers: [
            { id: "green", label: "Green-Labelled\nProjects", dx: -110, dy: 0, r: 46, color: "#1E8449" },
            { id: "cash", label: "Firm-Wide\nCash Flow", dx: 110, dy: 0, r: 46, color: "#7F8C8D" }
          ],
          vars: [
            { label: "Bond Proceeds", cat: "media", angle: -110, dist: 190, r: 30, color: "#27AE60" },
            { label: "Displaced Spend", cat: "media", angle: -40, dist: 185, r: 30, color: "#95A5A6" }
          ],
          cornerLabels: {
            media: "CAPITAL IN",
            socioEcon: "WHERE IT GOES"
          }
        }
      }
    },
    {
      id: "conclusion",
      navLabel: "Connect",
      mobileLabel: "Connect",
      viz: {
        key: "equation",
        title: "Signalling, Not Transition",
        mount: "svg",
        props: {}
      }
    }
  ]
};
