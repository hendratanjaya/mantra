function formatMessage(level: string, message: string) {
  const time = new Date().toISOString();
  return `[${time}] [${level.toUpperCase()}]: ${message}`;
}

export const logger = {
  info: (message: string) => console.log(formatMessage("INFO", message)),
  error: (err: unknown) => {
    let message: string;

    if (err instanceof Error) {
      message = `${err.message}\n${err.stack}`;
    } else if (typeof err === "object" && err !== null) {
      try {
        message = JSON.stringify(err, null, 2);
      } catch {
        message = String(err);
      }
    } else {
      message = String(err);
    }

    console.error(formatMessage("ERROR", message));
  },
  warn: (message: string, opts?: { path: string; time: string; ip: string }) =>
    console.warn(formatMessage("WARNING", message), opts),
};
