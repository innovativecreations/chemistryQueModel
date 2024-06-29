/*document.getElementById('extract-text-button').addEventListener('click', () => {
    const input = document.getElementById('image-input').files[0];
    if (input) {
      const reader = new FileReader();
      reader.onload = function(e) {
        Tesseract.recognize(
          e.target.result,
          'eng',
          {
            logger: (m) => console.log(m),
          }
        ).then(({ data: { text } }) => {
          document.getElementById('extracted-text').textContent = text;
        }).catch(err => {
          console.error(err);
          alert('Failed to extract text. Please try again.');
        });
      };
      reader.readAsDataURL(input);
    } else {
      alert('Please select an image file first.');
    }
  });
  
  const video = document.getElementById('video');
  const canvas = document.getElementById('canvas');
  const captureButton = document.getElementById('capture-button');
  
  navigator.mediaDevices.getUserMedia({ video: true })
    .then(stream => {
      video.srcObject = stream;
    })
    .catch(err => {
      console.error('Error accessing the camera: ', err);
      alert('Error accessing the camera. Please try again.');
    });
  
  captureButton.addEventListener('click', () => {
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const context = canvas.getContext('2d');
    context.drawImage(video, 0, 0, canvas.width, canvas.height);
  
    const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;
    for (let i = 0; i < data.length; i += 4) {
      const avg = (data[i] + data[i + 1] + data[i + 2]);
    }
  
    canvas.toBlob(blob => {
      if (blob) {
        const reader = new FileReader();
        reader.onload = function(e) {
          Tesseract.recognize(
            e.target.result,
            'eng',
            {
              logger: (m) => console.log(m),
            }
          ).then(({ data: { text } }) => {
            document.getElementById('extracted-text').textContent = text;
          }).catch(err => {
            console.error(err);
            alert('Failed to extract text from the captured photo. Please try again.');
          });
        };
        reader.readAsDataURL(blob);
      } else {
        alert('Failed to capture image. Please try again.');
      }
    }, 'image/png');
  });
  */
  
  document.getElementById('action-button').addEventListener('click', () => {
    const imageInput = document.getElementById('image-input').files[0];
    const pdfInput = document.getElementById('pdf-input').files[0];
  
    if (imageInput) {
      extractTextFromImage(imageInput);
    } else if (pdfInput) {
      extractTextFromPDF(pdfInput);
    } else {
      captureAndExtractFromCamera();
    }
  });
  
  function extractTextFromImage(file) {
    const reader = new FileReader();
    reader.onload = function(e) {
      Tesseract.recognize(
        e.target.result,
        'eng',
        {
          logger: (m) => console.log(m),
        }
      ).then(({ data: { text } }) => {
        document.getElementById('extracted-text').textContent = text;
      }).catch(err => {
        console.error(err);
        alert('Failed to extract text. Please try again.');
      });
    };
    reader.readAsDataURL(file);
  }
  
  function extractTextFromPDF(file) {
    const reader = new FileReader();
    reader.onload = function(e) {
      const typedarray = new Uint8Array(e.target.result);
      pdfjsLib.getDocument(typedarray).promise.then((pdf) => {
        const numPages = pdf.numPages;
        let extractedText = '';
        for (let i = 1; i <= numPages; i++) {
          pdf.getPage(i).then((page) => {
            page.getTextContent().then((textContent) => {
              textContent.items.forEach((item) => {
                extractedText += item.str + ' ';
              });
              if (i === numPages) {
                document.getElementById('extracted-text').textContent = extractedText;
              }
            });
          });
        }
      });
    };
    reader.readAsArrayBuffer(file);
  }
  
  function captureAndExtractFromCamera() {
    const video = document.getElementById('video');
    const canvas = document.getElementById('canvas');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const context = canvas.getContext('2d');
    context.drawImage(video, 0, 0, canvas.width, canvas.height);
  
    const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;
    for (let i = 0; i < data.length; i += 4) {
      const r = data[i];
      const g = data[i + 1];
      const b = data[i + 2];
      const v = 0.2126 * r + 0.7152 * g + 0.0722 * b;
      data[i] = data[i + 1] = data[i + 2] = v > 128 ? 255 : 0; // Binarize the image
    }
    context.putImageData(imageData, 0, 0);
  
    canvas.toBlob(blob => {
      if (blob) {
        const reader = new FileReader();
        reader.onload = function(e) {
          Tesseract.recognize(
            e.target.result,
            'eng',
            {
              logger: (m) => console.log(m),
            }
          ).then(({ data: { text } }) => {
            document.getElementById('extracted-text').textContent = text;
          }).catch(err => {
            console.error(err);
            alert('Failed to extract text from the captured photo. Please try again.');
          });
        };
        reader.readAsDataURL(blob);
  
        const a = document.createElement('a');
        a.href = URL.createObjectURL(blob);
        a.download = 'captured-image.png';
        a.click();
      } else {
        alert('Failed to capture image. Please try again.');
      }
    }, 'image/png');
  }
  
  navigator.mediaDevices.getUserMedia({ video: true })
    .then(stream => {
      document.getElementById('video').srcObject = stream;
    })
    .catch(err => {
      console.error('Error accessing the camera: ', err);
      alert('Error accessing the camera. Please try again.');
    });
  