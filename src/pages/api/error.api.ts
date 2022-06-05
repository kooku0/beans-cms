/* eslint-disable @typescript-eslint/no-unused-vars */
import { withSentry } from '@sentry/nextjs';

// NOTE - Server Side Error API 테스트
const handler = async (_req: any, _res: any) => {
  throw new Error('API throw error test');
};

export default withSentry(handler);
