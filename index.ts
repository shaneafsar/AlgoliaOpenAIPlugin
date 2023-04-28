import {type Serve} from "bun";
import algoliasearch from 'algoliasearch';

// Connect and authenticate with your Algolia app


// Search for "query string" in the index "contacts"


export default {
  port: 3000,
  error(error: Error) {
    return new Response(`<pre>${error}\n${error.stack}</pre>`, {
      headers: {
        "Content-Type": "text/html",
      },
    });
  },
  async fetch(req) {
    const url = new URL(req.url);
    if (url.pathname === "/") { return new Response(`Home page!`); }
    if (url.pathname === "/.well-known/ai-plugin.json") { return new Response(Bun.file(".well-known/ai-plugin.json")); }
    console.log(url.pathname);
    if(url.pathname === '/api/') {
      const client = algoliasearch('XGWKVNJNLW', 'f51eb600722dbec70d1016bc04622b94');
      const index = client.initIndex('algolia-docs');
      const hits = await index.search(url.searchParams.get('q'));
      return Response(JSON.stringify(hits), {
        headers: {
          "Content-Type": "application/json",
        }
      });
      
    }

    if (url.pathname === "/openapi.yaml") { return new Response(Bun.file("openapi.yaml")); }

    if(url.pathname == '/logo.png') {
      return new Response(Bun.file('logo.png'), {
        headers: {
          "Content-Type":"image/png",
        }
      });
    }
    
    return new Response(`404!`);
  },
} satisfies Serve;