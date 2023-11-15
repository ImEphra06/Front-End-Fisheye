module.exports = {
    // Specify the environments where your code will run
    env: {
      browser: true, // Enables browser global variables
      node: true,    // Enables Node.js global variables and Node.js-specific rules
      es2021: true,  // Enables ES12 globals and automatically sets the ecmaVersion parser option to 12
    },
    // Specify the JavaScript language options you want to support
    parserOptions: {
      ecmaVersion: 2021, // Use the latest ECMAScript version
      sourceType: 'module', // Allows the use of import/export statements
    },
    // Define your project-specific rules and overrides
    rules: {
      // Add more rules as needed
    },
  };