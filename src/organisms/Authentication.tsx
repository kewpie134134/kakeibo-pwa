import { auth, googleProvider } from "../libs/firebaseConfig";
import { signInWithPopup } from "firebase/auth";

const Authentication = () => {
  // ログイン
  const handleSignIn = async () => {
    try {
      // Google ログインポップアップを表示
      const result = await signInWithPopup(auth, googleProvider);
      // ログイン成功時の処理
      console.log("ログイン成功: ", result.user);
    } catch (error) {
      // エラーハンドリング
      console.error("ログインエラー: ", error);
    }
  };

  return (
    <>
      <div>Google 認証を使用する場合はこちら</div>
      <button onClick={handleSignIn}>ログイン(Google 認証)</button>
    </>
  );
};

export default Authentication;
