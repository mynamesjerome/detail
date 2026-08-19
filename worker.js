export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    // Proxy form submissions to Web3Forms
    if (url.pathname === "/submit" && request.method === "POST") {
      try {
        const body = await request.json();
        const accessKey =
          env.WEB3FORMS_ACCESS_KEY ||
          body.access_key ||
          "006f9973-ea8a-4c27-8a44-094a2ac474eb";

        const res = await fetch("https://api.web3forms.com/submit", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
          },
          body: JSON.stringify({
            ...body,
            access_key: accessKey,
          }),
        });

        const data = await res.json().catch(() => ({
          success: false,
          message: "Unable to parse mail server response.",
        }));

        return new Response(JSON.stringify(data), {
          status: res.status,
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
        });
      } catch (err) {
        return new Response(
          JSON.stringify({
            success: false,
            message: err.message || "Proxy submission error",
          }),
          {
            status: 500,
            headers: {
              "Content-Type": "application/json",
              "Access-Control-Allow-Origin": "*",
            },
          }
        );
      }
    }

    // Everything else: serve static assets (Vite /dist build) with SPA fallback
    if (env.ASSETS) {
      const response = await env.ASSETS.fetch(request);
      
      // If the static asset exists (e.g. .css, .js, images, fonts), return it
      if (response.status !== 404) {
        return response;
      }

      // For client-side routes like /book, /gallery, /pricing, etc., serve index.html
      if (request.method === "GET" || request.method === "HEAD") {
        const indexUrl = new URL("/", request.url);
        const indexRequest = new Request(indexUrl, request);
        return env.ASSETS.fetch(indexRequest);
      }

      return response;
    }

    return new Response("Not found", { status: 404 });
  },
};
