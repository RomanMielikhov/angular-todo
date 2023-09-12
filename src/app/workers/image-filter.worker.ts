addEventListener('message', ({ data }: any) => {
  var imageData = data.imagedata;

  for (let j = 0; j < imageData.width; j++) {
    for (let i = 0; i < imageData.height; i++) {
      var index = i * 4 * imageData.width + j * 4;
      var red = imageData.data[index];
      var alpha = imageData.data[index + 3];

      imageData.data[index] = red;

      imageData.data[index + 1] = 0;
      imageData.data[index + 2] = 0;
      imageData.data[index + 3] = alpha;
    }
  }

  setTimeout(() => postMessage(imageData), 2000);
});
