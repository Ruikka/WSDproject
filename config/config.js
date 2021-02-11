let config = { tls: {enforce: true}};

if (Deno.env.get('TEST_ENVIRONMENT')) {
    config.database = {};
    config.port = 7777
  } else {
    const DATABASE_URL = Deno.env.toObject().DATABASE_URL+'?sslmode=require';
    const PORT = Number(Deno.env.toObject().PORT);
    console.log(`DB: ${DATABASE_URL}, PORT: ${PORT}`)
    config.database = DATABASE_URL 
    config.port = PORT
  }

export { config }; 