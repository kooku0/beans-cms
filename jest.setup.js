import { setLogger } from 'react-query';
import { Globals } from 'react-spring';

import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';

import '@testing-library/jest-dom/extend-expect';
import 'jest-plugin-context/setup';
import 'given2/setup';

Globals.assign({
  skipAnimation: true,
});

setLogger({
  log: console.log,
  warn: console.warn,
  // ✅ no more errors on the console
  error: () => {},
});

dayjs.extend(utc);
dayjs.extend(timezone);

dayjs.tz.setDefault('Asia/Seoul');
