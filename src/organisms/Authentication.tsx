import { useEffect, useState } from "react";
import { auth, googleProvider } from "../lib/firebaseConfig";
import { User, signInWithPopup, signOut } from "firebase/auth";

const Authentication = () => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        // ログインしている場合
        setUser(authUser);
      } else {
        // ログアウトしている場合
        setUser(null);
      }
    });

    // アンマウント時に監視解除
    return () => {
      unsubscribe();
    };
  }, []);

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

  // ログアウト
  const handleSignOut = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("ログアウトエラー: ", error);
    }
  };

  return (
    <>
      {user ? (
        <>
          <p>ログインユーザー: {user.displayName}</p>
          <button onClick={handleSignOut}>ログアウト</button>
        </>
      ) : (
        <>
          <p>ログインしていません</p>
          <button onClick={handleSignIn}>ログイン</button>
        </>
      )}
    </>
  );
};

export default Authentication;
