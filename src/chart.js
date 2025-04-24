const paletteFiles = {
  PrettyCols,
  Pride
};

function palettePlot(fileName, paletteName) {
  const colPalette = paletteFiles[fileName][paletteName].colors;

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

  d3.select("#plot").html(''); // Clear previous chart

  const chartContainer = d3.select("#plot")
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
      palettePlot(fileName, selectedPalette); // <-- uses correct fileName
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
