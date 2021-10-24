<script>
    import { faSun, faMoon } from "@fortawesome/free-solid-svg-icons";
    import { FontAwesomeIcon } from "fontawesome-svelte";
    const config = window.yukitoki.config;
    let currentTheme = window.yukitoki.theme;
    let checkedValue = false;
    function toggleMobileMenu(ev) {
        ev.preventDefault();
        const elm = document.getElementById("mobile-menu");
        if (!elm) return;
        elm.classList.toggle("hidden");
        const opener = document.getElementById("nav-opener");
        const closer = document.getElementById("nav-closer");

        if (opener && closer) {
            const success = closer.classList.toggle("hidden");
            if (!success) opener.classList.replace("block", "hidden");
            else opener.classList.replace("hidden", "block");
        }
    }

    function toggleTheme(e) {
        const { checked } = e.detail;
        checkedValue = checked;
        window.yukitoki.toggleTheme();
        currentTheme = window.yukitoki.theme;
    }
</script>

<header class="bg-primary sticky top-0 z-20" id="navcontainer">
    <div class="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
        <div class="relative flex items-center justify-between h-16">
            <div class="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
                <div class="flex-shrink-0 flex items-center">
                    <a href={config.NAV.ICON.HREF ?? "/"} class="block h-8 w-auto">
                        {#if config.NAV.ICON.TYPE === "IMAGE"}
                            <img src={config.NAV.ICON.VALUE} alt="img" />
                        {:else}
                            <h1 class="text-white text-lg font-semibold select-none">{config.NAV.ICON.VALUE}</h1>
                        {/if}
                    </a>
                </div>
                <div class="hidden sm:block sm:ml-6">
                    <div class="flex space-x-4 ml-auto mr-auto">
                        {#each config.NAV.BUTTONS as nav}
                            {#if nav.newPage}
                                <a href={nav.path} rel="noreferrer" target="_blank" class="text-white hover:opacity-70 px-3 py-2 rounded-md text-sm font-medium" aria-current="page">{nav.label} </a>
                            {:else}
                                <a href={nav.path} class="text-white hover:opacity-70 px-3 py-2 rounded-md text-sm font-medium" aria-current="page">{nav.label} </a>
                            {/if}
                        {/each}
                    </div>
                </div>
            </div>

            <div class="absolute inset-y-0 right-0 items-center hidden md:block pt-3">
                <span class="text-white text-xl cursor-pointer hover:opacity-70" on:click={toggleTheme}>
                    {#if currentTheme === "light"}
                        <FontAwesomeIcon icon={faMoon} />
                    {:else}
                        <FontAwesomeIcon icon={faSun} />
                    {/if}
                </span>
            </div>

            <div class="absolute inset-y-0 right-0 flex items-center sm:hidden">
                <button on:click={toggleMobileMenu} type="button" class="inline-flex items-center justify-center p-2 rounded-md text-white" aria-controls="mobile-menu" aria-expanded="false">
                    <span class="sr-only">#</span>
                    <svg id="nav-opener" class="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                    <svg svg id="nav-closer" class="hidden h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>
        </div>
    </div>

    <div class="sm:hidden hidden" id="mobile-menu">
        <div class="px-2 pt-2 pb-3 space-y-1">
            {#each config.NAV.BUTTONS as nav}
                {#if nav.newPage}
                    <a href={nav.path} rel="noreferrer" target="_blank" class="text-white block hover:opacity-70 px-3 py-2 rounded-md text-base font-medium" aria-current="page">
                        {nav.label}
                    </a>
                {:else}
                    <a href={nav.path} class="text-white block hover:opacity-70 px-3 py-2 rounded-md text-base font-medium" aria-current="page">
                        {nav.label}
                    </a>
                {/if}
            {/each}
            <span class="text-white text-xl font-medium cursor-pointer px-3 py-2 hover:opacity-70" on:click={toggleTheme}>
                {#if currentTheme === "light"}
                    <FontAwesomeIcon icon={faMoon} />
                {:else}
                    <FontAwesomeIcon icon={faSun} />
                {/if}
            </span>
        </div>
    </div>
</header>
