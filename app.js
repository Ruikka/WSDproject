import { Application } from "./deps.js";
import { router } from "./routes/routes.js";
import { viewEngine, engineFactory, adapterFactory } from "./deps.js";

const app = new Application();

const ejsEngine = engineFactory.getEjsEngine();
const oakAdapter = adapterFactory.getOakAdapter();
app.use(viewEngine(oakAdapter, ejsEngine, {
    viewRoot: "./views"
}));

app.use(router.routes());

app.listen({ port: 7777 });