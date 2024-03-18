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

const Note = () => {
  // zustand でページ状態を設定
  const { setNotePage } = usePageNumberStore();
  useEffect(() => {
    setNotePage();
  }, [setNotePage]);

  // 家計簿データを保持する State
  const [accountBookData, setAccountBookData] = useState<DocumentData[]>([]);

  // 家計簿データを取得
  useEffect(() => {
    const accountBook = collection(db, "accountBook", "2024", "03");
    getDocs(accountBook).then((snapshot) => {
      setAccountBookData(
        snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
      );
    });
  }, []);

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
