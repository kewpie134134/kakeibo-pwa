import { useEffect, useState } from "react";
import { usePageNumberStore } from "../stores/pageNumber";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from "@mui/material";
import { format } from "date-fns";

const categories = [
  "食費",
  "外食費",
  "日用品",
  "交通費",
  "衣服",
  "交際費",
  "趣味",
  "その他",
];

const Input = () => {
  // zustand でページ状態を設定
  const { setInputPage } = usePageNumberStore();
  useEffect(() => {
    setInputPage();
  }, [setInputPage]);

  const today = format(new Date(), "yyyy-MM-dd");

  const [category, setCaterogy] = useState<string>("");

  const handleChange = (e: SelectChangeEvent) => {
    setCaterogy(e.target.value as string);
  };

  return (
    <>
      <TextField
        fullWidth
        defaultValue={today}
        label="日付"
        type="date"
        // margin="normal"
      ></TextField>
      <TextField
        fullWidth
        label="金額"
        type="number"
        // type="number" でスピンホイール機能を無効化する処理
        onFocus={(e) =>
          e.target.addEventListener(
            "wheel",
            (e) => {
              e.preventDefault();
            },
            { passive: false }
          )
        }
        margin="normal"
      ></TextField>
      <FormControl fullWidth margin="normal">
        <InputLabel>カテゴリー</InputLabel>
        <Select value={category} label="カテゴリー" onChange={handleChange}>
          {categories.map((categoryName: string, index: number) => (
            <MenuItem value={categoryName} key={index}>
              {categoryName}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <TextField label="メモ" fullWidth margin="normal" />
      <Button fullWidth variant="contained" size="large" sx={{ my: 2 }}>
        追加
      </Button>
    </>
  );
};

export default Input;
