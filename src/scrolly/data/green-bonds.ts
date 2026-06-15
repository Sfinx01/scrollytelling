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
      { target: 179, label: "Matched Green Issuers" },
      { target: 294, label: "Matched Conventional Issuers" }
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
          // NOTE: issuance figures are indicative (Climate Bonds Initiative style).
          // Drop in sourced values before publishing.
          series: ["issuance"],
          seriesLabels: { issuance: "Issuance" },
          colors: { issuance: "#1E8449" },
          yDomain: [0, 650],
          yTickSuffix: "",
          data: [
            { year: 2014, issuance: 37 },
            { year: 2015, issuance: 47 },
            { year: 2016, issuance: 87 },
            { year: 2017, issuance: 163 },
            { year: 2018, issuance: 171 },
            { year: 2019, issuance: 271 },
            { year: 2020, issuance: 297 },
            { year: 2021, issuance: 586 },
            { year: 2022, issuance: 487 }
          ],
          annotation: { year: 2015, label: "Paris Agreement" }
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
            { id: "gb", label: "Green Bond\nIssuance", x: 10, y: 150, w: 140, h: 58, color: "#1E8449" },
            { id: "capex", label: "CAPEX /\nAssets (H1)", x: 230, y: 150, w: 140, h: 58, color: "#1E8449" },
            { id: "ghg", label: "Scope 1 & 2\nIntensity (H2)", x: 450, y: 150, w: 140, h: 58, color: "#1E8449" },
            { id: "cert", label: "External\nReview (H3)", x: 50, y: 290, w: 140, h: 58, color: "#1E8449" },
            { id: "j1", label: "", x: 190, y: 179, w: 0, h: 0, color: "#1E8449", point: true }
          ],
          paths: [
            { from: "gb", to: "capex", sig: true, coef: "Expected +" },
            { from: "capex", to: "ghg", sig: true, coef: "Expected -" },
            { from: "cert", to: "j1", sig: true, coef: "Strengthens" }
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
        key: "scatter",
        title: "Covariate Balance: Before vs After Matching",
        mount: "svg",
        props: {
          // PLACEHOLDER SMDs: replace with the standardised mean differences from
          // Table_1_Imbalance.md (Panel A unmatched vs Panel B matched).
          xLabel: "Standardised mean difference (SMD)",
          yLabel: "",
          xName: "SMD",
          xTickSuffix: "",
          yTickSuffix: "",
          xDomain: [-0.6, 0.6],
          yDomain: [0.5, 5.5],
          showTrendLine: false,
          referenceLine: null,
          vLine: { x: 0, label: "Balanced", color: "#7F8C8D" },
          islandColors: { "Before matching": "#95A5A6", "After matching": "#1E8449" },
          yTickLabels: [
            { value: 5, label: "Firm size" },
            { value: 4, label: "Pre-emissions trend" },
            { value: 3, label: "Leverage" },
            { value: 2, label: "ROA" },
            { value: 1, label: "Disclosure" }
          ],
          provinces: [
            { name: "Firm size", x: 0.42, y: 5, group: "Before matching" },
            { name: "Firm size", x: 0.04, y: 5, group: "After matching" },
            { name: "Pre-emissions trend", x: -0.35, y: 4, group: "Before matching" },
            { name: "Pre-emissions trend", x: -0.05, y: 4, group: "After matching" },
            { name: "Leverage", x: 0.28, y: 3, group: "Before matching" },
            { name: "Leverage", x: 0.03, y: 3, group: "After matching" },
            { name: "ROA", x: -0.22, y: 2, group: "Before matching" },
            { name: "ROA", x: -0.04, y: 2, group: "After matching" },
            { name: "Disclosure", x: 0.31, y: 1, group: "Before matching" },
            { name: "Disclosure", x: 0.06, y: 1, group: "After matching" }
          ]
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
          // PLACEHOLDER event-study points over the -5/+5 window. Replace with
          // Table_CS_EventStudy.csv: y = att.egt, ylo = att - 1.96*se, yhi = att + 1.96*se.
          // One isolated pre-period point excludes zero (matches the p = 0.63 verdict).
          xLabel: "Years relative to issuance",
          yLabel: "ATT on CAPEX / Assets",
          xName: "Event time",
          yName: "ATT",
          xTickSuffix: "",
          yTickSuffix: "",
          xDomain: [-5.5, 5.5],
          yDomain: [-0.02, 0.02],
          showTrendLine: false,
          referenceLine: { y: 0, label: "No effect", color: "#7F8C8D" },
          vLine: { x: 0, label: "Issuance", color: "#1E8449" },
          islandColors: { "Pre-issuance": "#95A5A6", "Post-issuance": "#1E8449" },
          provinces: [
            { name: "t-5", x: -5, y: 0.000, ylo: -0.009, yhi: 0.009, group: "Pre-issuance" },
            { name: "t-4", x: -4, y: 0.001, ylo: -0.006, yhi: 0.008, group: "Pre-issuance" },
            { name: "t-3", x: -3, y: -0.008, ylo: -0.014, yhi: -0.002, group: "Pre-issuance" },
            { name: "t-2", x: -2, y: 0.000, ylo: -0.006, yhi: 0.006, group: "Pre-issuance" },
            { name: "t-1", x: -1, y: 0.001, ylo: -0.005, yhi: 0.007, group: "Pre-issuance" },
            { name: "t0", x: 0, y: 0.002, ylo: -0.005, yhi: 0.009, group: "Post-issuance" },
            { name: "t+1", x: 1, y: 0.002, ylo: -0.005, yhi: 0.009, group: "Post-issuance" },
            { name: "t+2", x: 2, y: 0.003, ylo: -0.005, yhi: 0.010, group: "Post-issuance" },
            { name: "t+3", x: 3, y: 0.002, ylo: -0.006, yhi: 0.010, group: "Post-issuance" },
            { name: "t+4", x: 4, y: 0.001, ylo: -0.008, yhi: 0.010, group: "Post-issuance" },
            { name: "t+5", x: 5, y: 0.002, ylo: -0.009, yhi: 0.013, group: "Post-issuance" }
          ]
        }
      }
    },
    {
      id: "robustness",
      navLabel: "Robustness",
      mobileLabel: "Robust",
      viz: {
        key: "scatter",
        title: "Robustness: CAPEX Effect Across Specifications",
        mount: "svg",
        props: {
          // Point estimates from the thesis robustness table; confirm against
          // Table_6_Robustness.md. CIs are approximate (drop in exact SEs).
          xLabel: "CAPEX ATT (95% CI)",
          yLabel: "",
          xName: "ATT",
          xTickSuffix: "",
          yTickSuffix: "",
          xDomain: [-0.006, 0.013],
          yDomain: [0.5, 6.5],
          showTrendLine: false,
          referenceLine: null,
          vLine: { x: 0, label: "No effect", color: "#7F8C8D" },
          islandColors: { Specification: "#1E8449" },
          yTickLabels: [
            { value: 6, label: "Matched pool" },
            { value: 5, label: "Broad pool" },
            { value: 4, label: "CEM 4 bins" },
            { value: 3, label: "CEM 6 bins" },
            { value: 2, label: "CEM 8 bins" },
            { value: 1, label: "Post-2015" }
          ],
          provinces: [
            { name: "Matched conventional pool", x: 0.004, xlo: -0.002, xhi: 0.010, y: 6, group: "Specification" },
            { name: "Broad Compustat pool", x: 0.003, xlo: -0.003, xhi: 0.009, y: 5, group: "Specification" },
            { name: "CEM 4 bins", x: 0.0025, xlo: -0.0035, xhi: 0.0085, y: 4, group: "Specification" },
            { name: "CEM 6 bins", x: 0.0057, xlo: -0.0005, xhi: 0.0119, y: 3, group: "Specification" },
            { name: "CEM 8 bins", x: 0.0038, xlo: -0.0022, xhi: 0.0098, y: 2, group: "Specification" },
            { name: "Post-2015 cohorts", x: 0.0029, xlo: -0.0031, xhi: 0.0089, y: 1, group: "Specification" }
          ]
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
            { id: "gb", label: "Green Bond\nIssuance", x: 10, y: 150, w: 140, h: 58, color: "#1E8449" },
            { id: "capex", label: "CAPEX /\nAssets (H1)", x: 230, y: 150, w: 140, h: 58, color: "#7F8C8D" },
            { id: "ghg", label: "Scope 1 & 2\nIntensity (H2)", x: 450, y: 150, w: 140, h: 58, color: "#7F8C8D" },
            { id: "cert", label: "External\nReview (H3)", x: 50, y: 290, w: 140, h: 58, color: "#7F8C8D" },
            { id: "j1", label: "", x: 190, y: 179, w: 0, h: 0, color: "#7F8C8D", point: true }
          ],
          paths: [
            { from: "gb", to: "capex", sig: false, coef: "Tight null (0.002)" },
            { from: "capex", to: "ghg", sig: false, coef: "Not detected" },
            { from: "cert", to: "j1", sig: false, coef: "n.s. (H3)" }
          ],
          legend: { sigLabel: "Hypothesised effect", insigLabel: "No measurable effect" }
        }
      }
    },
    {
      id: "takeaway",
      navLabel: "Takeaway",
      mobileLabel: "Takeaway",
      viz: {
        key: "sem",
        title: "Identifier, Not Engine",
        mount: "svg",
        props: {
          nodes: [
            { id: "firm", label: "Firm Is\nAlready Green", x: 10, y: 160, w: 150, h: 58, color: "#1E8449" },
            { id: "gb", label: "Issues a\nGreen Bond", x: 235, y: 160, w: 140, h: 58, color: "#1E8449" },
            { id: "behav", label: "Greener\nBehaviour", x: 450, y: 160, w: 140, h: 58, color: "#7F8C8D" }
          ],
          paths: [
            { from: "firm", to: "gb", sig: true, coef: "Reveals" },
            { from: "gb", to: "behav", sig: false, coef: "No effect" }
          ],
          legend: { sigLabel: "Real link (selection)", insigLabel: "No measurable effect" }
        }
      }
    }
  ]
};
