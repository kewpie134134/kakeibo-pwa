import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { doc, getDoc, DocumentData } from "firebase/firestore";
import { db } from "../libs/firebaseConfig";
import * as DB from "../consts/firestore";
import { Box, Typography } from "@mui/material";
import { format } from "date-fns";
import { useAuthUser } from "../stores/authUser";
import { useDateStore } from "../stores/dateStore"; // Zustand ストアをインポート

const NoteDetail = () => {
  const { date } = useDateStore(); // Zustand から日付を取得
  const { id } = useParams<{ id: string }>(); // URL パラメータから id を取得
  const [noteData, setNoteData] = useState<DocumentData | null>(null); // Firestore から取得したデータを保持する State

  // zustand でユーザー状態を管理
  const { user } = useAuthUser();

  useEffect(() => {
    const fetchNoteData = async () => {
      if (!id) return;

      // date を年と月に分割
      const formatedDate = date ? format(date, "yyyy-MM-dd") : "";
      const [year, month] = formatedDate.split("-");

      if (!year || !month) return;
      // Firestore からデータを取得
      const docRef = doc(
        db,
        DB.USERS_COLLECTION,
        user!.email!, // 画面表示時はログイン情報は取得できている TODO: ユーザー情報の取得
        DB.TABLES_COLLECTION,
        DB.ACCOUNT_BOOK_COLLECTION,
        DB.YEARS_COLLECTION,
        year, // 動的に取得した年を使用
        DB.MONTHS_COLLECTION,
        month, // 動的に取得した月を使用
        DB.ITEMS_COLLECTION,
        id
      );
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setNoteData(docSnap.data() as DocumentData);
      } else {
        console.error("No such document!");
      }
    };

    fetchNoteData();
  }, [id, date, user]);

  if (!noteData) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h4">詳細情報</Typography>
      <Typography>日付: {noteData.date}</Typography>
      <Typography>カテゴリー: {noteData.category}</Typography>
      <Typography>金額: {noteData.amount}</Typography>
      <Typography>メモ: {noteData.memo}</Typography>
    </Box>
  );
};

export default NoteDetail;
