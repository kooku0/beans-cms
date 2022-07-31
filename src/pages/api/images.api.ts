import fs from 'fs';

import { IncomingForm } from 'formidable';
import { NextApiRequest, NextApiResponse } from 'next';
import { createRouter } from 'next-connect';

import { client, command } from '@/middlewares/s3';

const router = createRouter<NextApiRequest, NextApiResponse>();

const form = new IncomingForm();

router
  .post(async (req, res) => {
    form.parse(req, (err, fields, files) => {
      const file = (files as any).image[0];
      const { filepath, originalFilename: fileName } = file;

      const fileStream = fs.createReadStream(filepath);

      client.send(command(fileName, fileStream));
    });

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
