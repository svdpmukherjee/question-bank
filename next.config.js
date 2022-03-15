module.exports = {
  async rewrites() {
    return [
      {
        source: '/json/:slug*',
        destination: `https://geolocation-db.com/json/:slug*`,
      },
      {
        source: '/api/:slug*',
        destination: `http://localhost:3001/api/:slug*`,
      },
    ];
  },
};
