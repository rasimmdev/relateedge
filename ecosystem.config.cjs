
module.exports = {
  apps: [
    {
      name: 'relateedge-marketing',
      cwd: __dirname,
      script: 'node_modules/.bin/next',
      args: 'start -p 3005 -H 127.0.0.1',
      instances: 1,
      exec_mode: 'fork',
      autorestart: true,
      watch: false,
      max_memory_restart: '512M',
      env: {
        NODE_ENV: 'production',
      },
    },
  ],
}
