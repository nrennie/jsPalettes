function rgbToGreyscale(hex) {
    const rgb = d3.color(hex).rgb()
    const red = rgb['r'] * 0.30
    const green = rgb['g'] * 0.59
    const blue = rgb['b'] * 0.11
    const grey = [red + green + blue, red + green + blue, red + green + blue]
    const greyHex = d3.rgb(...grey).formatHex();
    return greyHex
}

function toGreyscale(hexArray) {
    return hexArray.map(rgbToGreyscale)
}