# How to run the project on system
* open a cmd line on the root directory

* run `npm install`

* run `npm run dev` 

# Setup for a React+Typescript project:

## this project is created on a following node(v14.21.1) and npm(6.14.17) version

`npm create vite@2.9`

*the above cmd will ask a series of questions like project name, framework (react) , variant(typescript)*
  
`npm install`

`npm run dev`

# Install ESLint (already installed in the project)

*lower versions are used to make it compatible with node version*

`npm install eslint@^7.32.0 --save-dev`

`npm install eslint-plugin-react eslint-plugin-react-hooks @typescript-eslint/eslint-plugin@^4.33.0 @typescript-eslint/parser@^4.33.0 --save-dev`

`npx eslint --init`

Here are the questions ESlint will ask:
1) How would you like to use ESLint? Choose: **To check syntax, find problems**
2) What type of modules does your project use? **import/export**
3) Which framework does your project use? **react**
4) Does your project use TypeScript? **yes**
5) Where does your code run? **Browser**
6) What format do you want your config file to be in? **JSON**
8) Would you like to install the dependencies? **No**  *(Already installed)*

> Create a cmd like `npm run lint`


# Add Prettier (already installed in the project)

`npm install prettier eslint-config-prettier eslint-plugin-prettier --save-dev`

**cretae .prettierrc to root directory**

**sample code:**
`{
  "semi": true,
  "singleQuote": true,
  "tabWidth": 2,
  "trailingComma": "es5"
}`


