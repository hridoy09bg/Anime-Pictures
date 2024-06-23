document.getElementById('fetch-btn').addEventListener('click', async () => {
    const loader = document.getElementById('loader');
    const imgElement = document.getElementById('anime-img');
    const button = document.getElementById('fetch-btn');
    const downloadBtn = document.getElementById('download-btn');
  
    // Show loader and disable button
    loader.classList.remove('hidden');
    button.disabled = true;
  
    try {
      const response = await fetch('/api/api/animepfp.php?api=d3ee2bd5411a44308577ed90abe0fa30');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      imgElement.src = data.image_url;
  
      // Hide loader and show image and download button
      loader.classList.add('hidden');
      imgElement.classList.remove('hidden');
      imgElement.classList.add('opacity-100');
      downloadBtn.classList.remove('hidden');
      downloadBtn.onclick = () => {
        const link = document.createElement('a');
        link.href = data.image_url;
        link.download = 'anime_profile_picture.jpg';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      };
    } catch (error) {
      console.error('Error fetching the anime profile picture:', error);
    } finally {
      // Re-enable button
      button.disabled = false;
    }
  });
  