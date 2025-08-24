// CORS ORIGINS configuration
const whiteList = [
  "www.yoursite.com",
  "http://127.0.0.1:5500",
  "http://localhost:3500",
];

const corsOption = {
  origin: (origin, callback) => {
    if (whiteList.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
};

export default corsOption;
