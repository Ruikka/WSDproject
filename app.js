import { Application } from "./deps.js";
import { router } from "./routes/routes.js";
import { viewEngine, engineFactory, adapterFactory } from "./deps.js";
import * as MW from "./middlewares/middlewares.js";
import { Session } from "./deps.js";
import {config } from "./config/config.js"

const app = new Application();

const ejsEngine = engineFactory.getEjsEngine();
const oakAdapter = adapterFactory.getOakAdapter();
app.use(viewEngine(oakAdapter, ejsEngine, {
    viewRoot: "./views"
}));

const session = new Session({ framework: "oak" });
await session.init();
app.use(session.use()(session));

app.use(MW.errorMiddleware)
app.use(MW.requestTimingMiddleware)
app.use(MW.serveStaticFilesMiddleware)
app.use(MW.authenticationMiddleware)

app.use(router.routes());

if (!Deno.env.get('TEST_ENVIRONMENT')) {
    app.listen({ port: config.port });
}

export default app;