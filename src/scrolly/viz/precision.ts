type PrecisionArgs = { mountEl: SVGSVGElement; panelEl?: HTMLElement; props?: any };
export default function renderPrecision({ mountEl, panelEl, props }: PrecisionArgs) {
    const d3 = (globalThis as any).d3;
    if (!d3) return;
    mountEl.replaceChildren();
    const W = 600, H = 450;
    const svg = d3.select(mountEl).attr("viewBox", `0 0 ${W} ${H}`);

    const cx = W / 2;
    const cy = H / 2;

    const prevTooltip = panelEl?.querySelector(".d3-tooltip") || document.body.querySelector(".d3-tooltip-precision");
    if (prevTooltip) prevTooltip.remove();

    // Choose container for tooltip
    const tooltipTarget = panelEl ? d3.select(panelEl) : d3.select("body");
    const tooltip = tooltipTarget.append("div").attr("class", panelEl ? "d3-tooltip" : "d3-tooltip d3-tooltip-precision");

    // New, backward-compatible options.
    const domain = (props?.domain || [-1, 1]) as [number, number];
    const centerLabel = props?.centerLabel ?? "Perfect Precision (0)";
    const legendLabel = props?.legendLabel ?? "Each dot represents a province";
    const valueName = props?.valueName ?? "Precision";
    const dotColor = props?.color ?? "#E74C3C";
    const minLabel = props?.minLabel as string | undefined;
    const maxLabel = props?.maxLabel as string | undefined;

    svg.append("line").attr("x1", 50).attr("y1", cy).attr("x2", W - 50).attr("y2", cy).attr("stroke", "var(--ink-muted)").attr("stroke-width", 2);
    svg.append("circle").attr("cx", cx).attr("cy", cy).attr("r", 5).attr("fill", "var(--paper, white)").attr("stroke", "var(--ink-muted)").attr("stroke-width", 2);

    // Center reference label
    svg.append("text").attr("x", cx).attr("y", cy - 15).attr("text-anchor", "middle").attr("fill", "var(--ink)").text(centerLabel);

    // Optional axis-end labels
    if (minLabel) {
        svg.append("text").attr("x", 50).attr("y", cy - 15).attr("text-anchor", "start")
            .attr("fill", "var(--ink-muted)").style("font-size", "11px").style("font-style", "italic").text(minLabel);
    }
    if (maxLabel) {
        svg.append("text").attr("x", W - 50).attr("y", cy - 15).attr("text-anchor", "end")
            .attr("fill", "var(--ink-muted)").style("font-size", "11px").style("font-style", "italic").text(maxLabel);
    }

    const data = props?.data || [
        { p: "Sample A", v: -0.95 }, { p: "Sample B", v: -0.5 }, { p: "Sample C", v: 0.68 }, { p: "Sample D", v: 0.95 }
    ];
    const xScale = d3.scaleLinear().domain(domain).range([50, W - 50]);

    const dots = svg.selectAll(".dot")
        .data(data)
        .enter()
        .append("circle")
        .attr("class", "dot")
        .attr("cx", cx)
        .attr("cy", cy)
        .attr("r", 8) // slightly bigger footprint
        .attr("fill", dotColor)
        .attr("opacity", 0)

    // Add interactive DOM tooltip
    dots.on("mouseover", function (this: SVGCircleElement, evt: any, d: any) {
        d3.select(this)
            .attr("stroke", "var(--paper)")
            .attr("stroke-width", 2)
            .attr("r", 10)
            .attr("opacity", 1)
            .raise(); // Pull hovered dot to front

        tooltip
            .classed("visible", true)
            .html(`<strong>${d.p}</strong><br>${valueName}: ${d.v > 0 ? "+" : ""}${d.v}`)
            .style("left", evt.offsetX + 12 + "px")
            .style("top", evt.offsetY - 30 + "px");
    }).on("mouseout", function (this: SVGCircleElement) {
        d3.select(this)
            .attr("stroke", "none")
            .attr("stroke-width", 0)
            .attr("r", 8)
            .attr("opacity", 0.7);

        tooltip.classed("visible", false);
    });

    dots.transition().delay((_: any, i: number) => i * 100).duration(800)
        .attr("cx", (d: any) => xScale(d.v))
        .attr("opacity", 0.7);

    // Legend to explain the dots
    const legendG = svg.append("g").attr("transform", `translate(${cx}, ${cy + 60})`);

    legendG.append("circle")
        .attr("cx", -105)
        .attr("cy", 0)
        .attr("r", 6)
        .attr("fill", dotColor)
        .attr("opacity", 0.8);

    legendG.append("text")
        .attr("x", -90)
        .attr("y", 5)
        .attr("fill", "var(--ink-muted)")
        .attr("font-size", "14px")
        .attr("font-family", "Inter, sans-serif")
        .attr("text-anchor", "start")
        .text(legendLabel);
}
