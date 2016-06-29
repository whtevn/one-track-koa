require("babel-polyfill");
const middleware = (Router) => async (ctx, next) => {
  const query = ctx.query.map(q => JSON.parse(q));
  ctx.body = await Router
                    .find(ctx.method, ctx.path, ctx.headers, ctx.request.body, query, ctx)
                    .catch((err) => {
                      console.log(err.stack||err);
                      ctx.status = err.code||ctx.status;
                      return err;
                    });
}
export default middleware
