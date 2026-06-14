type ScatterArgs = {
  mountEl: SVGSVGElement;
  panelEl: HTMLElement;
  props?: any;
};

export default function renderScatter({ mountEl, panelEl, props }: ScatterArgs) {
  const d3 = (globalThis as any).d3;
  if (!d3) return;

  mountEl.replaceChildren();

  const W = 600;
  const H = 400;
  const M = { top: 20, right: 120, bottom: 55, left: 55 };
  const iW = W - M.left - M.right;
  const iH = H - M.top - M.bottom;

  const fallbackProvinces = [
    { name: "Aceh", radio: 52, turnout: 83.2, island: "Sumatra" },
    { name: "Sumatera Utara", radio: 55, turnout: 76.4, island: "Sumatra" },
    { name: "Sumatera Barat", radio: 58, turnout: 82.1, island: "Sumatra" },
    { name: "Riau", radio: 48, turnout: 77.8, island: "Sumatra" },
    { name: "Jambi", radio: 50, turnout: 79.5, island: "Sumatra" },
    { name: "Sumatera Selatan", radio: 45, turnout: 75.2, island: "Sumatra" },
    { name: "Bengkulu", radio: 55, turnout: 81.3, island: "Sumatra" },
    { name: "Lampung", radio: 49, turnout: 78.6, island: "Sumatra" },
    { name: "Kep. Bangka", radio: 53, turnout: 80.1, island: "Sumatra" },
    { name: "Kep. Riau", radio: 42, turnout: 71.2, island: "Sumatra" },
    { name: "DKI Jakarta", radio: 35, turnout: 68.9, island: "Java" },
    { name: "Jawa Barat", radio: 40, turnout: 72.3, island: "Java" },
    { name: "Jawa Tengah", radio: 52, turnout: 82.4, island: "Java" },
    { name: "DI Yogyakarta", radio: 56, turnout: 84.7, island: "Java" },
    { name: "Jawa Timur", radio: 54, turnout: 81.8, island: "Java" },
    { name: "Banten", radio: 38, turnout: 73.1, island: "Java" },
    { name: "Bali", radio: 60, turnout: 86.2, island: "Bali" },
    { name: "NTB", radio: 62, turnout: 84.9, island: "Nusa Tenggara" },
    { name: "NTT", radio: 65, turnout: 87.1, island: "Nusa Tenggara" },
    { name: "Kalimantan Barat", radio: 44, turnout: 74.5, island: "Kalimantan" },
    { name: "Kalimantan Tengah", radio: 47, turnout: 76.8, island: "Kalimantan" },
    { name: "Kalimantan Selatan", radio: 50, turnout: 79.2, island: "Kalimantan" },
    { name: "Kalimantan Timur", radio: 43, turnout: 72.6, island: "Kalimantan" },
    { name: "Kalimantan Utara", radio: 45, turnout: 74.1, island: "Kalimantan" },
    { name: "Sulawesi Utara", radio: 57, turnout: 83.5, island: "Sulawesi" },
    { name: "Sulawesi Tengah", radio: 55, turnout: 80.9, island: "Sulawesi" },
    { name: "Sulawesi Selatan", radio: 59, turnout: 84.3, island: "Sulawesi" },
    { name: "Sulawesi Tenggara", radio: 56, turnout: 82.7, island: "Sulawesi" },
    { name: "Gorontalo", radio: 60, turnout: 85.6, island: "Sulawesi" },
    { name: "Sulawesi Barat", radio: 58, turnout: 83.8, island: "Sulawesi" },
    { name: "Maluku", radio: 63, turnout: 86.0, island: "Maluku" },
    { name: "Maluku Utara", radio: 65, turnout: 87.5, island: "Maluku" },
    { name: "Papua Barat", radio: 61, turnout: 85.4, island: "Papua" },
    { name: "Papua", radio: 66, turnout: 88.0, island: "Papua" },
  ];

  const fallbackIslandColors: Record<string, string> = {
    Java: "#2C3E50",
    Sumatra: "#2980B9",
    Kalimantan: "#D4AC0D",
    Sulawesi: "#1E8449",
    Bali: "#C0392B",
    "Nusa Tenggara": "#8E44AD",
    Maluku: "#E67E22",
    Papua: "#16A085",
  };

  const provinces = (props?.provinces || fallbackProvinces) as Array<any>;
  const islandColors = (props?.islandColors || fallbackIslandColors) as Record<string, string>;
  const xDomain = (props?.xDomain || [32, 70]) as [number, number];
  const yDomain = (props?.yDomain || [65, 92]) as [number, number];
  const referenceLine = (props?.referenceLine || { y: 79, label: "Internet (flat)", color: "#2980B9" }) as {
    y: number;
    label: string;
    color: string;
  };
  const trendLineStyle = (props?.trendLine || { color: "#C0392B" }) as { color: string };

  // New, backward-compatible options.
  const xLabel = props?.xLabel ?? "Radio Consumption (% population)";
  const yLabel = props?.yLabel ?? "Voter Turnout (%)";
  const xName = props?.xName ?? "Radio";
  const yName = props?.yName ?? "Turnout";
  const xTickSuffix = props?.xTickSuffix ?? "%";
  const yTickSuffix = props?.yTickSuffix ?? "%";
  const showTrendLine = props?.showTrendLine ?? true;
  const vLine = props?.vLine as { x: number; label: string; color: string } | undefined;

  // Generic accessors so event-study data (x / y / group / ylo / yhi) works
  // alongside the original radio / turnout / island fields.
  const getX = (d: any) => (d.x ?? d.radio);
  const getY = (d: any) => (d.y ?? d.turnout);
  const getGroup = (d: any) => (d.group ?? d.island);

  const svg = d3
    .select(mountEl)
    .attr("viewBox", `0 0 ${W} ${H}`)
    .append("g")
    .attr("transform", `translate(${M.left},${M.top})`);

  const x = d3.scaleLinear().domain(xDomain).range([0, iW]);
  const y = d3.scaleLinear().domain(yDomain).range([iH, 0]);

  svg.append("g").attr("class", "grid").call(d3.axisLeft(y).ticks(5).tickSize(-iW).tickFormat(""));
  svg
    .append("g")
    .attr("class", "axis")
    .attr("transform", `translate(0,${iH})`)
    .call(d3.axisBottom(x).ticks(6).tickFormat((d: number) => d + xTickSuffix));
  svg.append("g").attr("class", "axis").call(d3.axisLeft(y).ticks(5).tickFormat((d: number) => d + yTickSuffix));

  svg
    .append("text")
    .attr("x", iW / 2)
    .attr("y", iH + 44)
    .attr("text-anchor", "middle")
    .style("font-family", "Inter,sans-serif")
    .style("font-size", "11px")
    .attr("fill", "var(--ink-muted)")
    .text(xLabel);
  svg
    .append("text")
    .attr("transform", "rotate(-90)")
    .attr("x", -iH / 2)
    .attr("y", -40)
    .attr("text-anchor", "middle")
    .style("font-family", "Inter,sans-serif")
    .style("font-size", "11px")
    .attr("fill", "var(--ink-muted)")
    .text(yLabel);

  // Optional OLS trend line (default on, for the original correlation use).
  if (showTrendLine) {
    const xVals = provinces.map((d) => getX(d));
    const yVals = provinces.map((d) => getY(d));
    const xMean = d3.mean(xVals);
    const yMean = d3.mean(yVals);
    const slope =
      d3.sum(xVals.map((xi: number, i: number) => (xi - xMean) * (yVals[i] - yMean))) /
      d3.sum(xVals.map((xi: number) => (xi - xMean) ** 2));
    const intercept = yMean - slope * xMean;

    const trendLine = svg
      .append("line")
      .attr("x1", x(xDomain[0]))
      .attr("y1", y(slope * xDomain[0] + intercept))
      .attr("x2", x(xDomain[0]))
      .attr("y2", y(slope * xDomain[0] + intercept))
      .attr("stroke", trendLineStyle.color)
      .attr("stroke-width", 2)
      .attr("stroke-dasharray", "6,3")
      .attr("opacity", 0.7);

    trendLine
      .transition()
      .delay(provinces.length * 40 + 200)
      .duration(800)
      .attr("x2", x(xDomain[1]))
      .attr("y2", y(slope * xDomain[1] + intercept));
  }

  // Optional vertical reference line (e.g. treatment timing in an event study).
  if (vLine) {
    svg
      .append("line")
      .attr("x1", x(vLine.x))
      .attr("y1", 0)
      .attr("x2", x(vLine.x))
      .attr("y2", iH)
      .attr("stroke", vLine.color)
      .attr("stroke-dasharray", "3,3")
      .attr("stroke-width", 1.5)
      .attr("opacity", 0.6);
    svg
      .append("text")
      .attr("x", x(vLine.x) + 4)
      .attr("y", 12)
      .attr("fill", vLine.color)
      .style("font-size", "10px")
      .style("font-family", "Inter,sans-serif")
      .style("font-style", "italic")
      .text(vLine.label);
  }

  const prevTooltip = panelEl.querySelector(".d3-tooltip");
  if (prevTooltip) prevTooltip.remove();
  const tooltip = d3.select(panelEl).append("div").attr("class", "d3-tooltip");

  // Optional confidence-interval whiskers (drawn when a point carries ylo / yhi).
  provinces.forEach((d) => {
    if (d.ylo == null || d.yhi == null) return;
    svg
      .append("line")
      .attr("x1", x(getX(d)))
      .attr("x2", x(getX(d)))
      .attr("y1", y(d.ylo))
      .attr("y2", y(d.yhi))
      .attr("stroke", islandColors[getGroup(d)] || "var(--ink-muted)")
      .attr("stroke-width", 1.5)
      .attr("opacity", 0.45);
  });

  provinces.forEach((d, i) => {
    svg
      .append("circle")
      .attr("cx", x(getX(d)))
      .attr("cy", y(getY(d)))
      .attr("r", 0)
      .attr("fill", islandColors[getGroup(d)] || "var(--ink-muted)")
      .attr("opacity", 0.8)
      .attr("stroke", "var(--paper)")
      .attr("stroke-width", 1.2)
      .on("mouseover", function (this: SVGCircleElement, evt: any) {
        d3.select(this).attr("r", 9).attr("opacity", 1);
        const ci = d.ylo != null && d.yhi != null ? `<br>95% CI: [${d.ylo}, ${d.yhi}]` : "";
        tooltip
          .classed("visible", true)
          .html(`<strong>${d.name}</strong><br>${xName}: ${getX(d)}${xTickSuffix}<br>${yName}: ${getY(d)}${yTickSuffix}${ci}`)
          .style("left", evt.offsetX + 12 + "px")
          .style("top", evt.offsetY - 40 + "px");
      })
      .on("mouseout", function (this: SVGCircleElement) {
        d3.select(this).attr("r", 6).attr("opacity", 0.8);
        tooltip.classed("visible", false);
      })
      .transition()
      .delay(i * 30 + 100)
      .duration(400)
      .attr("r", 6);
  });

  svg
    .append("line")
    .attr("x1", x(xDomain[0]))
    .attr("y1", y(referenceLine.y))
    .attr("x2", x(xDomain[1]))
    .attr("y2", y(referenceLine.y))
    .attr("stroke", referenceLine.color)
    .attr("stroke-dasharray", "4,4")
    .attr("stroke-width", 1.5)
    .attr("opacity", 0.4);

  svg
    .append("text")
    .attr("x", x(xDomain[1] - 2))
    .attr("y", y(referenceLine.y) - 7)
    .attr("text-anchor", "end")
    .attr("fill", referenceLine.color)
    .style("font-size", "10px")
    .style("font-family", "Inter,sans-serif")
    .style("font-style", "italic")
    .text(referenceLine.label);

  const islands = [...new Set(provinces.map((d) => getGroup(d)))];
  const legG = svg.append("g").attr("transform", `translate(${iW + 10}, 10)`);
  islands.forEach((isl, i) => {
    legG.append("circle").attr("cx", 6).attr("cy", i * 18).attr("r", 5).attr("fill", islandColors[isl as string]);
    legG
      .append("text")
      .attr("x", 16)
      .attr("y", i * 18 + 4)
      .style("font-size", "9px")
      .style("font-family", "Inter,sans-serif")
      .attr("fill", "var(--ink-muted)")
      .text(isl as string);
  });
}
