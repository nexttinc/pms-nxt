const API_KEY = process.env.API_KEY;
module.exports = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: "/project/list",
        destination: "/project/list/1",
        permanent: true,
      },
      {
        source: "/daily/regist",
        destination: "/daily/regist/0",
        permanent: true,
      },
    ];
  },
  async rewrites() {
    return [
      {
        source: "/api/movies",
        destination: `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`,
      },
    ];
  },
};
