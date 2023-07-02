module.exports = {
  async redirects() {
    return [
      {
        source: '/',
        destination: '/dashboard/graphs',
        permanent: true,
      },
    ];
  },
};
