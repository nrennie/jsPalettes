const paletteFiles = {
  PrettyCols,
  Pride
};

// Plot palette as heatmap
function palettePlot(colPalette, plotID) {

  const width = 800;
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

  d3.select(plotID).html(''); // Clear previous chart

  const chartContainer = d3.select(plotID)
    .style('background-color', "#F0F5F5")
    .style('padding', padding + 'px')
    .style('width', width + padding * 2 + 'px');

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

// Add text
function paletteText(fileName, paletteName) {
  
  const width = 800;
  const padding = 10;
  const height = 200;

  d3.select("#plotText").html(''); // Clear previous chart

  const chartContainer = d3.select("#plotText")
    .style('background-color', "#F0F5F5")
    .style('padding', padding + 'px')
    .style('width', width + padding * 2 + 'px');

  const svg = chartContainer
    .append('svg')
    .attr('viewBox', `0 0 ${width} ${height}`)
    .attr('preserveAspectRatio', 'xMidYMid meet')
    .style('width', '100%')
    .style('height', 'auto')
    .append('g');

  svg.append("text")
    .attr("text-anchor", "middle")
    .attr("y", 25)
    .attr("x", width/2)
    .attr('class', 'plotText')
    .text("Include this palette collection in a project by adding:")
    .style("fill", "#2F4F4F")
    .style("font-size", "large");

  svg.append("text")
    .attr("text-anchor", "middle")
    .attr("y", 50)
    .attr("x", width/2)
    .attr('class', 'code')
    .text("<script src='https://nrennie.rbind.io/jsPalettes/" + fileName + ".js'></script>")
    .style("fill", "#2F4F4F")
    .style("font-size", "large");

  svg.append("text")
    .attr("text-anchor", "middle")
    .attr("y", 100)
    .attr("x", width/2)
    .attr('class', 'plotText')
    .text("Then access the palette using:")
    .style("fill", "#2F4F4F")
    .style("font-size", "large");

  svg.append("text")
    .attr("text-anchor", "middle")
    .attr("y", 125)
    .attr("x", width/2)
    .attr('class', 'code')
    .text(fileName + "." + paletteName + ".colors")
    .style("fill", "#2F4F4F")
    .style("font-size", "large");
}

function populateDropdowns() {
  const fileNames = Object.keys(paletteFiles);

  // File selector
  const fileDropdown = d3.select('#file-dropdown-container')
    .append('select')
    .attr('id', 'file-dropdown')
    .on('change', function () {
      const selectedFile = d3.select(this).property('value');
      updatePaletteDropdown(selectedFile);
    });

  fileDropdown.selectAll('option')
    .data(fileNames)
    .enter()
    .append('option')
    .text(d => d)
    .attr('value', d => d);

  // Initial palette load
  updatePaletteDropdown(fileNames[0]);
}

function updatePaletteDropdown(fileName) {
  const paletteNames = Object.keys(paletteFiles[fileName]);

  // Remove and re-add dropdown to ensure fresh handler
  d3.select('#palette-dropdown').remove();

  const paletteDropdown = d3.select('#palette-dropdown-container')
    .append('select')
    .attr('id', 'palette-dropdown')
    .on('change', function () {
      const selectedPalette = d3.select(this).property('value');
      const colPalette = paletteFiles[fileName][selectedPalette].colors;
      const greyPalette = toGreyscale(colPalette);
      palettePlot(colPalette, "#plot"); 
      palettePlot(greyPalette, "#plotBW");
      paletteText(fileName, selectedPalette)
    });

  paletteDropdown.selectAll('option')
    .data(paletteNames)
    .enter()
    .append('option')
    .text(d => d)
    .attr('value', d => d);

  paletteDropdown.dispatch('change');
}
window.onload = function () {
  populateDropdowns();
};
