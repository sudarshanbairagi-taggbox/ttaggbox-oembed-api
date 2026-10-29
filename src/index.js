const WIDGET_HTML =
  '<iframe src="https://widget.taggbox.com/335719?website=1" ' +
  'width="820" height="700" loading="lazy" scrolling="auto" ' +
  'style="border:0;max-width:100%;overflow:auto" ' +
  'allow="fullscreen" allowfullscreen title="Taggbox Widget"></iframe>';

export default {
  async fetch(request) {
    const url = new URL(request.url);

    if (url.pathname !== "/oembed") {
      return Response.json({ error: "Not found" }, { status: 404 });
    }

    if (request.method !== "GET") {
      return Response.json(
        { error: "Method not allowed" },
        {
          status: 405,
          headers: { Allow: "GET" },
        }
      );
    }

    const targetUrl = url.searchParams.get("url");

    if (!targetUrl) {
      return Response.json(
        { error: "Missing required url parameter" },
        { status: 400 }
      );
    }

    let target;

    try {
      target = new URL(targetUrl);
    } catch {
      return Response.json(
        { error: "Invalid url parameter" },
        { status: 400 }
      );
    }

    if (
      target.protocol !== "https:" ||
      target.hostname !== "dawn-laurel.fugte.net" ||
      target.pathname !== "/w/6467bdfd-5ec8-4d30-9856-5ae7b4c55de8"
    ) {
      return Response.json(
        { error: "Unsupported URL" },
        { status: 400 }
      );
    }

    return Response.json({
      version: "1.0",
      type: "rich",
      provider_name: "Taggbox",
      provider_url: "https://taggbox.com",
      title: "Taggbox Widget",
      html: WIDGET_HTML,
      width: 820,
      height: 700,
    });
  },
};