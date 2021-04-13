<script type="ts">
  function toggleTheme() {
    const state = localStorage.getItem("theme") === "dark" ? "light" : "dark";
    localStorage.setItem("theme", state);

    if (state === "dark") document.querySelector("html").classList.add("dark");
    else document.querySelector("html").classList.remove("dark");
  }
</script>

<div class="bg-white dark:bg-gray-800">
    <button on:click={toggleTheme} class="bg-gray-800 dark:bg-white text-white dark:text-gray-800">Toggle Theme</button>
</div>
