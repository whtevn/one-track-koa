require("babel-polyfill");
const middleware = (Router) => async (ctx, next) => {
  ctx.body = await Router
                    .find(ctx.method, ctx.path, ctx.headers, ctx.request.body, ctx)
                    .catch((err) => {
                      console.log(err.stack||err);
                      ctx.status = err.code||ctx.status;
                      return err;
                    });
}
export default middleware
