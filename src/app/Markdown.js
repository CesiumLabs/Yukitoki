import marked, { Slugger } from "marked";
import highlight from "highlight.js";
import { stripIndents } from "common-tags";

const renderer = new marked.Renderer();
const slugger = new Slugger();

marked.use({
    renderer: {
        link: (href, title, text) => {
            const local = href?.startsWith(`${location.protocol}//${location.hostname}`);
            const html = renderer.link.call(renderer, href, title, text);
            return local ? html : html.replace(/^<a /, '<a target="_blank" rel="noreferrer" class="text-primary hover:text-primary-focus"');
        },
        code: (src) => {
            return `<div class="mockup-code"><pre class="my-0 px-5"><code class="yukitoki-code">${highlight.highlight(src, { language: "js" }).value}</code></pre></div>`;
        },
        image: (href, title, text) => {
            const html = renderer.image.call(renderer, href, title, text);
            return html.replace(/^<img /, '<img class="inline-flex"');
        },
        heading: (text, level) => {
            const levels = ["4xl", "3xl", "2xl", "xl", "lg", "md"];
            return stripIndents(`
                <h${level} id="${slugger.slug(text)}" class="text-${levels[level]}">${text}</h${level}>
            `);
        }
    }
});

export default function markdown(input) {
    const content = marked(input || "");
    return `<div class="space-y-2 spaxe-x-2">${content.replace(/<(info|warn)>([\s\S]+)<\/\1>/gi, '<div class="$1">$2</div>')}</div>`;
}
