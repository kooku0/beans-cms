import { PropsWithChildren, ReactElement } from 'react';

import { MutableSnapshot, RecoilRoot } from 'recoil';

import { DepositAccountHistoryTypeKey } from '@/models/depositAccount';
import { OrderCountInput, OrderViewKey } from '@/models/order';
import { ChartRangeTypeKey } from '@/models/trading';
import { isNormalLogoutState } from '@/recoil/auth/atom';
import { ThemeMode, themeModeState } from '@/recoil/common/atom';
import historyCodeState from '@/recoil/depositAccountHistory/historyCode/atom';
import historyTypeState from '@/recoil/depositAccountHistory/historyType/atom';
import { FaqFilterOption, faqFilterOptionState } from '@/recoil/faq/atom';
import dabsCodeState from '@/recoil/home/dabsCode/atom';
import { orderCountInputState, orderViewTypeState } from '@/recoil/order/atom';
import { PriceViewType, priceViewTypeState } from '@/recoil/priceTable/atom';
import rangeTypeAtom from '@/recoil/tradingChart/rangeType';

const initOrderInputState = {
  price: 0,
  quantity: 0,
};

interface Props {
  themeMode?: ThemeMode;
  rangeType?: ChartRangeTypeKey;
  historyType?: DepositAccountHistoryTypeKey;
  historyCode?: string | null;
  orderViewType?: OrderViewKey;
  orderCountInput?: OrderCountInput;
  dabsCode?: string | null;
  isNormalLogout?: boolean;
  priceViewType?: PriceViewType;
  faqFilterOption?: FaqFilterOption;
}

function InjectTestingRecoil({
  themeMode = 'LIGHT',
  rangeType = '1d',
  orderViewType = 'buy',
  priceViewType = 'orderBook',
  orderCountInput = initOrderInputState,
  historyType = 'buy',
  historyCode = null,
  dabsCode = 'dabsCode',
  isNormalLogout = false,
  faqFilterOption = {},
  children,
}: PropsWithChildren<Props>): ReactElement {
  return (
    <RecoilRoot
      initializeState={({ set }: MutableSnapshot): void => {
        set(themeModeState, themeMode);
        set(rangeTypeAtom, rangeType);
        set(orderViewTypeState, orderViewType);
        set(orderCountInputState, orderCountInput);
        set(dabsCodeState, dabsCode);
        set(historyTypeState, historyType);
        set(historyCodeState, historyCode);
        set(isNormalLogoutState, isNormalLogout);
        set(priceViewTypeState, priceViewType);
        set(faqFilterOptionState, faqFilterOption);
      }}
    >
      {children}
    </RecoilRoot>
  );
}

export default InjectTestingRecoil;
