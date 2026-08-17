export default {
  async fetch(request, env) {
    // Serve static assets (Vite /dist build on Cloudflare Pages / Workers)
    if (env.ASSETS) {
      return env.ASSETS.fetch(request);
    }

    return new Response("Not found", { status: 404 });
  },
};

