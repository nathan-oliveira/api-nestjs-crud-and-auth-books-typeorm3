import { HttpException, HttpStatus } from '@nestjs/common';

class CorsConfig {
  public config = {
    exposedHeaders: [
      'X-Total-Count',
      'X-Current-Page',
      'X-Item-Count',
      'X-Items-Per-Page',
      'X-Total-Items',
      'X-Total-Pages',
    ],
    origin: function (origin, callback) {
      const domains = process.env.CORS_RELEASED_DOMAINS.split(',');

      if (domains.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(
          new HttpException('Not allowed by CORS', HttpStatus.UNAUTHORIZED),
        );
      }
    },
    credentials: true,
    methods: 'GET,PUT,POST,DELETE,UPDATE,OPTIONS',
    llowedHeaders:
      'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept, Observe',
  };
}

export default new CorsConfig().config;
