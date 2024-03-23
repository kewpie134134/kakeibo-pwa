interface HeadCell {
  id: string;
  label: string;
  numeric: boolean;
  isSort?: boolean;
}

export const headCells: readonly HeadCell[] = [
  {
    id: "date",
    numeric: false,
    label: "日付",
    isSort: true,
  },
  {
    id: "category",
    numeric: false,
    label: "カテゴリー",
    isSort: false,
  },
  {
    id: "memo",
    numeric: false,
    label: "メモ",
    isSort: false,
  },
  {
    id: "amount",
    numeric: false,
    label: "金額",
    isSort: true,
  },
];
