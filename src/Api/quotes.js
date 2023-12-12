// You can use this  api also sourcecode of this api is available in my github profile
const baseurl = `https://solo-anime-quotres-gg.vercel.app/`;

const apicall = async (gg) => {
  const url = await fetch(gg);
  const convert = await url.json();
  console.log(convert);
  return convert;
};

export const randomell = () => {
  const gg = `${baseurl}/random`;
  return apicall(gg);
};
