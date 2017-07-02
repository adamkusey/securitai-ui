import { predict } from '../services/predict';

export const root = {
  path: '/api/',
  method: 'GET',
  handler: (req, res) => res('ROOT')
};

export const process = {
  path: '/api/process',
  method: 'POST',
  handler: (req, res) => {
    res(predict(req.payload));
  }
}
