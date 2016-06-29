require("babel-polyfill");

const middleware = (Router) => async (ctx, next) => {
  let query = {};
  for(var q in ctx.query){
    query[q] = JSON.parse(ctx.query[q]);
  }
  ctx.body = await Router
                    .find(ctx.method, ctx.path, ctx.headers, ctx.request.body, query, ctx)
                    .catch((err) => {
                      console.log(err.stack||err);
                      ctx.status = err.code||ctx.status;
                      return err;
                    });
}
export default middleware
