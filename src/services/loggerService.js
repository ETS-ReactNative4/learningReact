import * as Sentry from "@sentry/browser";

function init() {
  Sentry.init({
    dsn: "https://eb75bc23f8da419aaef71cfd204e2138@sentry.io/1362081",
    release: "1-0-0",
    environment: "development-test"
  });
}

function logError(error) {
  Sentry.captureException(error);
}

export default {
  init,
  logError
};
