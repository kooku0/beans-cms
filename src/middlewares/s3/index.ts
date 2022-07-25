import {
  PutObjectCommand, S3Client,
} from '@aws-sdk/client-s3';

export const client = new S3Client({ region: process.env.AWS_S3_REGION });
export const command = (file: Buffer) => new PutObjectCommand({
  Bucket: process.env.AWS_S3_BUCKET,
  Key: 'test.png',
  Body: file,
});
