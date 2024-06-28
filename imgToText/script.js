
  
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
  