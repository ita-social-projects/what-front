const isDevelopment = process.env.NODE_ENV === 'development';
let devtools = null;

if (isDevelopment) {
  devtools = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();
}

export { devtools };
