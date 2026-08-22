exports.handler=async()=>({
  statusCode:200,
  headers:{"Content-Type":"application/json","Cache-Control":"no-store, max-age=0"},
  body:JSON.stringify({now:Date.now()})
});
