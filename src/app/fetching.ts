import axios from "axios";

const fetcher = async <T>(url: string, headers = {}): Promise<T | null> => {
  console.log("I am here")
  try {
    console.log(url)
    const { data } = await axios.get<T>(url, {
      headers,
      withCredentials: true,
    });

    return data;
  } catch (e) {
    return null;
  }
};

export default fetcher;
