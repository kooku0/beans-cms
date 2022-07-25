import formidable from 'formidable';
import { NextApiRequest, NextApiResponse } from 'next';
import { createRouter } from 'next-connect';

import { client, command } from '@/middlewares/s3';

const router = createRouter<NextApiRequest, NextApiResponse>();

const form = formidable(); // multiples means req.files will be an array

async function parseMultipartForm(req, res, next) {
  form.parse(req, (err, fields, files) => {
    if (!err) {
      req.body = fields; // sets the body field in the request object
      req.files = files; // sets the files field in the request object
    }
    next(); // continues to the next middleware or to the route
  });
}

router
  .use(parseMultipartForm)
  .post(async (req, res) => {
    const { image } = req.files;
    const buffer = Buffer.from(JSON.stringify(image));
    console.log(buffer);
    client.send(command(buffer));
    res.end('ok');
  });

export default router.handler({
  onError: (err, req, res) => {
    res.status(500).end('Something broke!');
  },
  onNoMatch: (req, res) => {
    const { method } = req;

    res.status(404).end(`${method?.toUpperCase()} is not supported`);
  },
});

export const config = {
  api: {
    bodyParser: false,
  },
};
