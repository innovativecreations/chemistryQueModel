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
  