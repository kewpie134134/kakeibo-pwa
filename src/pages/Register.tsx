import {
  User,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import { useEffect, useState } from "react";
import { auth } from "../libs/firebaseConfig";
import { Navigate } from "react-router-dom";
import { useAuthUser } from "../stores/authUser";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // zustand でログイン状態を管理
  const { user, setUser } = useAuthUser();

  // ログインしているかどうかを判定する
  useEffect(() => {
    onAuthStateChanged(auth, (currentUser: User | null) => {
      setUser(currentUser);
    });
  }, [setUser]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await createUserWithEmailAndPassword(auth, email, password);
    } catch (error) {
      alert("正しく入力してください");
    }
  };

  return (
    <>
      {/* ログインしていればトップページへ */}
      {user ? (
        <Navigate to={"/input/"} />
      ) : (
        <>
          <h1>新規登録</h1>
          <form onSubmit={handleSubmit}>
            <div>
              <label>メールアドレス</label>
              <input
                name="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label>パスワード</label>
              <input
                name="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button>登録する</button>
          </form>
        </>
      )}
    </>
  );
};

export default Register;
