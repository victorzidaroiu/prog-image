export const config = {
  host: process.env.HOST || 'localhost',
  port: parseInt(process.env.PORT || '8080', 10),
  logLevel: process.env.LOG_LEVEL || 'debug',
  aws: {
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    },
    region: 'eu-west-2',
  },
  images: {
    bucket: 'demo-customer-images',
  },
}
