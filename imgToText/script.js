document.getElementById('extract-text-button').addEventListener('click', () => {
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
    });
  
  captureButton.addEventListener('click', () => {
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);
  
    canvas.toBlob(blob => {
      Tesseract.recognize(
        blob,
        'eng',
        {
          logger: (m) => console.log(m),
        }
      ).then(({ data: { text } }) => {
        document.getElementById('extracted-text').textContent = text;
      });
    }, 'image/png');
  });
  