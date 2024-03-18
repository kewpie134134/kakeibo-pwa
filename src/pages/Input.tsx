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
import { addDoc, collection } from "firebase/firestore";
import { db } from "../libs/firebaseConfig";

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

  // 本日の日付
  const today = format(new Date(), "yyyy-MM-dd");

  // 入力フォームの内容格納 State
  const [date, setDate] = useState<string>(today);
  const [amount, setAmount] = useState<string>("");
  const [category, setCaterogy] = useState<string>("");
  const [memo, setMemo] = useState<string>("");

  // 日付情報変更時の処理
  const handleDateChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setDate(e.target.value as string);
  };

  // 金額情報変更時の処理
  const handleAmountChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setAmount(e.target.value as string);
  };

  // カテゴリー情報変更時の処理
  const handleCategoryChange = (e: SelectChangeEvent) => {
    setCaterogy(e.target.value as string);
  };

  // メモ情報変更時の処理
  const handleMemoChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setMemo(e.target.value as string);
  };

  // 追加ボタン選択時の処理
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // 日付情報をハイフンで分割
    const dateArray = date.split("-");

    // FireStore への連携情報準備
    const accountBookCollectionRef = collection(
      db,
      "accountBook",
      dateArray[0], // 日付の年
      dateArray[1] // 日付の月
    );

    // FireStore へ情報連携
    await addDoc(accountBookCollectionRef, {
      date,
      amount,
      category,
      memo,
    });
  };

  // // FireStore からデータを取得
  // const accountBook = collection(db, "accountBook", "2024", "03");
  // getDocs(accountBook).then((snapshot) => {
  //   snapshot.docs.forEach((doc) => console.log(doc.data()));
  // });

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        fullWidth
        defaultValue={today}
        label="日付"
        type="date"
        onChange={handleDateChange}
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
        onChange={handleAmountChange}
        margin="normal"
      ></TextField>
      <FormControl fullWidth margin="normal">
        <InputLabel>カテゴリー</InputLabel>
        <Select
          value={category}
          label="カテゴリー"
          onChange={handleCategoryChange}
        >
          {categories.map((categoryName: string, index: number) => (
            <MenuItem value={categoryName} key={index}>
              {categoryName}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <TextField
        label="メモ"
        fullWidth
        onChange={handleMemoChange}
        margin="normal"
      />
      <Button
        fullWidth
        type="submit"
        variant="contained"
        size="large"
        sx={{ my: 2 }}
      >
        追加
      </Button>
    </form>
  );
};

export default Input;
