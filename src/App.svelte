<script lang="ts">
	import Nav from "./Components/Nav.svelte";

	if (localStorage.getItem("theme") === "dark" || (!("theme" in localStorage) && window.matchMedia("(prefers-color-scheme: dark)").matches)) {
        document.querySelector("html").classList.add("dark");
    } else if (localStorage.theme === 'dark') {
        document.querySelector("html").classList.add("dark");
    }
</script>

<main>
	<Nav />
</main>

<style global lang="postcss">
  * {
	  margin: 0;
	  padding: 0;
  }
  
  @tailwind base;
  @tailwind components;
  @tailwind utilities;

</style>