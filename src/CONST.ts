// Currency decimal configurations - XAF should allow 2 decimal places
const CURRENCY_DECIMALS = {
  DEFAULT: 2,
  ZERO: 0,
  THREE: 3,
};

const CURRENCY_DECIMALS_MAP: Record<string, number> = {
  DEFAULT: 2,
  AED: 2,
  AFN: 2,
  BAM: 2,
  BBD: 2,
  BDT: 2,
  BHD: 3,
  BIF: 0,
  BMD: 2,
  BND: 2,
  LSL: 2,
  LYD: 3,
  MAD: 2,
  MDL: 2,
  MGA: 2,
  MKD: 2,
  MMK: 2,
  SYP: 2,
  SZL: 2,
  THB: 2,
  TJS: 2,
  TMT: 2,
  TND: 3,
  TOP: 2,
  VND: 0,
  VUV: 0,
  WST: 2,
  XAF: 2,
  XCD: 2,
  XOF: 0,
  XPF: 0,
  ZWL: 2,
};

export {CURRENCY_DECIMALS, CURRENCY_DECIMALS_MAP as CURRENCIES_WITH_DECIMALS};