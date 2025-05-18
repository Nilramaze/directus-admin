module.exports = {
  apps: [
    {
      name: "directus",
      script: "npx",
      args: "directus start",
      env: {
        NODE_ENV: "production",
      },
    },
  ],
};

