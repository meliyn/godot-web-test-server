import { program } from "npm:commander@10";
import { Application } from "https://deno.land/x/oak@v12.5.0/mod.ts";

interface Options {
    baseUrl: string;
    index: string;
    port: number;
}

export async function serve(options: Options) {
    const app = new Application();

    app.use(async (ctx) => {
        ctx.response.headers.append("Cross-Origin-Opener-Policy", "same-origin");
        ctx.response.headers.append("Cross-Origin-Embedder-Policy", "require-corp");
        await ctx.send({
            root: options.baseUrl,
            index: options.index,
        });
    });

    await app.listen({ port: options.port });
}

if (import.meta.main) {
    program
        .command("serve")
        .option("-d, --baseDir <dir>", "Base Directory", Deno.cwd())
        .option("-i, --index <name>", "Index", "index.html")
        .option("-p, --port <port>", "Port", "8080")
        .action((options) => {
            serve({
                baseUrl: options.baseDir,
                index: options.index,
                port: parseInt(options.port),
            });
        });
    program.parse();
}
