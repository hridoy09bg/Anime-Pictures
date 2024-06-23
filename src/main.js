document.addEventListener("DOMContentLoaded", () => {
  const fetchBtn = document.getElementById("fetch-btn");
  const animeImg = document.getElementById("anime-img");
  const loader = document.getElementById("loader");
  const downloadBtn = document.getElementById("download-btn");

  fetchBtn.addEventListener("click", async () => {
    loader.classList.remove("hidden");
    animeImg.classList.add("loading");

    try {
      const response = await fetch('https://eliana-pictures.vercel.app/api/animepfp.php');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      animeImg.src = data.url;
      animeImg.onload = () => {
        loader.classList.add("hidden");
        animeImg.classList.remove("loading");
        animeImg.classList.add("loaded");
        downloadBtn.classList.remove("hidden");
      };
    } catch (error) {
      console.error('Error fetching the anime profile picture:', error);
      loader.classList.add("hidden");
      // Optionally, display an error message to the user
      // alert('Failed to fetch anime profile picture. Please try again later.');
    }
  });

  downloadBtn.addEventListener("click", () => {
    const link = document.createElement("a");
    link.href = animeImg.src;
    link.download = "anime-profile-picture.jpg";
    link.click();
  });
});
