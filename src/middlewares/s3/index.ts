import {
  PutObjectCommand, S3Client,
} from '@aws-sdk/client-s3';

export const client = new S3Client({ region: process.env.AWS_S3_REGION });
export const command = (body: Buffer) => new PutObjectCommand({
  Bucket: process.env.AWS_S3_BUCKET,
  Key: 'helo.png',
  Body: body,
});
