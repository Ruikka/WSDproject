let config = {};

if (Deno.env.get('TEST_ENVIRONMENT')) {
    config.database = {};
    config.port = 7777
  } else {
    const DATABASE_URL = Deno.env.toObject().DATABASE_URL;
    const PORT = Number(Deno.env.toObject().PORT);
    config.database = DATABASE_URL 
    config.port = PORT
  }

export { config }; 