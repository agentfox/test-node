exports.ignoreApi =
{
    "auth": [
      "/api/auth/register",
      "/api/auth/login",
      "/user/password/forgot",
      "/api/user",
      {
          url: '/api/product',
          method: ['GET']
      },
      {
        url: new RegExp('/api/product/detail/*'),
        method: ['GET']
      },
      {
        url: '/api/auth/admin/register',
        method: ['POST']
      }
    ],
    "client-api": [
      {
        url: new RegExp('/api/product/order/*'),
        method: ['POST', 'PUT' ,'DELETE']
      },
      {
        url: '/api/product/rate',
        method: ['PUT']
      }
    ],
    "admin-api": [
      {
        url: new RegExp('/api/product/detail/*'),
        method: ['PUT', 'DELETE']
      },
      {
        url: '/api/product',
        method: ['POST']
      }
    ]
}