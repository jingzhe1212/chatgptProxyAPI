const TELEGRAPH_URL = 'https://api.openai.com';

const allowed_ip_address = ['0.0.0.0', '127.0.0.1']

addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {
  
  // 判断IP是否允许访问此接口
  /*
  const ip_address = request.headers.get('cf-connecting-ip');
  if (blocked_ip_address.includes(ip_address)) {
      let response = new Response('Access denied: Your IP address is blocked by Server.', {
          status: 403
      });
      return response
  }
  */
  
  const url = new URL(request.url);
  const headers_Origin = request.headers.get("Access-Control-Allow-Origin") || "*"
  url.host = TELEGRAPH_URL.replace(/^https?:\/\//, '');
  const modifiedRequest = new Request(url.toString(), {
    headers: request.headers,
    method: request.method,
    body: request.body,
    redirect: 'follow'
  });
  const response = await fetch(modifiedRequest);
  const modifiedResponse = new Response(response.body, response);
  // 添加允许跨域访问的响应头
  modifiedResponse.headers.set('Access-Control-Allow-Origin', headers_Origin);
  return modifiedResponse;
}


