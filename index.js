require("babel-polyfill");

const middleware = (Router) => async (ctx, next) => {
  let query = {};

  function parse_query_string(query){
    for (var q in query) {
      try{
        query[q] = JSON.parse(decodeURIComponent(ctx.query[q]))
      }
      catch (e){
        query[q] = ctx.query[q];
      }
    }
    return query;
  }
  
  query = parse_query_string(ctx.query);
  ctx.body = await Router
                    .find(ctx.method, ctx.path, ctx.headers, ctx.request.body, query, ctx)
                    .catch((err) => {
                      console.log(err.stack||err);
                      ctx.status = err.code||ctx.status;
                      return err;
                    });
}
export default middleware
