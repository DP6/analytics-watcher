import { commonRules } from './1.rules';

interface Metadata {
  [key: string]: {
    name: string;
    required?: boolean;
    length?: number;
    rule?: Function;
  };
}

export const metadata: Metadata = {
  // Hit
  t: {
    name: 'hit type',
    required: true,
    rule: commonRules.hit,
  },
  ni: {
    name: 'non interaction',
    rule: commonRules.boolean,
  },

  // Content Information
  dl: {
    name: 'location',
  },
  dh: {
    name: 'hostname',
    length: 100,
    rule: commonRules.string,
  },
  dp: {
    name: 'page',
    length: 2048,
    rule: commonRules.string,
  },
  dt: {
    name: 'title',
    length: 1500,
    rule: commonRules.string,
  },
  cd: {
    name: 'description',
    length: 2048,
    rule: commonRules.string,
  },
  cg0: {
    name: 'content group 0',
    length: 100,
    rule: commonRules.string,
  },
  cg1: {
    name: 'content group 1',
    length: 100,
    rule: commonRules.string,
  },
  cg2: {
    name: 'content group 2',
    length: 100,
    rule: commonRules.string,
  },
  cg3: {
    name: 'content group 3',
    length: 100,
    rule: commonRules.string,
  },
  cg4: {
    name: 'content group 4',
    length: 100,
    rule: commonRules.string,
  },
  cg5: {
    name: 'content group 5',
    length: 100,
    rule: commonRules.string,
  },
  cg6: {
    name: 'content group 6',
    length: 100,
    rule: commonRules.string,
  },
  cg7: {
    name: 'content group 7',
    length: 100,
    rule: commonRules.string,
  },
  cg8: {
    name: 'content group 8',
    length: 100,
    rule: commonRules.string,
  },
  cg9: {
    name: 'content group 9',
    length: 100,
    rule: commonRules.string,
  },

  // "Event Tracking"
  ec: {
    name: 'event category',
    length: 150,
    rule: commonRules.string,
  },
  ea: {
    name: 'event action',
    length: 500,
    rule: commonRules.string,
  },
  el: {
    name: 'event label',
    length: 500,
    rule: commonRules.string,
  },
  ev: {
    name: 'event value',
    rule: commonRules.integer,
  },

  // "E-Commerce"
  ti: {
    name: 'transaction id',
    length: 500,
    rule: commonRules.string,
    // Required for transaction hit type.
    // Required for item hit type.
  },
  ta: {
    name: 'affiliation',
    length: 500,
    rule: commonRules.string,
  },
  tr: {
    name: 'revenue',
    rule: commonRules.currency,
  },
  ts: {
    name: 'shipping',
    rule: commonRules.currency,
  },
  tt: {
    name: 'tax',
    rule: commonRules.currency,
  },
  ip: {
    name: 'item price',
    rule: commonRules.currency,
  },
  iq: {
    name: 'item quantity',
    rule: commonRules.integer,
  },
  ic: {
    name: 'item code',
    length: 500,
    rule: commonRules.string,
  },
  in: {
    name: 'item name',
    length: 500,
    rule: commonRules.string,
  },
  iv: {
    name: 'item category',
    length: 500,
    rule: commonRules.string,
  },

  // "Social Interactions"
  sa: {
    name: 'social action',
    length: 50,
    rule: commonRules.string,
  },
  sn: {
    name: 'social network',
    length: 50,
    rule: commonRules.string,
  },
  st: {
    name: 'social target',
    length: 2048,
    rule: commonRules.string,
  },

  // "Timing"
  utc: {
    name: 'timing category',
    length: 150,
    rule: commonRules.string,
  },
  utv: {
    name: 'timing variable',
    length: 500,
    rule: commonRules.string,
  },
  utt: {
    name: 'timing time',
    rule: commonRules.integer,
  },
  utl: {
    name: 'timing label',
    length: 500,
    rule: commonRules.string,
  },
  plt: {
    name: 'page load time',
    rule: commonRules.integer,
  },
  dns: {
    name: 'dns time',
    rule: commonRules.integer,
  },
  pdt: {
    name: 'page download time',
    rule: commonRules.integer,
  },
  rrt: {
    name: 'redirect response time',
    rule: commonRules.integer,
  },
  tcp: {
    name: 'tcp connect time',
    rule: commonRules.integer,
  },
  srt: {
    name: 'server response time',
    rule: commonRules.integer,
  },
  dit: {
    name: 'dom interactive time',
    rule: commonRules.integer,
  },
  clt: {
    name: 'content loading time',
    rule: commonRules.integer,
  },

  // "Custom Dimensions"
  cd0: {
    name: 'dimension 0',
    length: 150,
    rule: commonRules.string,
  },
  cd1: {
    name: 'dimension 1',
    length: 150,
    rule: commonRules.string,
  },
  cd2: {
    name: 'dimension 2',
    length: 150,
    rule: commonRules.string,
  },
  cd3: {
    name: 'dimension 3',
    length: 150,
    rule: commonRules.string,
  },
  cd4: {
    name: 'dimension 4',
    length: 150,
    rule: commonRules.string,
  },
  cd5: {
    name: 'dimension 5',
    length: 150,
    rule: commonRules.string,
  },
  cd6: {
    name: 'dimension 6',
    length: 150,
    rule: commonRules.string,
  },
  cd7: {
    name: 'dimension 7',
    length: 150,
    rule: commonRules.string,
  },
  cd8: {
    name: 'dimension 8',
    length: 150,
    rule: commonRules.string,
  },
  cd9: {
    name: 'dimension 9',
    length: 150,
    rule: commonRules.string,
  },
  cd10: {
    name: 'dimension 10',
    length: 150,
    rule: commonRules.string,
  },
  cd11: {
    name: 'dimension 11',
    length: 150,
    rule: commonRules.string,
  },
  cd12: {
    name: 'dimension 12',
    length: 150,
    rule: commonRules.string,
  },
  cd13: {
    name: 'dimension 13',
    length: 150,
    rule: commonRules.string,
  },
  cd14: {
    name: 'dimension 14',
    length: 150,
    rule: commonRules.string,
  },
  cd15: {
    name: 'dimension 15',
    length: 150,
    rule: commonRules.string,
  },
  cd16: {
    name: 'dimension 16',
    length: 150,
    rule: commonRules.string,
  },
  cd17: {
    name: 'dimension 17',
    length: 150,
    rule: commonRules.string,
  },
  cd18: {
    name: 'dimension 18',
    length: 150,
    rule: commonRules.string,
  },
  cd19: {
    name: 'dimension 19',
    length: 150,
    rule: commonRules.string,
  },
  cd20: {
    name: 'dimension 20',
    length: 150,
    rule: commonRules.string,
  },
  cd21: {
    name: 'dimension 21',
    length: 150,
    rule: commonRules.string,
  },
  cd22: {
    name: 'dimension 22',
    length: 150,
    rule: commonRules.string,
  },
  cd23: {
    name: 'dimension 23',
    length: 150,
    rule: commonRules.string,
  },
  cd24: {
    name: 'dimension 24',
    length: 150,
    rule: commonRules.string,
  },
  cd25: {
    name: 'dimension 25',
    length: 150,
    rule: commonRules.string,
  },
  cd26: {
    name: 'dimension 26',
    length: 150,
    rule: commonRules.string,
  },
  cd27: {
    name: 'dimension 27',
    length: 150,
    rule: commonRules.string,
  },
  cd28: {
    name: 'dimension 28',
    length: 150,
    rule: commonRules.string,
  },
  cd29: {
    name: 'dimension 29',
    length: 150,
    rule: commonRules.string,
  },
  cd30: {
    name: 'dimension 30',
    length: 150,
    rule: commonRules.string,
  },
  cd31: {
    name: 'dimension 31',
    length: 150,
    rule: commonRules.string,
  },
  cd32: {
    name: 'dimension 32',
    length: 150,
    rule: commonRules.string,
  },
  cd33: {
    name: 'dimension 33',
    length: 150,
    rule: commonRules.string,
  },
  cd34: {
    name: 'dimension 34',
    length: 150,
    rule: commonRules.string,
  },
  cd35: {
    name: 'dimension 35',
    length: 150,
    rule: commonRules.string,
  },
  cd36: {
    name: 'dimension 36',
    length: 150,
    rule: commonRules.string,
  },
  cd37: {
    name: 'dimension 37',
    length: 150,
    rule: commonRules.string,
  },
  cd38: {
    name: 'dimension 38',
    length: 150,
    rule: commonRules.string,
  },
  cd39: {
    name: 'dimension 39',
    length: 150,
    rule: commonRules.string,
  },
  cd40: {
    name: 'dimension 40',
    length: 150,
    rule: commonRules.string,
  },
  cd41: {
    name: 'dimension 41',
    length: 150,
    rule: commonRules.string,
  },
  cd42: {
    name: 'dimension 42',
    length: 150,
    rule: commonRules.string,
  },
  cd43: {
    name: 'dimension 43',
    length: 150,
    rule: commonRules.string,
  },
  cd44: {
    name: 'dimension 44',
    length: 150,
    rule: commonRules.string,
  },
  cd45: {
    name: 'dimension 45',
    length: 150,
    rule: commonRules.string,
  },
  cd46: {
    name: 'dimension 46',
    length: 150,
    rule: commonRules.string,
  },
  cd47: {
    name: 'dimension 47',
    length: 150,
    rule: commonRules.string,
  },
  cd48: {
    name: 'dimension 48',
    length: 150,
    rule: commonRules.string,
  },
  cd49: {
    name: 'dimension 49',
    length: 150,
    rule: commonRules.string,
  },
  cd50: {
    name: 'dimension 50',
    length: 150,
    rule: commonRules.string,
  },
  cd51: {
    name: 'dimension 51',
    length: 150,
    rule: commonRules.string,
  },
  cd52: {
    name: 'dimension 52',
    length: 150,
    rule: commonRules.string,
  },
  cd53: {
    name: 'dimension 53',
    length: 150,
    rule: commonRules.string,
  },
  cd54: {
    name: 'dimension 54',
    length: 150,
    rule: commonRules.string,
  },
  cd55: {
    name: 'dimension 55',
    length: 150,
    rule: commonRules.string,
  },
  cd56: {
    name: 'dimension 56',
    length: 150,
    rule: commonRules.string,
  },
  cd57: {
    name: 'dimension 57',
    length: 150,
    rule: commonRules.string,
  },
  cd58: {
    name: 'dimension 58',
    length: 150,
    rule: commonRules.string,
  },
  cd59: {
    name: 'dimension 59',
    length: 150,
    rule: commonRules.string,
  },
  cd60: {
    name: 'dimension 60',
    length: 150,
    rule: commonRules.string,
  },
  cd61: {
    name: 'dimension 61',
    length: 150,
    rule: commonRules.string,
  },
  cd62: {
    name: 'dimension 62',
    length: 150,
    rule: commonRules.string,
  },
  cd63: {
    name: 'dimension 63',
    length: 150,
    rule: commonRules.string,
  },
  cd64: {
    name: 'dimension 64',
    length: 150,
    rule: commonRules.string,
  },
  cd65: {
    name: 'dimension 65',
    length: 150,
    rule: commonRules.string,
  },
  cd66: {
    name: 'dimension 66',
    length: 150,
    rule: commonRules.string,
  },
  cd67: {
    name: 'dimension 67',
    length: 150,
    rule: commonRules.string,
  },
  cd68: {
    name: 'dimension 68',
    length: 150,
    rule: commonRules.string,
  },
  cd69: {
    name: 'dimension 69',
    length: 150,
    rule: commonRules.string,
  },
  cd70: {
    name: 'dimension 70',
    length: 150,
    rule: commonRules.string,
  },
  cd71: {
    name: 'dimension 71',
    length: 150,
    rule: commonRules.string,
  },
  cd72: {
    name: 'dimension 72',
    length: 150,
    rule: commonRules.string,
  },
  cd73: {
    name: 'dimension 73',
    length: 150,
    rule: commonRules.string,
  },
  cd74: {
    name: 'dimension 74',
    length: 150,
    rule: commonRules.string,
  },
  cd75: {
    name: 'dimension 75',
    length: 150,
    rule: commonRules.string,
  },
  cd76: {
    name: 'dimension 76',
    length: 150,
    rule: commonRules.string,
  },
  cd77: {
    name: 'dimension 77',
    length: 150,
    rule: commonRules.string,
  },
  cd78: {
    name: 'dimension 78',
    length: 150,
    rule: commonRules.string,
  },
  cd79: {
    name: 'dimension 79',
    length: 150,
    rule: commonRules.string,
  },
  cd80: {
    name: 'dimension 80',
    length: 150,
    rule: commonRules.string,
  },
  cd81: {
    name: 'dimension 81',
    length: 150,
    rule: commonRules.string,
  },
  cd82: {
    name: 'dimension 82',
    length: 150,
    rule: commonRules.string,
  },
  cd83: {
    name: 'dimension 83',
    length: 150,
    rule: commonRules.string,
  },
  cd84: {
    name: 'dimension 84',
    length: 150,
    rule: commonRules.string,
  },
  cd85: {
    name: 'dimension 85',
    length: 150,
    rule: commonRules.string,
  },
  cd86: {
    name: 'dimension 86',
    length: 150,
    rule: commonRules.string,
  },
  cd87: {
    name: 'dimension 87',
    length: 150,
    rule: commonRules.string,
  },
  cd88: {
    name: 'dimension 88',
    length: 150,
    rule: commonRules.string,
  },
  cd89: {
    name: 'dimension 89',
    length: 150,
    rule: commonRules.string,
  },
  cd90: {
    name: 'dimension 90',
    length: 150,
    rule: commonRules.string,
  },
  cd91: {
    name: 'dimension 91',
    length: 150,
    rule: commonRules.string,
  },
  cd92: {
    name: 'dimension 92',
    length: 150,
    rule: commonRules.string,
  },
  cd93: {
    name: 'dimension 93',
    length: 150,
    rule: commonRules.string,
  },
  cd94: {
    name: 'dimension 94',
    length: 150,
    rule: commonRules.string,
  },
  cd95: {
    name: 'dimension 95',
    length: 150,
    rule: commonRules.string,
  },
  cd96: {
    name: 'dimension 96',
    length: 150,
    rule: commonRules.string,
  },
  cd97: {
    name: 'dimension 97',
    length: 150,
    rule: commonRules.string,
  },
  cd98: {
    name: 'dimension 98',
    length: 150,
    rule: commonRules.string,
  },
  cd99: {
    name: 'dimension 99',
    length: 150,
    rule: commonRules.string,
  },
  cd100: {
    name: 'dimension 100',
    length: 150,
    rule: commonRules.string,
  },
  cd101: {
    name: 'dimension 101',
    length: 150,
    rule: commonRules.string,
  },
  cd102: {
    name: 'dimension 102',
    length: 150,
    rule: commonRules.string,
  },
  cd103: {
    name: 'dimension 103',
    length: 150,
    rule: commonRules.string,
  },
  cd104: {
    name: 'dimension 104',
    length: 150,
    rule: commonRules.string,
  },
  cd105: {
    name: 'dimension 105',
    length: 150,
    rule: commonRules.string,
  },
  cd106: {
    name: 'dimension 106',
    length: 150,
    rule: commonRules.string,
  },
  cd107: {
    name: 'dimension 107',
    length: 150,
    rule: commonRules.string,
  },
  cd108: {
    name: 'dimension 108',
    length: 150,
    rule: commonRules.string,
  },
  cd109: {
    name: 'dimension 109',
    length: 150,
    rule: commonRules.string,
  },
  cd110: {
    name: 'dimension 110',
    length: 150,
    rule: commonRules.string,
  },
  cd111: {
    name: 'dimension 111',
    length: 150,
    rule: commonRules.string,
  },
  cd112: {
    name: 'dimension 112',
    length: 150,
    rule: commonRules.string,
  },
  cd113: {
    name: 'dimension 113',
    length: 150,
    rule: commonRules.string,
  },
  cd114: {
    name: 'dimension 114',
    length: 150,
    rule: commonRules.string,
  },
  cd115: {
    name: 'dimension 115',
    length: 150,
    rule: commonRules.string,
  },
  cd116: {
    name: 'dimension 116',
    length: 150,
    rule: commonRules.string,
  },
  cd117: {
    name: 'dimension 117',
    length: 150,
    rule: commonRules.string,
  },
  cd118: {
    name: 'dimension 118',
    length: 150,
    rule: commonRules.string,
  },
  cd119: {
    name: 'dimension 119',
    length: 150,
    rule: commonRules.string,
  },
  cd120: {
    name: 'dimension 120',
    length: 150,
    rule: commonRules.string,
  },
  cd121: {
    name: 'dimension 121',
    length: 150,
    rule: commonRules.string,
  },
  cd122: {
    name: 'dimension 122',
    length: 150,
    rule: commonRules.string,
  },
  cd123: {
    name: 'dimension 123',
    length: 150,
    rule: commonRules.string,
  },
  cd124: {
    name: 'dimension 124',
    length: 150,
    rule: commonRules.string,
  },
  cd125: {
    name: 'dimension 125',
    length: 150,
    rule: commonRules.string,
  },
  cd126: {
    name: 'dimension 126',
    length: 150,
    rule: commonRules.string,
  },
  cd127: {
    name: 'dimension 127',
    length: 150,
    rule: commonRules.string,
  },
  cd128: {
    name: 'dimension 128',
    length: 150,
    rule: commonRules.string,
  },
  cd129: {
    name: 'dimension 129',
    length: 150,
    rule: commonRules.string,
  },
  cd130: {
    name: 'dimension 130',
    length: 150,
    rule: commonRules.string,
  },
  cd131: {
    name: 'dimension 131',
    length: 150,
    rule: commonRules.string,
  },
  cd132: {
    name: 'dimension 132',
    length: 150,
    rule: commonRules.string,
  },
  cd133: {
    name: 'dimension 133',
    length: 150,
    rule: commonRules.string,
  },
  cd134: {
    name: 'dimension 134',
    length: 150,
    rule: commonRules.string,
  },
  cd135: {
    name: 'dimension 135',
    length: 150,
    rule: commonRules.string,
  },
  cd136: {
    name: 'dimension 136',
    length: 150,
    rule: commonRules.string,
  },
  cd137: {
    name: 'dimension 137',
    length: 150,
    rule: commonRules.string,
  },
  cd138: {
    name: 'dimension 138',
    length: 150,
    rule: commonRules.string,
  },
  cd139: {
    name: 'dimension 139',
    length: 150,
    rule: commonRules.string,
  },
  cd140: {
    name: 'dimension 140',
    length: 150,
    rule: commonRules.string,
  },
  cd141: {
    name: 'dimension 141',
    length: 150,
    rule: commonRules.string,
  },
  cd142: {
    name: 'dimension 142',
    length: 150,
    rule: commonRules.string,
  },
  cd143: {
    name: 'dimension 143',
    length: 150,
    rule: commonRules.string,
  },
  cd144: {
    name: 'dimension 144',
    length: 150,
    rule: commonRules.string,
  },
  cd145: {
    name: 'dimension 145',
    length: 150,
    rule: commonRules.string,
  },
  cd146: {
    name: 'dimension 146',
    length: 150,
    rule: commonRules.string,
  },
  cd147: {
    name: 'dimension 147',
    length: 150,
    rule: commonRules.string,
  },
  cd148: {
    name: 'dimension 148',
    length: 150,
    rule: commonRules.string,
  },
  cd149: {
    name: 'dimension 149',
    length: 150,
    rule: commonRules.string,
  },
  cd150: {
    name: 'dimension 150',
    length: 150,
    rule: commonRules.string,
  },
  cd151: {
    name: 'dimension 151',
    length: 150,
    rule: commonRules.string,
  },
  cd152: {
    name: 'dimension 152',
    length: 150,
    rule: commonRules.string,
  },
  cd153: {
    name: 'dimension 153',
    length: 150,
    rule: commonRules.string,
  },
  cd154: {
    name: 'dimension 154',
    length: 150,
    rule: commonRules.string,
  },
  cd155: {
    name: 'dimension 155',
    length: 150,
    rule: commonRules.string,
  },
  cd156: {
    name: 'dimension 156',
    length: 150,
    rule: commonRules.string,
  },
  cd157: {
    name: 'dimension 157',
    length: 150,
    rule: commonRules.string,
  },
  cd158: {
    name: 'dimension 158',
    length: 150,
    rule: commonRules.string,
  },
  cd159: {
    name: 'dimension 159',
    length: 150,
    rule: commonRules.string,
  },
  cd160: {
    name: 'dimension 160',
    length: 150,
    rule: commonRules.string,
  },
  cd161: {
    name: 'dimension 161',
    length: 150,
    rule: commonRules.string,
  },
  cd162: {
    name: 'dimension 162',
    length: 150,
    rule: commonRules.string,
  },
  cd163: {
    name: 'dimension 163',
    length: 150,
    rule: commonRules.string,
  },
  cd164: {
    name: 'dimension 164',
    length: 150,
    rule: commonRules.string,
  },
  cd165: {
    name: 'dimension 165',
    length: 150,
    rule: commonRules.string,
  },
  cd166: {
    name: 'dimension 166',
    length: 150,
    rule: commonRules.string,
  },
  cd167: {
    name: 'dimension 167',
    length: 150,
    rule: commonRules.string,
  },
  cd168: {
    name: 'dimension 168',
    length: 150,
    rule: commonRules.string,
  },
  cd169: {
    name: 'dimension 169',
    length: 150,
    rule: commonRules.string,
  },
  cd170: {
    name: 'dimension 170',
    length: 150,
    rule: commonRules.string,
  },
  cd171: {
    name: 'dimension 171',
    length: 150,
    rule: commonRules.string,
  },
  cd172: {
    name: 'dimension 172',
    length: 150,
    rule: commonRules.string,
  },
  cd173: {
    name: 'dimension 173',
    length: 150,
    rule: commonRules.string,
  },
  cd174: {
    name: 'dimension 174',
    length: 150,
    rule: commonRules.string,
  },
  cd175: {
    name: 'dimension 175',
    length: 150,
    rule: commonRules.string,
  },
  cd176: {
    name: 'dimension 176',
    length: 150,
    rule: commonRules.string,
  },
  cd177: {
    name: 'dimension 177',
    length: 150,
    rule: commonRules.string,
  },
  cd178: {
    name: 'dimension 178',
    length: 150,
    rule: commonRules.string,
  },
  cd179: {
    name: 'dimension 179',
    length: 150,
    rule: commonRules.string,
  },
  cd180: {
    name: 'dimension 180',
    length: 150,
    rule: commonRules.string,
  },
  cd181: {
    name: 'dimension 181',
    length: 150,
    rule: commonRules.string,
  },
  cd182: {
    name: 'dimension 182',
    length: 150,
    rule: commonRules.string,
  },
  cd183: {
    name: 'dimension 183',
    length: 150,
    rule: commonRules.string,
  },
  cd184: {
    name: 'dimension 184',
    length: 150,
    rule: commonRules.string,
  },
  cd185: {
    name: 'dimension 185',
    length: 150,
    rule: commonRules.string,
  },
  cd186: {
    name: 'dimension 186',
    length: 150,
    rule: commonRules.string,
  },
  cd187: {
    name: 'dimension 187',
    length: 150,
    rule: commonRules.string,
  },
  cd188: {
    name: 'dimension 188',
    length: 150,
    rule: commonRules.string,
  },
  cd189: {
    name: 'dimension 189',
    length: 150,
    rule: commonRules.string,
  },
  cd190: {
    name: 'dimension 190',
    length: 150,
    rule: commonRules.string,
  },
  cd191: {
    name: 'dimension 191',
    length: 150,
    rule: commonRules.string,
  },
  cd192: {
    name: 'dimension 192',
    length: 150,
    rule: commonRules.string,
  },
  cd193: {
    name: 'dimension 193',
    length: 150,
    rule: commonRules.string,
  },
  cd194: {
    name: 'dimension 194',
    length: 150,
    rule: commonRules.string,
  },
  cd195: {
    name: 'dimension 195',
    length: 150,
    rule: commonRules.string,
  },
  cd196: {
    name: 'dimension 196',
    length: 150,
    rule: commonRules.string,
  },
  cd197: {
    name: 'dimension 197',
    length: 150,
    rule: commonRules.string,
  },
  cd198: {
    name: 'dimension 198',
    length: 150,
    rule: commonRules.string,
  },
  cd199: {
    name: 'dimension 199',
    length: 150,
    rule: commonRules.string,
  },
  cd200: {
    name: 'dimension 200',
    length: 150,
    rule: commonRules.string,
  },

  // "Custom Metric"
  cm1: {
    name: 'metric 1',
    length: 150,
    rule: commonRules.integer,
  },
  cm2: {
    name: 'metric 2',
    length: 150,
    rule: commonRules.integer,
  },
  cm3: {
    name: 'metric 3',
    length: 150,
    rule: commonRules.integer,
  },
  cm4: {
    name: 'metric 4',
    length: 150,
    rule: commonRules.integer,
  },
  cm5: {
    name: 'metric 5',
    length: 150,
    rule: commonRules.integer,
  },
  cm6: {
    name: 'metric 6',
    length: 150,
    rule: commonRules.integer,
  },
  cm7: {
    name: 'metric 7',
    length: 150,
    rule: commonRules.integer,
  },
  cm8: {
    name: 'metric 8',
    length: 150,
    rule: commonRules.integer,
  },
  cm9: {
    name: 'metric 9',
    length: 150,
    rule: commonRules.integer,
  },
  cm10: {
    name: 'metric 10',
    length: 150,
    rule: commonRules.integer,
  },
  cm11: {
    name: 'metric 11',
    length: 150,
    rule: commonRules.integer,
  },
  cm12: {
    name: 'metric 12',
    length: 150,
    rule: commonRules.integer,
  },
  cm13: {
    name: 'metric 13',
    length: 150,
    rule: commonRules.integer,
  },
  cm14: {
    name: 'metric 14',
    length: 150,
    rule: commonRules.integer,
  },
  cm15: {
    name: 'metric 15',
    length: 150,
    rule: commonRules.integer,
  },
  cm16: {
    name: 'metric 16',
    length: 150,
    rule: commonRules.integer,
  },
  cm17: {
    name: 'metric 17',
    length: 150,
    rule: commonRules.integer,
  },
  cm18: {
    name: 'metric 18',
    length: 150,
    rule: commonRules.integer,
  },
  cm19: {
    name: 'metric 19',
    length: 150,
    rule: commonRules.integer,
  },
  cm20: {
    name: 'metric 20',
    length: 150,
    rule: commonRules.integer,
  },
  cm21: {
    name: 'metric 21',
    length: 150,
    rule: commonRules.integer,
  },
  cm22: {
    name: 'metric 22',
    length: 150,
    rule: commonRules.integer,
  },
  cm23: {
    name: 'metric 23',
    length: 150,
    rule: commonRules.integer,
  },
  cm24: {
    name: 'metric 24',
    length: 150,
    rule: commonRules.integer,
  },
  cm25: {
    name: 'metric 25',
    length: 150,
    rule: commonRules.integer,
  },
  cm26: {
    name: 'metric 26',
    length: 150,
    rule: commonRules.integer,
  },
  cm27: {
    name: 'metric 27',
    length: 150,
    rule: commonRules.integer,
  },
  cm28: {
    name: 'metric 28',
    length: 150,
    rule: commonRules.integer,
  },
  cm29: {
    name: 'metric 29',
    length: 150,
    rule: commonRules.integer,
  },
  cm30: {
    name: 'metric 30',
    length: 150,
    rule: commonRules.integer,
  },
  cm31: {
    name: 'metric 31',
    length: 150,
    rule: commonRules.integer,
  },
  cm32: {
    name: 'metric 32',
    length: 150,
    rule: commonRules.integer,
  },
  cm33: {
    name: 'metric 33',
    length: 150,
    rule: commonRules.integer,
  },
  cm34: {
    name: 'metric 34',
    length: 150,
    rule: commonRules.integer,
  },
  cm35: {
    name: 'metric 35',
    length: 150,
    rule: commonRules.integer,
  },
  cm36: {
    name: 'metric 36',
    length: 150,
    rule: commonRules.integer,
  },
  cm37: {
    name: 'metric 37',
    length: 150,
    rule: commonRules.integer,
  },
  cm38: {
    name: 'metric 38',
    length: 150,
    rule: commonRules.integer,
  },
  cm39: {
    name: 'metric 39',
    length: 150,
    rule: commonRules.integer,
  },
  cm40: {
    name: 'metric 40',
    length: 150,
    rule: commonRules.integer,
  },
  cm41: {
    name: 'metric 41',
    length: 150,
    rule: commonRules.integer,
  },
  cm42: {
    name: 'metric 42',
    length: 150,
    rule: commonRules.integer,
  },
  cm43: {
    name: 'metric 43',
    length: 150,
    rule: commonRules.integer,
  },
  cm44: {
    name: 'metric 44',
    length: 150,
    rule: commonRules.integer,
  },
  cm45: {
    name: 'metric 45',
    length: 150,
    rule: commonRules.integer,
  },
  cm46: {
    name: 'metric 46',
    length: 150,
    rule: commonRules.integer,
  },
  cm47: {
    name: 'metric 47',
    length: 150,
    rule: commonRules.integer,
  },
  cm48: {
    name: 'metric 48',
    length: 150,
    rule: commonRules.integer,
  },
  cm49: {
    name: 'metric 49',
    length: 150,
    rule: commonRules.integer,
  },
  cm50: {
    name: 'metric 50',
    length: 150,
    rule: commonRules.integer,
  },
  cm51: {
    name: 'metric 51',
    length: 150,
    rule: commonRules.integer,
  },
  cm52: {
    name: 'metric 52',
    length: 150,
    rule: commonRules.integer,
  },
  cm53: {
    name: 'metric 53',
    length: 150,
    rule: commonRules.integer,
  },
  cm54: {
    name: 'metric 54',
    length: 150,
    rule: commonRules.integer,
  },
  cm55: {
    name: 'metric 55',
    length: 150,
    rule: commonRules.integer,
  },
  cm56: {
    name: 'metric 56',
    length: 150,
    rule: commonRules.integer,
  },
  cm57: {
    name: 'metric 57',
    length: 150,
    rule: commonRules.integer,
  },
  cm58: {
    name: 'metric 58',
    length: 150,
    rule: commonRules.integer,
  },
  cm59: {
    name: 'metric 59',
    length: 150,
    rule: commonRules.integer,
  },
  cm60: {
    name: 'metric 60',
    length: 150,
    rule: commonRules.integer,
  },
  cm61: {
    name: 'metric 61',
    length: 150,
    rule: commonRules.integer,
  },
  cm62: {
    name: 'metric 62',
    length: 150,
    rule: commonRules.integer,
  },
  cm63: {
    name: 'metric 63',
    length: 150,
    rule: commonRules.integer,
  },
  cm64: {
    name: 'metric 64',
    length: 150,
    rule: commonRules.integer,
  },
  cm65: {
    name: 'metric 65',
    length: 150,
    rule: commonRules.integer,
  },
  cm66: {
    name: 'metric 66',
    length: 150,
    rule: commonRules.integer,
  },
  cm67: {
    name: 'metric 67',
    length: 150,
    rule: commonRules.integer,
  },
  cm68: {
    name: 'metric 68',
    length: 150,
    rule: commonRules.integer,
  },
  cm69: {
    name: 'metric 69',
    length: 150,
    rule: commonRules.integer,
  },
  cm70: {
    name: 'metric 70',
    length: 150,
    rule: commonRules.integer,
  },
  cm71: {
    name: 'metric 71',
    length: 150,
    rule: commonRules.integer,
  },
  cm72: {
    name: 'metric 72',
    length: 150,
    rule: commonRules.integer,
  },
  cm73: {
    name: 'metric 73',
    length: 150,
    rule: commonRules.integer,
  },
  cm74: {
    name: 'metric 74',
    length: 150,
    rule: commonRules.integer,
  },
  cm75: {
    name: 'metric 75',
    length: 150,
    rule: commonRules.integer,
  },
  cm76: {
    name: 'metric 76',
    length: 150,
    rule: commonRules.integer,
  },
  cm77: {
    name: 'metric 77',
    length: 150,
    rule: commonRules.integer,
  },
  cm78: {
    name: 'metric 78',
    length: 150,
    rule: commonRules.integer,
  },
  cm79: {
    name: 'metric 79',
    length: 150,
    rule: commonRules.integer,
  },
  cm80: {
    name: 'metric 80',
    length: 150,
    rule: commonRules.integer,
  },
  cm81: {
    name: 'metric 81',
    length: 150,
    rule: commonRules.integer,
  },
  cm82: {
    name: 'metric 82',
    length: 150,
    rule: commonRules.integer,
  },
  cm83: {
    name: 'metric 83',
    length: 150,
    rule: commonRules.integer,
  },
  cm84: {
    name: 'metric 84',
    length: 150,
    rule: commonRules.integer,
  },
  cm85: {
    name: 'metric 85',
    length: 150,
    rule: commonRules.integer,
  },
  cm86: {
    name: 'metric 86',
    length: 150,
    rule: commonRules.integer,
  },
  cm87: {
    name: 'metric 87',
    length: 150,
    rule: commonRules.integer,
  },
  cm88: {
    name: 'metric 88',
    length: 150,
    rule: commonRules.integer,
  },
  cm89: {
    name: 'metric 89',
    length: 150,
    rule: commonRules.integer,
  },
  cm90: {
    name: 'metric 90',
    length: 150,
    rule: commonRules.integer,
  },
  cm91: {
    name: 'metric 91',
    length: 150,
    rule: commonRules.integer,
  },
  cm92: {
    name: 'metric 92',
    length: 150,
    rule: commonRules.integer,
  },
  cm93: {
    name: 'metric 93',
    length: 150,
    rule: commonRules.integer,
  },
  cm94: {
    name: 'metric 94',
    length: 150,
    rule: commonRules.integer,
  },
  cm95: {
    name: 'metric 95',
    length: 150,
    rule: commonRules.integer,
  },
  cm96: {
    name: 'metric 96',
    length: 150,
    rule: commonRules.integer,
  },
  cm97: {
    name: 'metric 97',
    length: 150,
    rule: commonRules.integer,
  },
  cm98: {
    name: 'metric 98',
    length: 150,
    rule: commonRules.integer,
  },
  cm99: {
    name: 'metric 99',
    length: 150,
    rule: commonRules.integer,
  },
  cm100: {
    name: 'metric 100',
    length: 150,
    rule: commonRules.integer,
  },
  cm101: {
    name: 'metric 101',
    length: 150,
    rule: commonRules.integer,
  },
  cm102: {
    name: 'metric 102',
    length: 150,
    rule: commonRules.integer,
  },
  cm103: {
    name: 'metric 103',
    length: 150,
    rule: commonRules.integer,
  },
  cm104: {
    name: 'metric 104',
    length: 150,
    rule: commonRules.integer,
  },
  cm105: {
    name: 'metric 105',
    length: 150,
    rule: commonRules.integer,
  },
  cm106: {
    name: 'metric 106',
    length: 150,
    rule: commonRules.integer,
  },
  cm107: {
    name: 'metric 107',
    length: 150,
    rule: commonRules.integer,
  },
  cm108: {
    name: 'metric 108',
    length: 150,
    rule: commonRules.integer,
  },
  cm109: {
    name: 'metric 109',
    length: 150,
    rule: commonRules.integer,
  },
  cm110: {
    name: 'metric 110',
    length: 150,
    rule: commonRules.integer,
  },
  cm111: {
    name: 'metric 111',
    length: 150,
    rule: commonRules.integer,
  },
  cm112: {
    name: 'metric 112',
    length: 150,
    rule: commonRules.integer,
  },
  cm113: {
    name: 'metric 113',
    length: 150,
    rule: commonRules.integer,
  },
  cm114: {
    name: 'metric 114',
    length: 150,
    rule: commonRules.integer,
  },
  cm115: {
    name: 'metric 115',
    length: 150,
    rule: commonRules.integer,
  },
  cm116: {
    name: 'metric 116',
    length: 150,
    rule: commonRules.integer,
  },
  cm117: {
    name: 'metric 117',
    length: 150,
    rule: commonRules.integer,
  },
  cm118: {
    name: 'metric 118',
    length: 150,
    rule: commonRules.integer,
  },
  cm119: {
    name: 'metric 119',
    length: 150,
    rule: commonRules.integer,
  },
  cm120: {
    name: 'metric 120',
    length: 150,
    rule: commonRules.integer,
  },
  cm121: {
    name: 'metric 121',
    length: 150,
    rule: commonRules.integer,
  },
  cm122: {
    name: 'metric 122',
    length: 150,
    rule: commonRules.integer,
  },
  cm123: {
    name: 'metric 123',
    length: 150,
    rule: commonRules.integer,
  },
  cm124: {
    name: 'metric 124',
    length: 150,
    rule: commonRules.integer,
  },
  cm125: {
    name: 'metric 125',
    length: 150,
    rule: commonRules.integer,
  },
  cm126: {
    name: 'metric 126',
    length: 150,
    rule: commonRules.integer,
  },
  cm127: {
    name: 'metric 127',
    length: 150,
    rule: commonRules.integer,
  },
  cm128: {
    name: 'metric 128',
    length: 150,
    rule: commonRules.integer,
  },
  cm129: {
    name: 'metric 129',
    length: 150,
    rule: commonRules.integer,
  },
  cm130: {
    name: 'metric 130',
    length: 150,
    rule: commonRules.integer,
  },
  cm131: {
    name: 'metric 131',
    length: 150,
    rule: commonRules.integer,
  },
  cm132: {
    name: 'metric 132',
    length: 150,
    rule: commonRules.integer,
  },
  cm133: {
    name: 'metric 133',
    length: 150,
    rule: commonRules.integer,
  },
  cm134: {
    name: 'metric 134',
    length: 150,
    rule: commonRules.integer,
  },
  cm135: {
    name: 'metric 135',
    length: 150,
    rule: commonRules.integer,
  },
  cm136: {
    name: 'metric 136',
    length: 150,
    rule: commonRules.integer,
  },
  cm137: {
    name: 'metric 137',
    length: 150,
    rule: commonRules.integer,
  },
  cm138: {
    name: 'metric 138',
    length: 150,
    rule: commonRules.integer,
  },
  cm139: {
    name: 'metric 139',
    length: 150,
    rule: commonRules.integer,
  },
  cm140: {
    name: 'metric 140',
    length: 150,
    rule: commonRules.integer,
  },
  cm141: {
    name: 'metric 141',
    length: 150,
    rule: commonRules.integer,
  },
  cm142: {
    name: 'metric 142',
    length: 150,
    rule: commonRules.integer,
  },
  cm143: {
    name: 'metric 143',
    length: 150,
    rule: commonRules.integer,
  },
  cm144: {
    name: 'metric 144',
    length: 150,
    rule: commonRules.integer,
  },
  cm145: {
    name: 'metric 145',
    length: 150,
    rule: commonRules.integer,
  },
  cm146: {
    name: 'metric 146',
    length: 150,
    rule: commonRules.integer,
  },
  cm147: {
    name: 'metric 147',
    length: 150,
    rule: commonRules.integer,
  },
  cm148: {
    name: 'metric 148',
    length: 150,
    rule: commonRules.integer,
  },
  cm149: {
    name: 'metric 149',
    length: 150,
    rule: commonRules.integer,
  },
  cm150: {
    name: 'metric 150',
    length: 150,
    rule: commonRules.integer,
  },
  cm151: {
    name: 'metric 151',
    length: 150,
    rule: commonRules.integer,
  },
  cm152: {
    name: 'metric 152',
    length: 150,
    rule: commonRules.integer,
  },
  cm153: {
    name: 'metric 153',
    length: 150,
    rule: commonRules.integer,
  },
  cm154: {
    name: 'metric 154',
    length: 150,
    rule: commonRules.integer,
  },
  cm155: {
    name: 'metric 155',
    length: 150,
    rule: commonRules.integer,
  },
  cm156: {
    name: 'metric 156',
    length: 150,
    rule: commonRules.integer,
  },
  cm157: {
    name: 'metric 157',
    length: 150,
    rule: commonRules.integer,
  },
  cm158: {
    name: 'metric 158',
    length: 150,
    rule: commonRules.integer,
  },
  cm159: {
    name: 'metric 159',
    length: 150,
    rule: commonRules.integer,
  },
  cm160: {
    name: 'metric 160',
    length: 150,
    rule: commonRules.integer,
  },
  cm161: {
    name: 'metric 161',
    length: 150,
    rule: commonRules.integer,
  },
  cm162: {
    name: 'metric 162',
    length: 150,
    rule: commonRules.integer,
  },
  cm163: {
    name: 'metric 163',
    length: 150,
    rule: commonRules.integer,
  },
  cm164: {
    name: 'metric 164',
    length: 150,
    rule: commonRules.integer,
  },
  cm165: {
    name: 'metric 165',
    length: 150,
    rule: commonRules.integer,
  },
  cm166: {
    name: 'metric 166',
    length: 150,
    rule: commonRules.integer,
  },
  cm167: {
    name: 'metric 167',
    length: 150,
    rule: commonRules.integer,
  },
  cm168: {
    name: 'metric 168',
    length: 150,
    rule: commonRules.integer,
  },
  cm169: {
    name: 'metric 169',
    length: 150,
    rule: commonRules.integer,
  },
  cm170: {
    name: 'metric 170',
    length: 150,
    rule: commonRules.integer,
  },
  cm171: {
    name: 'metric 171',
    length: 150,
    rule: commonRules.integer,
  },
  cm172: {
    name: 'metric 172',
    length: 150,
    rule: commonRules.integer,
  },
  cm173: {
    name: 'metric 173',
    length: 150,
    rule: commonRules.integer,
  },
  cm174: {
    name: 'metric 174',
    length: 150,
    rule: commonRules.integer,
  },
  cm175: {
    name: 'metric 175',
    length: 150,
    rule: commonRules.integer,
  },
  cm176: {
    name: 'metric 176',
    length: 150,
    rule: commonRules.integer,
  },
  cm177: {
    name: 'metric 177',
    length: 150,
    rule: commonRules.integer,
  },
  cm178: {
    name: 'metric 178',
    length: 150,
    rule: commonRules.integer,
  },
  cm179: {
    name: 'metric 179',
    length: 150,
    rule: commonRules.integer,
  },
  cm180: {
    name: 'metric 180',
    length: 150,
    rule: commonRules.integer,
  },
  cm181: {
    name: 'metric 181',
    length: 150,
    rule: commonRules.integer,
  },
  cm182: {
    name: 'metric 182',
    length: 150,
    rule: commonRules.integer,
  },
  cm183: {
    name: 'metric 183',
    length: 150,
    rule: commonRules.integer,
  },
  cm184: {
    name: 'metric 184',
    length: 150,
    rule: commonRules.integer,
  },
  cm185: {
    name: 'metric 185',
    length: 150,
    rule: commonRules.integer,
  },
  cm186: {
    name: 'metric 186',
    length: 150,
    rule: commonRules.integer,
  },
  cm187: {
    name: 'metric 187',
    length: 150,
    rule: commonRules.integer,
  },
  cm188: {
    name: 'metric 188',
    length: 150,
    rule: commonRules.integer,
  },
  cm189: {
    name: 'metric 189',
    length: 150,
    rule: commonRules.integer,
  },
  cm190: {
    name: 'metric 190',
    length: 150,
    rule: commonRules.integer,
  },
  cm191: {
    name: 'metric 191',
    length: 150,
    rule: commonRules.integer,
  },
  cm192: {
    name: 'metric 192',
    length: 150,
    rule: commonRules.integer,
  },
  cm193: {
    name: 'metric 193',
    length: 150,
    rule: commonRules.integer,
  },
  cm194: {
    name: 'metric 194',
    length: 150,
    rule: commonRules.integer,
  },
  cm195: {
    name: 'metric 195',
    length: 150,
    rule: commonRules.integer,
  },
  cm196: {
    name: 'metric 196',
    length: 150,
    rule: commonRules.integer,
  },
  cm197: {
    name: 'metric 197',
    length: 150,
    rule: commonRules.integer,
  },
  cm198: {
    name: 'metric 198',
    length: 150,
    rule: commonRules.integer,
  },
  cm199: {
    name: 'metric 199',
    length: 150,
    rule: commonRules.integer,
  },
  cm200: {
    name: 'metric 200',
    length: 150,
    rule: commonRules.integer,
  },

  // "Traffic Sources"
  dr: {
    name: 'referrer',
    length: 2048,
    rule: commonRules.string,
  },
  cn: {
    name: 'campaign name',
    length: 100,
    rule: commonRules.string,
  },
  cs: {
    name: 'campaign source',
    length: 100,
    rule: commonRules.string,
  },
  cm: {
    name: 'campaign medium',
    length: 50,
    rule: commonRules.string,
  },
  ck: {
    name: 'campaign keyword',
    length: 500,
    rule: commonRules.string,
  },
  cc: {
    name: 'campaign content',
    length: 500,
    rule: commonRules.string,
  },
  ci: {
    name: 'campaign id',
    length: 100,
    rule: commonRules.string,
  },
  gclid: {
    name: 'adwords id',
  },
  dclid: {
    name: 'display ads id',
  },

  // "Visitor"
  cid: {
    name: 'client id',
  },

  // "Session"
  a: {
    // ????
    name: 'session',
  },
  sc: {
    name: 'session control',
    rule: commonRules.session,
  },

  // "General"
  v: {
    name: 'protocol version',
  },
  tid: {
    name: 'web property id',
    rule: commonRules.trackingID,
  },
  aip: {
    name: 'anonymize ip',
    rule: commonRules.boolean,
  },
  qt: {
    name: 'queue time',
    rule: commonRules.integer,
  },
  z: {
    name: 'cache buster',
  },

  // "System Info"
  sr: {
    name: 'resolution',
    length: 20,
    rule: commonRules.string,
  },
  vp: {
    name: 'viewport size',
    length: 20,
    rule: commonRules.string,
  },
  sd: {
    name: 'screen colors',
    length: 20,
    rule: commonRules.string,
  },
  de: {
    name: 'encoding',
    length: 20,
    rule: commonRules.string,
  },
  ul: {
    name: 'language',
    length: 20,
    rule: commonRules.string,
  },
  je: {
    name: 'java enabled',
    rule: commonRules.boolean,
  },
  fl: {
    name: 'flash version',
    length: 20,
    rule: commonRules.string,
  },

  // "App Tracking"
  an: {
    name: 'app name',
    length: 100,
    rule: commonRules.string,
  },
  av: {
    name: 'app version',
    length: 100,
    rule: commonRules.string,
  },

  // "Exceptions"
  exd: {
    name: 'exception description',
    length: 150,
    rule: commonRules.string,
  },
  exf: {
    name: 'exception fatal',
    rule: commonRules.boolean,
  },
};
