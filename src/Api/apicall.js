const baseurl = "https://cosmet.vercel.app/";

const apicall = async (endpoint) => {
  const call = await fetch(endpoint);
  const convert = await call.json();
  const data = convert.results;
  // const data = convert;
  return data;
};

export const Search = ({ Query, page }) => {
  const url = `${baseurl}/meta/anilist/advanced-search?query=${Query}&&page=${page}`;
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
