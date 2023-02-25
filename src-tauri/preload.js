const dotenv = require('dotenv');

dotenv.config();

window.process = {
  env: {
    ...process.env,
  },
};