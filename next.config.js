module.exports = {
  async redirects() {
    return [
      {
        source: '/',
        destination: `/overview?selected_identifier=all&year=${new Date().getFullYear()}`,
        permanent: true,
      },
    ];
  },
};
