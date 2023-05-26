import { Application, send } from "https://deno.land/x/oak@v12.5.0/mod.ts";
import { program } from "npm:commander@10";
// import selfsigned from "npm:selfsigned@2.1.1";

interface Options {
    baseUrl: string;
    index: string;
    log: boolean;
    port: number;
}

export async function serve(options: Options) {
    const app = new Application();

    app.use(async (ctx) => {
        ctx.response.headers.append("Cross-Origin-Opener-Policy", "same-origin");
        if (options.log) console.log('Appended "Cross-Origin-Opener-Policy: same-origin"');
        ctx.response.headers.append("Cross-Origin-Embedder-Policy", "require-corp");
        if (options.log) console.log('Appended "Cross-Origin-Embedder-Policy: require-corp"');
        await send(ctx, ctx.request.url.pathname, {
            index: options.index,
            root: options.baseUrl,
        });
        if (options.log) console.log(`Serving ${ctx.request.url.pathname} to ${ctx.request.ip}`);
    });

    for (const networkInterface of Deno.networkInterfaces()) {
        if (networkInterface.family === "IPv4") {
            console.log(`Server is running on http://${networkInterface.address}:${options.port}/`);
        }
    }
    // const { cert, private: key } = selfsigned.generate([{ name: "meliyn", value: "example.com" }]);
    await app.listen({ port: options.port });
}

if (import.meta.main) {
    program.name("godot-web-test-server");
    program
        .command("serve")
        .option("-d, --baseDir <dir>", "Base directory", Deno.cwd())
        .option("-h, --http", "Disable HTTPS", false)
        .option("-i, --index <name>", "The root HTML file name", "index.html")
        .option("-l, --log", "Log?", false)
        .option("-p, --port <port>", "Port", "8080")
        .action((options) => {
            serve({
                baseUrl: options.baseDir,
                index: options.index,
                log: options.log,
                port: parseInt(options.port),
            });
        });
    program.parse();
}
