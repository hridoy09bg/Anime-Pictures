document.addEventListener("DOMContentLoaded", () => {
  const fetchBtn = document.getElementById("fetch-btn");
  const animeImg = document.getElementById("anime-img");
  const loader = document.getElementById("loader");

  fetchBtn.addEventListener("click", async () => {
    loader.classList.remove("hidden"); // Show loader animation
    animeImg.classList.add("hidden"); // Hide image initially

    try {
      const imageUrl = await fetchAnimeImageUrl();
      if (!imageUrl) {
        throw new Error("Empty image URL returned");
      }

      animeImg.onload = () => {
        loader.classList.add("hidden"); // Hide loader on image load
        animeImg.classList.remove("hidden"); // Show image
      };

      animeImg.onerror = (error) => {
        console.error("Image load failed:", error);
        loader.classList.add("hidden"); // Hide loader on error
        animeImg.classList.add("hidden"); // Hide image on error
      };

      animeImg.src = imageUrl;
    } catch (error) {
      console.error("Error fetching the anime profile picture:", error);
      // Handle error: display an error message to the user or retry logic
      // alert("Failed to fetch anime profile picture. Please try again later.");
      loader.classList.add("hidden"); // Hide loader on error
      animeImg.classList.add("hidden"); // Hide image on error
    }
  });

  async function fetchAnimeImageUrl() {
    const response = await fetch(
      "https://raw.githubusercontent.com/hridoy09bg/Anime-Pictures/main/api/animepfp.php"
    );
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const imageUrl = await response.text(); // Assuming it returns a direct image URL
    return imageUrl.trim(); // Remove any extra whitespace
  }
});
