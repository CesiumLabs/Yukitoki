<script>
    import { faClipboardList } from "@fortawesome/free-solid-svg-icons";
    import { FontAwesomeIcon } from "fontawesome-svelte";
    import Tooltip from "~/components/Tooltip.svelte";
    import Navbar from "~/components/Navbar.svelte";
    import Footer from "~/components/Footer.svelte";

    const config = window.yukitoki.config;

    let copyError = false,
        tooltipHidden = true;

    function copyInstallCommand() {
        const elm = document.getElementById("install_command");
        if (!elm) return;

        navigator.clipboard
            .writeText(elm.innerText)
            .then(() => {
                copyError = false;
                tooltipHidden = false;
            })
            .catch(() => {
                copyError = true;
                tooltipHidden = false;
            })
            .finally(() => {
                setTimeout(() => {
                    tooltipHidden = true;
                }, 2000);
            });
    }
</script>

<Navbar />

<div class="text-white bg-primary text-center py-20" id="containerElm">
    {#if config.HOME_LOGO?.TYPE === "IMAGE"}
        <img src={config.HOME_LOGO.VALUE} alt="img" class="mx-auto select-none" />
    {:else}
        <h1 class="lg:text-9xl md:text-7xl text-6xl select-none">{config.HOME_LOGO?.VALUE ?? ""}</h1>
    {/if}
    <div class="mt-14">
        <span id="__copy__tooltip__">
            <Tooltip text={copyError ? "Couldn't copy" : "Copied"} display={!tooltipHidden} />
        </span>
        <code id="install_command" class="font-semibold text-lg p-4 bg-white  mx-auto text-gray-900  hover:text-gray-800 dark:hover:text-gray-200 rounded-md"
            >{config.INSTALL_COMMAND}
            <span class="cursor-pointer" on:click={copyInstallCommand}>
                <FontAwesomeIcon icon={faClipboardList} />
            </span>
        </code>
    </div>
</div>

<div class="text-base-content  bg-base-100 mx-auto  py-20 grid md:grid-cols-2 grid-cols-1 gap-2 md:gap-0">
    <div class="about py-4 px-6 md:mx-auto">
        <h1 class="text-3xl font-bold opacity-90  text-base-content">{config.DESCRIPTION.TITLE}</h1>
        <p class="text-lg font-semibold">{config.DESCRIPTION.VALUE}</p>
    </div>
    <div class="why py-4 px-6 md:mx-auto">
        <h1 class="text-3xl font-bold opacity-90  text-base-content">{config.DESCRIPTION_LIST.TITLE}</h1>
        <ul class="text-lg font-semibold list-disc">
            {#each config.DESCRIPTION_LIST.VALUE as item}
                <li>{item}</li>
            {/each}
        </ul>
    </div>
</div>

<Footer />
