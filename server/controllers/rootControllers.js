export const root = {
  path: '/{path*}',
  method: 'GET',
  handler: (req, res) => res.view('root')
};
