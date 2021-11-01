<div class="bg-primary flex justify-center items-center w-full select-none py-72 space-x-3">
    <div class="bubble bg-white" />
    <div class="bubble bg-white" />
    <div class="bubble bg-white" />
</div>

<style>
    .bubble {
        animation: expand 1s ease-in-out infinite;
        border-radius: 20px;
        display: inline-block;
        transform-origin: center center;
        margin: 0 3px;
        width: 20px;
        height: 20px;
    }

    .bubble:nth-child(2) {
        animation-delay: 180ms;
    }

    .bubble:nth-child(3) {
        animation-delay: 360ms;
    }

    @keyframes expand {
        0% {
            transform: scale(1);
        }
        25% {
            transform: scale(1.55);
        }
    }
</style>
