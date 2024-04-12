import "./index.css";
import icon from "../../assets/Movie.png";
import {Link, useNavigate} from "react-router-dom";
import { useRef, useState } from "react";
import { Alert } from "@mui/material";

function Login() {
  const [loading, setLoading] = useState(null)
  const [error, setError] = useState(false);
  const [words, setWords] = useState('');
  const navigate = useNavigate();
  const username = useRef()
  const password = useRef()

  function validate(username, password) {
    if (!username.current.value) {
      username.current.focus();
      setError(true)
      setWords("Username bo'sh bo'lishi mumkin emas");
      setLoading(false)
      return false;
    }

    if (!password.current.value) {
      password.current.focus();
      setError(true)
      setWords("Password bo'sh bo'lishi mumkin emas");
      setLoading(false)
      return false;
    }
    
    return true;
  }

  function handleSubmit(e) {
    e.preventDefault();
    setLoading(true)
    const user = {
      username: username.current.value,
      password: password.current.value,
    }
    const isvalid = validate(username, password);
    if (isvalid) {
      username.current.value = '';
      password.current.value = '';
      setError(false);
      setWords('')
      fetch(`${import.meta.env.VITE_AP}/api/auth/signin`, {
        method: 'POST',
        headers:{
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
      })
       .then(res => res.json())
       .then(data => {
        if (data.id) {
          localStorage.setItem('token', JSON.stringify(data.accessToken));
          navigate('/')
        }
          if (data.message == "User Not found.") {
            setError(true);
            setWords(data.message);
          }
          if (data.message == "Invalid Password!") {
            setError(true);
            setWords(data.message);
          }
       })
       .catch(err => {
        setError(true);
        setWords(err);
        console.log(err);
       })
       .finally(() => {
          setLoading(false)
       })
    }
  }

  return (
    <div className="container">
      <img width={32} height={26} style={{marginTop: '40px'}} src={icon} alt="icon" />

      <div className="card-wrapperd">
        <h1 className="title">Login</h1>

        <form onSubmit={handleSubmit}>
          {
            error && <Alert severity="error" sx={{bgcolor:'pink'}}>{`${words}`}</Alert>
          }
        <div className="form-floating mb-3">
          <input ref={username}  type="text" className="formControl password" id="floatingInput" placeholder="Username" />
        </div>
        <div className="form-floating mb-3">
          <input ref={password} type="password" className="formControl password" id="floatingInput" placeholder="Password" />
        </div>
        <button disabled = {loading ? true : false} className="btn button">{loading ? 'LOADING...' : 'Login to your account'}</button>
        </form>

        <span className="span-signup">
          <p>Don’t have an account?</p>
          <Link to="/signup">Sign Up</Link>
        </span>

      </div>
    </div>
  );
}

export default Login;
