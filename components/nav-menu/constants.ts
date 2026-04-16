export type NAV_BY_PATCH_TYPE = Record<
  string,
  {
    tabs: { label: string; value: string }[];
    selectOptions: boolean;
  }
>;

export const HOME_NAV_ITEMS = [
  { label: "тех-карты", value: "cards" },
  { label: "материалы", value: "products" },
];

export const NAV_BY_PATCH = {
  home: { tabs: HOME_NAV_ITEMS, selectOptions: true },
} satisfies NAV_BY_PATCH_TYPE;
