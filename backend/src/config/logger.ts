import winston from "winston";

const { combine, timestamp, printf, json } = winston.format;

const devFormat = combine(
  timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
  printf((info) => {
    const { level, message, timestamp, ...meta } = info;

    const base = {
      level,
      message,
      ...meta,
      timestamp,
    };

    let output = JSON.stringify(base, null, 2);

    const coloredLevel = winston.format.colorize().colorize(level, level);

    output = output.replace(
      `"level": "${level}"`,
      `"level": "${coloredLevel}"`,
    );

    return output;
  }),
);

const prodFormat = combine(
  timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
  json(),
);

export const logger = winston.createLogger({
  level: "info",
  format: devFormat,
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({
      filename: "logs/error.log",
      level: "error",
      format: prodFormat,
    }),
    new winston.transports.File({
      filename: "logs/combined.log",
      format: prodFormat,
    }),
  ],
});
