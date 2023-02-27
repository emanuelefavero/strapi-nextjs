module.exports = ({ env }) => ({
  host: env("HOST", "0.0.0.0"),
  port: env.int("PORT", 1337),
  app: {
    keys: env.array("APP_KEYS"),
  },
  webhooks: {
    populateRelations: env.bool("WEBHOOKS_POPULATE_RELATIONS", false),
  },

  // TODO: Try adding your domain name here (in production) and on the .env file?
  // url: env("PUBLIC_URL", "https://yourdomain.com"),
});
