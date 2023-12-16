
import { Genra } from "./src/Api/apicall";

export const fetchData = async (functions, page, setData) => {
  try {
    const data = await functions({ page });
    return setData(data);
  } catch (e) {
    console.log("Error", e);
  }
};

export const GenraFetchingFunc = async (genra, page, setData) => {
  try {
    const data = await Genra(genra, page);
    return setData(data);
  } catch (e) {
    console.log(e);
  }
};
