<script>
    const config = window.yukitoki.config;
</script>

<footer class="bg-primary text-center py-10">
    <a href="/"><h1 class="text-white text-2xl cursor-pointer font-bold">{config.FOOTER.HEADER}</h1></a>
    <p class="text-lg text-white mb-3">{config.FOOTER.DESCRIPTION}</p>

    <hr class="w-1/3 mx-auto border-t-2 border-gray-200 py-3" />
    
    <a href="https://app.netlify.com/start/deploy?repository=https://github.com/DevSnowflake/Yukitoki">
        <img class="mx-auto" src="https://www.netlify.com/img/deploy/button.svg"/>
    </a>

    <p class="text-white">Yukitoki - &copy; <a class="hover:text-gray-300" href="https://github.com/DevSnowflake">Snowflake Studio ❄</a> - {new Date().getFullYear()}</p>
</footer>
