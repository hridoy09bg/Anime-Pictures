document.addEventListener("DOMContentLoaded", () => {
  const fetchBtn = document.getElementById("fetch-btn");
  const animeImg = document.getElementById("anime-img");
  const loader = document.getElementById("loader");
  const downloadBtn = document.getElementById("download-btn");

  fetchBtn.addEventListener("click", async () => {
    loader.classList.remove("hidden"); // Show loader animation

    try {
      const response = await fetch('https://raw.githubusercontent.com/hridoy09bg/Anime-Pictures/main/api/animepfp.php');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const imageUrl = await response.text(); // Assuming it returns a direct image URL
      animeImg.src = imageUrl;
      animeImg.onload = () => {
        loader.classList.add("hidden"); // Hide loader on image load
        animeImg.classList.remove("hidden"); // Show image
        downloadBtn.classList.remove("hidden"); // Show download button
      };
    } catch (error) {
      console.error('Error fetching the anime profile picture:', error);
      // Handle error: display an error message to the user or retry logic
      // alert('Failed to fetch anime profile picture. Please try again later.');
      loader.classList.add("hidden"); // Hide loader on error
    }
  });

  downloadBtn.addEventListener("click", () => {
    const link = document.createElement("a");
    link.href = animeImg.src;
    link.download = "anime-profile-picture.jpg";
    link.click();
  });
});
