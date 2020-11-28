let config = {};

if (Deno.env.get('TEST_ENVIRONMENT')) {
    config.database = {};
  } else {
    config.database = {
      hostname: "postgres://jnfgiacq:o09klRIymzjDrWsgqX7J1VvBOr6rnSwE@hattie.db.elephantsql.com:5432/jnfgiacq",
      database: "WSDproject",
      user: "jnfgiacq",
      password: "o09klRIymzjDrWsgqX7J1VvBOr6rnSwE",
      port: 5432
    };
  }

export { config }; 