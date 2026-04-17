export type NAV_BY_PATCH_TYPE = Record<
  string,
  {
    tabs: { label: string; value: string }[];
    selectOptions: boolean;
    actionButton?: boolean;
  }
>;

export const HOME_NAV_ITEMS = [
  { label: "тех-карты", value: "cards" },
  { label: "материалы", value: "products" },
];

export const NAV_BY_PATCH = {
  home: { tabs: HOME_NAV_ITEMS, selectOptions: true, actionButton: false },
  product: { tabs: [], selectOptions: false, actionButton: true },
  card: { tabs: [], selectOptions: false, actionButton: true },
} satisfies NAV_BY_PATCH_TYPE;
