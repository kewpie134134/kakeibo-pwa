import { useEffect, useMemo, useState } from "react";
import { usePageNumberStore } from "../stores/pageNumber";
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
} from "@mui/material";
import { DocumentData, collection, getDocs } from "firebase/firestore";
import { db } from "../libs/firebaseConfig";
import { useAuthUser } from "../stores/authUser";
import * as DB from "../consts/firestore";
import EnhancedTableToolbar from "../molecules/EnhancedTableToolbar";
import EnhancedTableHead from "../molecules/EnhancedTableHead";
import { Order, getComparator } from "../utils/enhancedTableSort";

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

  // テーブルのソート情報を保持する State
  const [order, setOrder] = useState<Order>("asc");
  const [orderBy, setOrderBy] = useState<string>("date");

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
        snapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
          amount: Number(doc.data().amount),
        }))
      );
    });
  }, [user]);

  // ソート実施時の情報連携用関数
  const handleRequestSort = (
    _: React.MouseEvent<unknown>,
    property: string
  ) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  // テーブルの行選択時
  const handleClick = (_: React.MouseEvent<unknown>, id: string) => {
    // docId
    console.log(id);
  };

  // テーブル表示データのメモ
  const visibleRows = useMemo(
    () => accountBookData.slice().sort(getComparator(order, orderBy)),
    [order, orderBy, accountBookData]
  );

  return (
    <Box sx={{ width: "100%" }}>
      <Paper sx={{ width: "100%", mb: 2 }}>
        <EnhancedTableToolbar />
        <TableContainer>
          <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle">
            <EnhancedTableHead
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
            />
            <TableBody>
              {visibleRows.map((row, index) => {
                const labelId = `enhanced-table-checkbox-${index}`;

                return (
                  <TableRow
                    hover
                    onClick={(event) => handleClick(event, row.id)}
                    role="checkbox"
                    tabIndex={-1}
                    key={row.id}
                    sx={{ cursor: "pointer" }}
                  >
                    <TableCell component="th" id={labelId} scope="row">
                      {row.date}
                    </TableCell>
                    <TableCell>{row.category}</TableCell>
                    <TableCell>{row.memo}</TableCell>
                    <TableCell align="right">{row.amount}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
};

export default Note;
