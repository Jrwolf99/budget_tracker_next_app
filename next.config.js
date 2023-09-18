module.exports = {
  async redirects() {
    return [
      {
        source: '/',
        destination: '/transactions?selected_identifier=all',
        permanent: true,
      },
    ];
  },
};
