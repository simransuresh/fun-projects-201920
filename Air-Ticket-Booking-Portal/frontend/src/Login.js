import React, {useState} from 'react';

function Login() {
    const [user, setUser] = useState({
        "username": "",
        "password": ""
    });

    const usernameRef = React.useRef();
    const passwordRef = React.useRef();
  
    const handleSubmit = async () => {
      console.log(usernameRef.current.value, passwordRef.current.value);
        const settings = {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username: usernameRef.current.value, password: passwordRef.current.value })
    };
    try {
            const fetchResponse = await fetch(`http://localhost:5500/login`, settings);
            const data = await fetchResponse.json().then(
                response => response.json(),
                error => console.log('An error occurred.', error)
              );
            // console.log(data);
            setUser({ username: data.username, password: data.password });
            console.log(user);
            // return data;
        } catch (e) {
            // return e;
            console.log(e);
        }  

    };

    return (
        
    <form>

    <label>
        Username
        <input ref={usernameRef} />
      </label>
      <br />
      <label>
        Password
        <input ref={passwordRef} />
      </label>
      <br />
      <button onClick={handleSubmit}>Submit</button>

    </form>

    );
}



export default Login;