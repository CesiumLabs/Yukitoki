<script>
    import Navbar from "~/components/Navbar.svelte";
    import Footer from "~/components/Footer.svelte";

    const msgs = ["You are lost...", "Oh no, you found me!", "How did we get here?", "Unknown Page", "Opps! You got lost..", "T-T", "Hey there", "Where are we?", "Sad"];

    const getRandomMsg = () => msgs[Math.floor(Math.random() * msgs.length)];
</script>

<Navbar />

<div class="text-gray-800  bg-white text-center  py-20">
    <div class="my-32">
        <h1
            class="text-9xl font-bold cursor-pointer select-none"
            on:click={() => {
                if (document.getElementById("lostmsg")) document.getElementById("lostmsg").innerText = getRandomMsg();
            }}
        >
            404
        </h1>
        <p class="font-medium text-lg" id="lostmsg">{getRandomMsg()}</p>
    </div>
    <a class="bg-primary p-3 rounded-md hover:bg-primary-focused text-white font-semibold" href="/">Return Home</a>
</div>

<Footer />
