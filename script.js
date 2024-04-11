var img;

document.getElementById('imageInput').addEventListener('change', function() {
    var input = this;
    var file = input.files[0];

    if (file) {
        var reader = new FileReader();
        reader.readAsDataURL(file);

        reader.onload = function(e) {
            img = new Image();
            img.src = e.target.result;

            img.onload = function() {
                var widthInput = document.getElementById('widthInput');
                var heightInput = document.getElementById('heightInput');
                var dimensions = document.getElementById('dimensions');
                
                widthInput.value = img.width;
                heightInput.value = img.height;
                dimensions.textContent = 'Original Dimensions: ' + img.width + ' x ' + img.height;

                widthInput.removeAttribute('disabled');
                heightInput.removeAttribute('disabled');

                updatePreview();
            }
        }
    }
});

document.getElementById('widthInput').addEventListener('input', updatePreview);
document.getElementById('heightInput').addEventListener('input', updatePreview);
document.getElementById('scaleInput').addEventListener('input', updatePreview);

function updatePreview() {
    var widthInput = document.getElementById('widthInput');
    var heightInput = document.getElementById('heightInput');
    var scaleInput = document.getElementById('scaleInput');
    
    var originalWidth = parseFloat(widthInput.value);
    var originalHeight = parseFloat(heightInput.value);
    var scale = parseFloat(scaleInput.value) / 100;

    var newWidth = originalWidth * scale;
    var newHeight = originalHeight * scale;

    var canvas = document.createElement('canvas');
    var ctx = canvas.getContext('2d');

    canvas.width = newWidth;
    canvas.height = newHeight;

    ctx.drawImage(img, 0, 0, newWidth, newHeight);

    var resizedImage = new Image();
    resizedImage.src = canvas.toDataURL('image/jpeg');

    var resultContainer = document.getElementById('resultContainer');
    resultContainer.innerHTML = '';
    resultContainer.appendChild(resizedImage);

    var downloadButton = document.getElementById('downloadButton');
    downloadButton.href = resizedImage.src;
    downloadButton.style.display = 'inline-block';
}
