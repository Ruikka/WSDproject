import { send } from '../deps.js';

const errorMiddleware = async(context, next) => {
  try {
    await next();
  } catch (e) {
    console.log(e);
  }
}

const requestTimingMiddleware = async({ request, session }, next) => {
  var userId = 'anonymous'
  if (session && await session.get('authenticated')) {
    var user = await session.get('user')
    userId = user.id
  }

  const start = Date.now();
  await next();
  const ms = Date.now() - start;
  console.log(` method: ${request.method} -- path: ${request.url.pathname} -- start: ${start} -- request time: ${ms} ms -- id: ${userId}`);
  //logs also user id or anon is not authenitaceted
}

const authenticationMiddleware = async({session, response, request}, next ) => {


  if (request.url.pathname.startsWith('/behavior')) {
    if (session && await session.get('authenticated')) {
      await next();
    } else {
      response.redirect('/auth/login')
    }
  } else {
    await next();
  }
    //require that user is authenticated. If not, redirect to login form at /auth/login
  
}

const serveStaticFilesMiddleware = async(context, next) => {
  if (context.request.url.pathname.startsWith('/static')) {
    const path = context.request.url.pathname.substring(7);
  
    await send(context, path, {
      root: `${Deno.cwd()}/static`
    });
  
  } else {
    await next();
  }
}

export { errorMiddleware, requestTimingMiddleware, serveStaticFilesMiddleware, authenticationMiddleware};