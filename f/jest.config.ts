import type {Config} from 'jest';

const config: Config = {
  verbose: true,
  "roots": [
    "<rootDir>/src"
  ],
  "transform": {
    "^.+\\.tsx?$": "ts-jest"
  },
};

export default config;