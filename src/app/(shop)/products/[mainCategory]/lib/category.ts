export type MainCategory = keyof typeof categories;

export const categories = {
  writing: [
    { label: '전체', value: undefined },
    { label: '볼펜', value: 'ballpen' },
    { label: '만년필', value: 'fountainpen' },
    { label: '연필', value: 'pencil' },
  ],
  paper: [
    { label: '전체', value: undefined },
    { label: '공책', value: 'note' },
    { label: '메모지', value: 'memo' },
  ],
  deco: [
    { label: '전체', value: undefined },
    { label: '스티커', value: 'sticker' },
    { label: '북커버', value: 'bookcover' },
  ],
  accessory: [
    { label: '전체', value: undefined },
    { label: '키링', value: 'keyring' },
    { label: '기타', value: 'anything' },
  ],
};

export const categoryMap: Record<string, string> = {
  writing: '필기구',
  paper: '종이류',
  deco: '데코/다꾸',
  accessory: '소품/악세서리',
};
