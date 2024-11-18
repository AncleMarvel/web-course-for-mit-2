
## Prepare your local env

1. Install npm & node.js
2. Open your project folder in vs code and run command:
   `npm init`
   `npm install vue@3 vue-router@4 vuex@4 sass lodash express dotenv node-fetch cors`
   `npm install vite @vitejs/plugin-vue sass-embedded sass --save-dev concurrently nodemon`

3. Create a file vite.config.mjs:
```
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
  plugins: [vue()],
});

```
4. In package.json:
```
"scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  },
```

### Get admin api key

It's needed for requests to your shop

1. Go to https://www.shopify.com/partners
2. Sing Up
3. Create a dev store
4. Go to settings -> apps -> develop apps -> create a new app -> configure admin scopes -> write in the search bar "product" and select all found scopes -> save -> create -> copy the key and save for the future

# Useful links

https://shopify.dev/docs/api/admin-graphql

https://shopify.dev/docs/api/admin-graphql/2024-10/queries/collections

https://shopify-graphiql-app.shopifycloud.com/

