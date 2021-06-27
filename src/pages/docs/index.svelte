<script>
    import Navbar from "../../components/Navbar.svelte";
    import Footer from "../../components/Footer.svelte";
    import { faSearch } from "@fortawesome/free-solid-svg-icons";
    import { FontAwesomeIcon } from "fontawesome-svelte";
</script>

<Navbar />

<div class="text-gray-800 dark:text-white bg-white dark:bg-gray-800 pt-3 w-full">
    <div class="w-full md:w-1/2 px-4 mx-auto">
        <div class="relative">
            <span class="absolute text-white dark:text-gray-700 top-4 left-4 pointer-events-none">
                <FontAwesomeIcon icon={faSearch} />
            </span>
            <input placeholder="Search..." type="text" class="placeholder-gray-300 dark:placeholder-gray-500 bg-gray-700 dark:bg-gray-200 text-white dark:text-gray-700 h-14 w-full px-12 rounded-lg focus:outline-none focus:shadow-xl" />
        </div>
    </div>

    <div class="h-96 dark:bg-gray-800 dark:text-white text-gray-800 mt-3">
        <h1 class="text-center mt-52 text-5xl font-semibold select-none">Loading...</h1>
    </div>
</div>

<Footer />
