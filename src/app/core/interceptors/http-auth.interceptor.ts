import {
  HttpHandlerFn,
  HttpInterceptorFn,
  HttpRequest,
} from '@angular/common/http';

export const httpAuthInterceptor: HttpInterceptorFn = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
) => {
  const userToken = 'MY_TOKEN';
  const modifiedReq = req.clone({
    headers: req.headers.set('Authorization', `Bearer ${userToken}`),
  });

  if (userToken) {
    return next(modifiedReq);
  }

  return next(req);
};
