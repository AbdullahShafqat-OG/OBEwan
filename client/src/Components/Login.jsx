import { useState } from "react";

// The login module, what else did yoiu expect?
function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const localhost = "http://localhost:4000";

  async function loginUser(event) {
    event.preventDefault();

    const response = await fetch(localhost + "/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    const data = await response.json();

    if (data.user.privilege === "admin") {
      // alert("Login Successful Admin");
      window.location.href = "/dashboard/admin";
    } else if (data.user.privilege === "user") {
      // alert("Login Successful Instructor");
      window.location.href = "/dashboard/instructor";
    } else {
      alert("Login Unsuccessful");
    }
  }

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={loginUser}>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          placeholder="Email"
        />
        <br />
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="Password"
        />
        <br />
        <input type="submit" value="Login" />
      </form>
    </div>
  );
}

export default App;
