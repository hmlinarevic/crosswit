/** PM2 config for production. Run: pm2 start ecosystem.config.cjs */
module.exports = {
  apps: [
    {
      name: 'crosswit',
      script: 'npm',
      args: 'run start',
      env: {
        NODE_ENV: 'production',
        PORT: 3001,
      },
      instances: 1,
      autorestart: true,
      watch: false,
    },
  ],
};
