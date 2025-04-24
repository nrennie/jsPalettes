function palettePlot(colPalette) {
  const width = 600;
  const padding = 10;
  const n = colPalette.length;
  const boxSize = width / n;
  const height = boxSize + padding * 2;

  const labels = d3.range(n).map(i => String.fromCharCode(65 + i)); 

  const data = d3.range(n).map(i => ({
    x: labels[i],
    y: 1,
    colour: colPalette[i]
  }));

  const chartContainer = d3.select("#plot")
    .style('background-color', "#F0F5F5")
    .style('padding', padding + 'px')
    .style('width', width + padding*2 + 'px');

  const svg = chartContainer
    .append('svg')
    .attr('viewBox', `0 0 ${width} ${height}`)
    .attr('preserveAspectRatio', 'xMidYMid meet')
    .style('width', '100%')
    .style('height', 'auto')
    .append('g'); 

  const x = d3.scaleBand()
    .range([0, width])
    .domain(labels)
    .padding(0.05);

  svg.selectAll('rect')
    .data(data)
    .enter()
    .append('rect')
    .attr('x', d => x(d.x))
    .attr('y', padding)
    .attr('width', x.bandwidth())
    .attr('height', x.bandwidth()) 
    .style('fill', d => d.colour)
    .style('stroke', 'none');
  
}

window.onload = function () {
  palettePlot(PrettyCols.Lucent.colors);
};
