{
  "name": "post-messenger",
  "version": "0.2.2",
  "description": "A wrapper of window.postMessage for cross-document communication.",
  "main": "lib/index.js",
  "size-limit": [
    {
      "limit": "1 KB",
      "path": "dist/post-messenger.min.js"
    }
  ],
  "repository": {
    "type": "git",
    "url": "git@github.com:hustcc/post-messenger.git"
  },
  "keywords": [
    "postMessage",
    "iframe",
    "post-messenger",
    "cross-document"
  ],
  "author": "ProtoTeam",
  "license": "MIT",
  "devDependencies": {
    "@babel/core": "^7.9.6",
    "@rollup/plugin-babel": "^5.0.0",
    "babel-cli": "^6.26.0",
    "babel-jest": "^22.4.3",
    "babel-plugin-add-module-exports": "^0.2.1",
    "babel-plugin-transform-class-properties": "^6.24.1",
    "babel-preset-env": "^1.6.1",
    "coveralls": "^3.0.0",
    "cross-env": "^5.1.3",
    "jest": "^21.2.1",
    "jsdom": "^11.5.1",
    "mitt": "^1.1.3",
    "rimraf": "^2.6.2",
    "rollup-plugin-terser": "^5.3.0",
    "size-limit": "^0.19.0"
  },
  "jest": {
    "setupFiles": [
      "<rootDir>/__tests__/setup.js",
      "<rootDir>/__tests__/jest-postmessage-mock.js"
    ],
    "testRegex": "(/__tests__/.*(test|spec))\\.(js)$",
    "moduleFileExtensions": [
      "js",
      "json"
    ],
    "transform": {
      "^.+\\.js?$": "babel-jest"
    },
    "collectCoverage": true,
    "collectCoverageFrom": [
      "src/**/*.{js}",
      "!**/node_modules/**",
      "!**/vendor/**"
    ],
    "moduleDirectories": [
      "node_modules",
      "src"
    ]
  },
  "dependencies": {
    "@rollup/plugin-buble": "^0.21.3",
    "@rollup/plugin-node-resolve": "^7.1.3",
    "rollup": "^2.10.2"
  }
}
