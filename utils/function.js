function validate(email, username, password, repassword) {
    const validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    if (!email.current.value) {
      email.current.focus();
      setError(true)
      setWords("Email bo'sh bo'lishi mumkin emas");
      return false;
    }
    if (!email.current.value.match(validRegex)) {
      email.current.focus();
      setError(true);
      setWords('Invalid email adress! (Example:test@gmail.com)')
      return false;
    }
    if (!username.current.value) {
      username.current.focus();
      setError(true)
      setWords("Username bo'sh bo'lishi mumkin emas");
      return false;
    }
    if (username.current.value < 4) {
      username.current.focus();
      setError(true);
      setWords("Kuchli va murakkab user name yarating!");
      return false;
    }
    if (!password.current.value) {
      password.current.focus();
      setError(true)
      setWords("Password bo'sh bo'lishi mumkin emas");
      return false;
    }
    if (password.current.value !== repassword.current.value) {
      password.current.focus();
      repassword.current.value = '';
      setError(true)
      setWords("Parolni qayta kiriting!");
      return false;
    }
    
    return true;
  }

  export {validate}