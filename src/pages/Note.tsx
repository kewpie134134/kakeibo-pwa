import { useEffect, useState } from "react";
import { usePageNumberStore } from "../stores/pageNumber";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { DocumentData, collection, getDocs } from "firebase/firestore";
import { db } from "../libs/firebaseConfig";
import { useAuthUser } from "../stores/authUser";
import * as DB from "../consts/firestore";

const Note = () => {
  // zustand でページ状態を設定
  const { setNotePage } = usePageNumberStore();
  useEffect(() => {
    setNotePage();
  }, [setNotePage]);

  // zustand でユーザー状態を管理
  const { user } = useAuthUser();

  // 家計簿データを保持する State
  const [accountBookData, setAccountBookData] = useState<DocumentData[]>([]);

  // 家計簿データを取得
  useEffect(() => {
    const accountBook = collection(
      db,
      DB.USERS_COLLECTION,
      user!.email!, // 画面表示時はログイン情報は取得できている TODO: ユーザー情報の取得
      DB.TABLES_COLLECTION,
      DB.ACCOUNT_BOOK_COLLECTION,
      DB.YEARS_COLLECTION,
      // dateArray[0], // 日付の年
      "2024", // 日付の年
      DB.MONTHS_COLLECTION,
      // dateArray[1], // 日付の月
      "03", // 日付の月
      DB.ITEMS_COLLECTION
    );
    getDocs(accountBook).then((snapshot) => {
      setAccountBookData(
        snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
      );
    });
  }, [user]);

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 300 }} aria-label="table">
        <TableHead>
          <TableRow>
            <TableCell>日付</TableCell>
            <TableCell>カテゴリー</TableCell>
            <TableCell>メモ</TableCell>
            <TableCell>金額</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {accountBookData.map((data) => (
            <TableRow
              key={data.id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell>{data.date}</TableCell>
              <TableCell>{data.category}</TableCell>
              <TableCell>{data.memo}</TableCell>
              <TableCell>{data.amount}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default Note;
