import moment from "moment";

const getOrCreateTooltip = (chart: any) => {
    let tooltipEl = chart.canvas.parentNode.querySelector("div");

    if (!tooltipEl) {
        tooltipEl = document.createElement("div");
        tooltipEl.style.background = "white";
        tooltipEl.style.borderRadius = "8px";
        tooltipEl.style.color = "black";
        tooltipEl.style.opacity = 1;
        tooltipEl.style.pointerEvents = "none";
        tooltipEl.style.position = "absolute";
        tooltipEl.style.top = 0;
        tooltipEl.style.transform = "translate(-50%, 0%)";
        tooltipEl.style.transition = "all .1s ease";
        tooltipEl.style.boxShadow = "0px 0px 10px #c9c9c9";
        tooltipEl.style.fontFamily = "Inter";
    
        const table = document.createElement("div");
        table.style.margin = "10px";
    
        tooltipEl.appendChild(table);
        chart.canvas.parentNode.appendChild(tooltipEl);
    }

    return tooltipEl;
};

export const externalTooltipHandler = (context: any) => {
    const { chart, tooltip } = context;
    const tooltipEl = getOrCreateTooltip(chart);

    if (tooltip.opacity === 0) {
        tooltipEl.style.opacity = 0;
        return;
    }

    if (tooltip.body) {
        const titleLines = tooltip.title || [];
        const bodyLines = tooltip.body.map((b: any) => b.lines);
    
        const tableHead = document.createElement("div");
    
        titleLines.forEach((title: any) => {
            const tr = document.createElement("div");
            tr.style.fontSize = "20px";
            tr.style.fontWeight = "bold";
            tr.style.marginBottom = "10px";
    
            const th = document.createElement("div");
            th.style.borderWidth = "0";
            const text = document.createTextNode(moment(title).format("DD MMMM"));
    
            th.appendChild(text);
            tr.appendChild(th);
            tableHead.appendChild(tr);
        });

        const tableBody = document.createElement("div");
        bodyLines.forEach((body: any, i: number) => {
            const colors = tooltip.labelColors[i];
    
            const span = document.createElement("div");
            span.style.background = colors.backgroundColor;
            span.style.borderColor = colors.borderColor;
            span.style.borderWidth = "2px";
            span.style.marginRight = "7px";
            span.style.height = "7px";
            span.style.width = "7px";
            span.style.display = "inline-block";
            span.style.borderRadius = "50px";
    
            const tr = document.createElement("div");
            tr.style.backgroundColor = "inherit";
            tr.style.borderWidth = "0";
    
            const td = document.createElement("div");
            td.style.borderWidth = "0";
    
            const text = document.createTextNode(body);
    
            td.appendChild(span);
            td.appendChild(text);
            tr.appendChild(td);
            tableBody.appendChild(tr);
        });

        const tableRoot = tooltipEl.querySelector("div");

        while (tableRoot.firstChild) {
            tableRoot.firstChild.remove();
        }

        tableRoot.appendChild(tableHead);
        tableRoot.appendChild(tableBody);
    }

    const { offsetLeft: positionX, offsetTop: positionY } = chart.canvas;

    tooltipEl.style.opacity = 1;
    tooltipEl.style.left = positionX + tooltip.caretX + "px";
    tooltipEl.style.top = positionY + tooltip.caretY + "px";
    tooltipEl.style.font = tooltip.options.bodyFont.string;
    tooltipEl.style.padding =
    tooltip.options.padding + "px " + tooltip.options.padding + "px";
    
};