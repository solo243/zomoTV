// const baseurl = "https://cosmet.vercel.app";
const baseurl = `https://aniwatch-api-solo243.vercel.app/anime`;

const apicall = async (endpoint) => {
  const call = await fetch(endpoint);
  const convert = await call.json();
  const data = convert;
  // const data = convert;
  return data;
};

export const Search = ({ Query, page }) => {
  const url = `${baseurl}/meta/anilist/advanced-search?query=${Query}&&page=${page}`;
};

export const DetailsOfAnime = (id) => {
  const url = `${baseurl}/meta/anilist/info/${id}?provider=zoro`;
  return apicall(url) && console.log(url);
};

export const TrendingAnime = ({ page }) => {
  const url = `${baseurl}/meta/anilist/trending?page=${page}`;
  return apicall(url);
};

export const RecentEP = ({ page }) => {
  const url = `${baseurl}/meta/anilist/recent-episodes?page=${page}`;
  return apicall(url);
};
export const Popular = ({ page }) => {
  const url = `${baseurl}/meta/anilist/popular?page=${page}`;
  return apicall(url);
};
export const Moviesfetch = ({ page }) => {
  const url = `${baseurl}/meta/anilist/advanced-search?format=MOVIE&&page=${page}`;
  return apicall(url);
};

export const Genra = (genra, page) => {
  const url = `${baseurl}/meta/anilist/advanced-search?genres=["${genra}"]&&page=${page}`;
  return apicall(url);
};

// TODO: Realstart from Here Upper is backUp
export const HomepageFetch = () => {
  const url = `${baseurl}/home`;
  return apicall(url);
};

export const Movies = (page) => {
  const url = `${baseurl}/movie?page=${page}`;
  return apicall(url);
};

export const GenraFetch = (genra, page) => {
  const url = `${baseurl}/genre/${genra}?page=${page}`;
  return apicall(url);
};

export const SearchAnime = (Querytext, page) => {
  const url = `${baseurl}/search?q=${Querytext}&page=${page}`;
  return apicall(url);
};

export const Details = (id) => {
  const url = `${baseurl}/info?id=${id}`;
  return apicall(url);
};

export const Ep_list = (id) => {
  const url = `${baseurl}/episodes/${id}`;
  return apicall(url);
};

export const Stream_link = (id, server, subdub) => {
  const url = `${baseurl}/episode-srcs?id=${id}&server=${server}&category=${subdub}`;
  return apicall(url);
};

export const Available_servers = (id) => {
  const url = `${baseurl}/servers?episodeId=${id}`;
  return apicall(url);
};



