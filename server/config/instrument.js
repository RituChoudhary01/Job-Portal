// Import with `import * as Sentry from "@sentry/node"` if you are using ESM
import * as Sentry from "@sentry/node";

Sentry.init({
  dsn: "https://1e3eded27f8cbfd259a24f95547b0967@o4509590624993280.ingest.us.sentry.io/4509590630498304",
  integrations:[
    Sentry.mongooseIntegration()
  ],

  // Setting this option to true will send default PII data to Sentry.
  // For example, automatic IP address collection on events
  sendDefaultPii: true,
});