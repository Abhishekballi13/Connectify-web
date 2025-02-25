
//local
// export const BASE_URL = "http://localhost:7777";

//for production in aws
// export const BASE_URL = "/api";


//for production at vercel
// export const BASE_URL = "https://connectify-murex.vercel.app"

export const BASE_URL =
  window.location.hostname === "localhost"
    ? "http://localhost:7777"
    : "https://connectify-murex.vercel.app";
