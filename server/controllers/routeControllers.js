import { predict } from '../services/predict';

export const root = {
  path: '/',
  method: 'GET',
  handler: (req, res) => res('ROOT')
};

export const process = {
  path: '/process',
  method: 'POST',
  handler: (req, res) => {
    res(predict(req.payload));
  }
}
