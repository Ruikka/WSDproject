let config = {};

if (Deno.env.get('TEST_ENVIRONMENT')) {
    config.database = {};
  } else {
    config.database = 'postgres://jnfgiacq:o09klRIymzjDrWsgqX7J1VvBOr6rnSwE@hattie.db.elephantsql.com:5432/jnfgiacq'
  }

export { config }; 