import { onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import { useEffect, useState } from "react";
import { auth } from "../libs/firebaseConfig";
import { useAuthUser } from "../stores/authUser";
import { Navigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // zustand でログイン状態を管理
  const { user, setUser } = useAuthUser();

  // ログイン状態を把握
  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
  }, [setUser]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      alert("メールアドレスまたはパスワードが間違っています");
    }
  };

  return (
    <>
      {/* ログインしている場合、トップページへ遷移する */}
      {user ? (
        <Navigate to={"/input/"} />
      ) : (
        <>
          <h1>ログインページ</h1>
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
            <button>ログイン</button>
          </form>
        </>
      )}
    </>
  );
};

export default Login;
