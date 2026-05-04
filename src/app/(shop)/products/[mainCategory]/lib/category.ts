export const CATEGORY_MAP = {
  writing: { label: '필기구', value: 'writing' },
  paper: { label: '종이류', value: 'paper' },
  deco: { label: '다꾸/데코', value: 'deco' },
  accessory: { label: '소품/악세서리', value: 'accessory' },
} as const;

export type CategoryType = keyof typeof CATEGORY_MAP;
export const CATEGORY_TYPES = Object.keys(CATEGORY_MAP) as CategoryType[];
