import axios from "axios";
import Cookie from "universal-cookie";

const SPEECH_TOKEN_KEY = "speech-token";

const getTokenOrRefresh = async (): Promise<{
  authToken: string | null;
  region?: string;
  error?: any;
}> => {
  const cookie = new Cookie();
  const speechToken = cookie.get(SPEECH_TOKEN_KEY);

  if (speechToken === undefined) {
    try {
      const { data } = await axios.get("/api/speech-token");
      const { token, region } = data;
      const cookieVal = `${region}:${token}`;
      cookie.set(SPEECH_TOKEN_KEY, cookieVal, {
        maxAge: 540,
        path: "/",
      });

      return { authToken: token, region: region };
    } catch (err) {
      return { authToken: null, error: err.response.data };
    }
  } else {
    const idx = speechToken.indexOf(":");
    return {
      authToken: speechToken.slice(idx + 1),
      region: speechToken.slice(0, idx),
    };
  }
};

export default getTokenOrRefresh;
