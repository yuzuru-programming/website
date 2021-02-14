import {
  getAssetFromKV,
  mapRequestToAsset,
  serveSinglePageApp,
} from '@cloudflare/kv-asset-handler';

addEventListener('fetch', event => {
  try {
    event.respondWith(handleEvent(event));
  } catch (e) {
    event.respondWith(new Response('Internal Error', { status: 500 }));
  }
});

async function handleEvent(event) {
  try {
    let resp = await getAssetFromKV(event, {});

    // SPA用
    // let resp = await getAssetFromKV(event, {
    //   mapRequestToAsset: serveSinglePageApp,
    // });

    resp = new Response(resp.body, {
      status: resp.status,
      headers: resp.headers,
      statusText: resp.statusText,
    });

    resp.headers.set('X-Frame-Options', 'SAMEORIGIN');

    return resp;
  } catch (e) {
    try {
      let notFoundResponse = await getAssetFromKV(event, {
        mapRequestToAsset: req =>
          new Request(`${new URL(req.url).origin}/404.html`, req),
      });

      return new Response(notFoundResponse.body, {
        ...notFoundResponse,
        status: 404,
      });
    } catch (e) {}

    return new Response(e.message || e.toString(), { status: 500 });
  }
}
