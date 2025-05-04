import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { doc, getDoc, DocumentData } from "firebase/firestore";
import { db } from "../libs/firebaseConfig";
import * as DB from "../consts/firestore";
import { Box, Typography } from "@mui/material";
import { useAuthUser } from "../stores/authUser";

const NoteDetail = () => {
  const { id } = useParams<{ id: string }>(); // URL パラメータから id を取得
  const [noteData, setNoteData] = useState<DocumentData | null>(null); // Firestore から取得したデータを保持する State

  // zustand でユーザー状態を管理
  const { user } = useAuthUser();

  useEffect(() => {
    const fetchNoteData = async () => {
      if (!id) return;

      // Firestore からデータを取得
      const docRef = doc(
        db,
        DB.USERS_COLLECTION,
        user!.email!, // 画面表示時はログイン情報は取得できている TODO: ユーザー情報の取得
        DB.TABLES_COLLECTION,
        DB.ACCOUNT_BOOK_COLLECTION,
        DB.YEARS_COLLECTION,
        "2024", // TODO: 必要に応じて動的に変更
        DB.MONTHS_COLLECTION,
        "07", // TODO: 必要に応じて動的に変更
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
  }, [id, user]);

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
