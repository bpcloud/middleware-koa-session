# koa session middleware in bpframework.

### Middleware specification

https://github.com/bpcloud/middleware

### usage

`use koa-session`


Setup.

```js
import { Application } from 'bpframework';
import * as middleware_session from '@bpframework/middleware-koa-session';

let cfg = {
  keys: ['secure keys']
};

Application.use(middleware_session.middleware(cfg))
Application.runKoa(...);
```

Add global types declare

```js
import { Session } from '@bpframework/middleware-koa-session';

declare module 'bpframework' {
  export interface RestRequest {
    session: Session;
  }
}
```

Use in RestController.

```js
@RequestMapping({
  path: '/test',
  method: RequestMethod.GET,
})
async test(
  @RestObject restObj: RestObjectTypeRest<koa.Context> // or RestObjectType
): Promise<any> {

  // session is new.
  if (this.session.isNew) {
    // user has not logged in
  } else {
    // user has already logged in
  }

  // set session value.
  restObj.request.session.a = 1;

  // get session value.
  console.log(restObj.request.session.a);

  // destroy session.
  restObj.request.session = null;

  ...
}
```