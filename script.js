const canvas = document.getElementById('skinCanvas');
const ctx = canvas.getContext('2d');
const colorPicker = document.getElementById('colorPicker');
const downloadBtn = document.getElementById('downloadBtn');

// Load your Minecraft skin (replace with your actual skin path)
const skinImg = new Image();
skinImg.src = 'skin.png';  // Place your skin image in the same directory

// Colors to replace
const blueColors = ['#80C3DF', '#7ABAD4', '#7EBFDA', '15769E'];

skinImg.onload = () => {
    canvas.width = skinImg.width;
    canvas.height = skinImg.height;
    ctx.imageSmoothingEnabled = false; // Disable smoothing for a crisper image
    ctx.drawImage(skinImg, 0, 0);
};

// Load skin into canvas
skinImg.onload = () => {
    canvas.width = skinImg.width;
    canvas.height = skinImg.height;
    ctx.drawImage(skinImg, 0, 0);
};

// Function to shift hue of the specific colors
function updateSkinHue() {
    ctx.drawImage(skinImg, 0, 0);
    const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imgData.data;

    const targetColor = hexToRgb(colorPicker.value);

    for (let i = 0; i < data.length; i += 4) {
        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];

        const hex = rgbToHex(r, g, b).toUpperCase();

        if (blueColors.includes(hex)) {
            data[i] = targetColor.r;     // Red
            data[i + 1] = targetColor.g; // Green
            data[i + 2] = targetColor.b; // Blue
        }
    }

    ctx.putImageData(imgData, 0, 0);
}

// Hex to RGB converter
function hexToRgb(hex) {
    const bigint = parseInt(hex.slice(1), 16);
    return {
        r: (bigint >> 16) & 255,
        g: (bigint >> 8) & 255,
        b: bigint & 255
    };
}

// RGB to Hex converter
function rgbToHex(r, g, b) {
    return `#${((1 << 24) | (r << 16) | (g << 8) | b).toString(16).slice(1)}`;
}

// Live update on color change
colorPicker.addEventListener('input', updateSkinHue);

// Download modified skin
downloadBtn.addEventListener('click', () => {
    const link = document.createElement('a');
    link.download = 'modified_skin.png';
    link.href = canvas.toDataURL();
    link.click();
});
