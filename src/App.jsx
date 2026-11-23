import { useState } from "react";
import "./App.css";

function App() {
  const [view, setView] = useState("home");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [issue, setIssue] = useState("");
  const [title, setTitle] = useState("");
  const [oppDesc, setOppDesc] = useState("");
  const [regName, setRegName] = useState("");
  const [regEmail, setRegEmail] = useState("");
  const [regPass, setRegPass] = useState("");

  // ===== REAL USERS - EVERY REGISTERED CLIENT CAN LOGIN =====
  const [users, setUsers] = useState([
    { name: "Demo Client", email: "client@ueh.co.za", password: "123", role: "client" },
    { name: "Demo Agent", email: "agent@ueh.co.za", password: "123", role: "agent" },
    { name: "Demo Admin", email: "admin@ueh.co.za", password: "123", role: "admin" },
  ]);
  const [currentUser, setCurrentUser] = useState(null);

  const [myRequests, setMyRequests] = useState([]);
  const [agentRequests, setAgentRequests] = useState([]);
  const [opps, setOpps] = useState([]);
  const [applied, setApplied] = useState([]);
  const [decisions, setDecisions] = useState({});

  // ===== LOGIN - CHECKS REGISTERED USERS TOO =====
  const login = () => {
    const found = users.find(u => u.email.toLowerCase() === email.toLowerCase().trim() && u.password === password);
    if (found) {
      setCurrentUser(found);
      setView(found.role);
    } else {
      alert("❌ Wrong email or password!\n\nTry:\n- Your registered email + your password\nOR\n- client@ueh.co.za / 123\n- agent@ueh.co.za / 123\n- admin@ueh.co.za / 123");
    }
  };

  // ===== REGISTER - SAVES NEW CLIENT =====
  const register = () => {
    if (!regName || !regEmail || !regPass) { alert("Please fill in ALL fields!"); return; }
    if (users.find(u => u.email.toLowerCase() === regEmail.toLowerCase().trim())) { alert("This email already registered! Please Login."); setView("login"); return; }
    const newUser = { name: regName, email: regEmail.trim(), password: regPass, role: "client" };
    setUsers([...users, newUser]);
    alert("✅ Registered! Welcome " + regName + "!\n\nNow Login with:\n" + regEmail + " / " + regPass);
    setEmail(regEmail);
    setPassword(regPass);
    setView("login");
  };

  const logout = () => { setView("home"); setEmail(""); setPassword(""); setCurrentUser(null); };

  const header = (
    <header style={{ background: "#3b1f0b", padding: "18px 40px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
      <span style={{ color: "#d4af37", fontSize: 22, fontWeight: "bold", cursor: "pointer" }} onClick={() => setView("home")}>▦ UBUNTU Hub - UEH</span>
      <div style={{ display: "flex", gap: 20, alignItems: "center", color: "#e8c97a" }}>
        <span onClick={() => setView("home")} style={{ cursor: "pointer" }}>Home</span>
        <span>About</span><span>Services</span><span>Contact</span>
        <button onClick={() => view === "home" ? setView("login") : logout()} style={{ background: "#d4af37", color: "#3b1f0b", border: "none", padding: "9px 20px", borderRadius: 8, fontWeight: "bold", cursor: "pointer" }}>
          {view === "home" ? "Login" : "Logout"}
        </button>
      </div>
    </header>
  );
  const footer = <footer style={{ background: "#3b1f0b", color: "#e8c97a", padding: 14, textAlign: "center", fontSize: 13 }}>© 2024 UBUNTU Hub - UEH • Empowering Communities • Privacy • Terms</footer>;

  if (view === "home") return (
    <div style={{ fontFamily: "Georgia, serif", background: "#fdf6e3", minHeight: "100vh" }}>
      {header}
      <div style={{ background: "#fdf3d8", padding: "60px 40px 50px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ maxWidth: 580 }}>
          <h1 style={{ fontSize: 48, color: "#3b1f0b", margin: 0, fontWeight: "normal", lineHeight: 1.1 }}>Welcome to UBUNTU Hub</h1>
          <p style={{ fontSize: 20, color: "#3b1f0b", lineHeight: 1.5, marginTop: 18 }}>Empowering MSMEs • Supporting Partners • Managing Growth<br />— all in one platform.</p>
          <div style={{ marginTop: 28, display: "flex", gap: 14 }}>
            <button onClick={() => setView("register")} style={{ background: "#c9a24a", color: "white", border: "none", padding: "12px 28px", borderRadius: 8, fontSize: 16, cursor: "pointer" }}>Get Started</button>
            <button style={{ background: "transparent", color: "#3b1f0b", border: "1.5px solid #6b4a2a", padding: "11px 28px", borderRadius: 8, fontSize: 16, cursor: "pointer" }}>Learn More</button>
          </div>
        </div>
        <div style={{ textAlign: "center" }}><div style={{ fontSize: 90 }}>📊🤝</div><div style={{ color: "#8a6a2a" }}>Growth • Trust • Ubuntu</div></div>
      </div>
      <div style={{ padding: "40px 40px 60px", textAlign: "center" }}>
        <h2 style={{ fontSize: 30, color: "#3b1f0b", margin: 0, fontWeight: "normal" }}>Who We Serve</h2>
        <div style={{ width: 120, height: 2, background: "#c9a24a", margin: "10px auto 30px" }}></div>
        <div style={{ display: "flex", gap: 22, justifyContent: "center", flexWrap: "wrap", textAlign: "left" }}>
          <div style={{ background: "#e8c97a", padding: 26, borderRadius: 10, width: 300 }}>
            <div style={{ fontSize: 28 }}>🏪</div><h3 style={{ color: "#3b1f0b", fontSize: 24, fontWeight: "normal" }}>MSME Clients</h3>
            <p style={{ color: "#3b1f0b", fontSize: 15, lineHeight: 1.6 }}>Access funding, resources, and business support tailored for small and medium enterprises to grow sustainably.</p>
            <p style={{ color: "#3b1f0b", fontSize: 13, cursor: "pointer" }} onClick={() => setView("register")}>Register →</p><p style={{ fontSize: 12 }}>client@ueh.co.za / 123</p>
          </div>
          <div style={{ background: "#eeddbe", padding: 26, borderRadius: 10, width: 300 }}>
            <div style={{ fontSize: 28 }}>🎧</div><h3 style={{ color: "#3b1f0b", fontSize: 24, fontWeight: "normal" }}>UEH Support Agents</h3>
            <p style={{ color: "#3b1f0b", fontSize: 15, lineHeight: 1.6 }}>Dedicated support tools and resources to assist MSMEs with guidance, onboarding, and ongoing assistance.</p>
            <p style={{ color: "#3b1f0b", fontSize: 13, cursor: "pointer" }} onClick={() => setView("login")}>Login as Agent →</p><p style={{ fontSize: 12 }}>agent@ueh.co.za / 123</p>
          </div>
          <div style={{ background: "#9c6b2f", padding: 26, borderRadius: 10, width: 300 }}>
            <div style={{ fontSize: 28 }}>🛡️⚙️</div><h3 style={{ color: "white", fontSize: 24, fontWeight: "normal" }}>UEH Admins</h3>
            <p style={{ color: "white", fontSize: 15, lineHeight: 1.6 }}>Manage users, monitor platform activity, and oversee operations with secure admin controls and analytics.</p>
            <p style={{ color: "white", fontSize: 13, cursor: "pointer" }} onClick={() => setView("login")}>Login as Admin →</p><p style={{ fontSize: 12, color: "#f9f0d8" }}>admin@ueh.co.za / 123</p>
          </div>
        </div>
      </div>
      {footer}
    </div>
  );

  if (view === "register") return (
    <div style={{ fontFamily: "Georgia, serif", background: "#fdf6e3", minHeight: "100vh" }}>{header}
      <div style={{ maxWidth: 400, margin: "60px auto", background: "white", padding: 30, borderRadius: 12, border: "2px solid #d4af37", textAlign: "center" }}>
        <h2 style={{ color: "#3b1f0b" }}>Register as MSME Client 🏪</h2>
        <p style={{ color: "#6b4a2a", fontSize: 14 }}>Create YOUR OWN login — it will work!</p>
        <input value={regName} onChange={(e) => setRegName(e.target.value)} placeholder="Business Name: e.g. Thandi's Bakery" style={{ width: "100%", padding: 12, marginBottom: 12, border: "2px solid #d4af37", borderRadius: 8, boxSizing: "border-box" }} />
        <input value={regEmail} onChange={(e) => setRegEmail(e.target.value)} placeholder="Email: e.g. thandi@gmail.com" style={{ width: "100%", padding: 12, marginBottom: 12, border: "2px solid #d4af37", borderRadius: 8, boxSizing: "border-box" }} />
        <input value={regPass} onChange={(e) => setRegPass(e.target.value)} type="password" placeholder="Create YOUR Password: e.g. 1234" style={{ width: "100%", padding: 12, marginBottom: 14, border: "2px solid #d4af37", borderRadius: 8, boxSizing: "border-box" }} />
        <button onClick={register} style={{ width: "100%", background: "#d4af37", color: "#3b1f0b", border: "none", padding: 12, borderRadius: 8, fontWeight: "bold", cursor: "pointer" }}>Register</button>
        <p style={{ fontSize: 13, marginTop: 12, cursor: "pointer", color: "#6b4a2a" }} onClick={() => setView("login")}>Already have account? Login →</p>
      </div>{footer}
    </div>
  );

  if (view === "login") return (
    <div style={{ fontFamily: "Georgia, serif", background: "#fdf6e3", minHeight: "100vh" }}>{header}
      <div style={{ maxWidth: 400, margin: "60px auto", background: "white", padding: 30, borderRadius: 12, border: "2px solid #d4af37", textAlign: "center" }}>
        <h2 style={{ color: "#3b1f0b" }}>Login to UBUNTU Hub</h2>
        <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email: your registered email" style={{ width: "100%", padding: 12, marginBottom: 12, border: "2px solid #d4af37", borderRadius: 8, boxSizing: "border-box" }} />
        <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Password: your password" style={{ width: "100%", padding: 12, marginBottom: 14, border: "2px solid #d4af37", borderRadius: 8, boxSizing: "border-box" }} />
        <button onClick={login} style={{ width: "100%", background: "#d4af37", color: "#3b1f0b", border: "none", padding: 12, borderRadius: 8, fontWeight: "bold", cursor: "pointer" }}>Login</button>
        <p style={{ fontSize: 13, color: "#6b4a2a", marginTop: 14 }}>Demo accounts:<br />client@ueh.co.za / 123<br />agent@ueh.co.za / 123<br />admin@ueh.co.za / 123<br /><br />OR use YOUR registered email!</p>
        <p style={{ fontSize: 13, cursor: "pointer", color: "#6b4a2a" }} onClick={() => setView("register")}>No account? Register →</p>
      </div>{footer}
    </div>
  );

  if (view === "client") return (
    <div style={{ fontFamily: "Georgia, serif", background: "#fdf6e3", minHeight: "100vh" }}>{header}
      <div style={{ background: "#fdf3d8", padding: "30px", textAlign: "center" }}><h1 style={{ color: "#3b1f0b", fontWeight: "normal" }}>Welcome, {currentUser?.name || "MSME Client"}! 🏪</h1><p>Logged in as {currentUser?.email || email}</p></div>
      <div style={{ maxWidth: 700, margin: "20px auto", padding: 20 }}>
        <div style={{ background: "white", padding: 20, borderRadius: 10, border: "2px solid #d4af37" }}>
          <h3 style={{ color: "#3b1f0b" }}>+ Log New Request - Type Yours Here</h3>
          <input value={issue} onChange={(e) => setIssue(e.target.value)} placeholder="Type your request... e.g. I need funding for stock" style={{ width: "100%", padding: 12, border: "2px solid #d4af37", borderRadius: 8, boxSizing: "border-box" }} /><br /><br />
          <button onClick={() => { if (issue) { const newReq = { text: issue, status: "Open", reply: "", business: currentUser?.name || "You (Client)" }; setMyRequests([...myRequests, newReq]); setAgentRequests([...agentRequests, { business: currentUser?.name || "You (Client)", issue: issue, status: "Open" }]); setIssue(""); alert("✅ Your request was sent to Agent!"); } }} style={{ background: "#c9a24a", color: "white", border: "none", padding: "11px 22px", borderRadius: 8, cursor: "pointer" }}>Submit Request</button>
        </div>
        <h3 style={{ color: "#3b1f0b", marginTop: 20 }}>📋 My Requests - Track Status</h3>
        {myRequests.length === 0 ? <p style={{ background: "white", padding: 16, borderRadius: 10, color: "#6b4a2a" }}>No requests yet. Type one above 👆 — it will appear here.</p> :
        myRequests.map((r, i) => <div key={i} style={{ background: "white", padding: 16, borderRadius: 10, marginBottom: 10, borderLeft: "5px solid #d4af37" }}><b>{r.text}</b><br /><span style={{ background: "#e8c97a", padding: "4px 12px", borderRadius: 15, fontSize: 13 }}>{r.status}</span>{r.reply && <p>💬 {r.reply}</p>}</div>)}
        <h3 style={{ color: "#3b1f0b", marginTop: 20 }}>💰 Browse Opportunities - Apply Now</h3>
        {opps.length === 0 ? <p style={{ background: "white", padding: 16, borderRadius: 10, color: "#6b4a2a" }}>No opportunities yet. Login as Admin and post one — then it will appear here for you to apply!</p> :
        opps.map((o, i) => {
          const decision = decisions[i] || "Pending";
          return <div key={i} style={{ background: "white", padding: 16, borderRadius: 10, marginBottom: 10, display: "flex", justifyContent: "space-between", borderLeft: "5px solid #d4af37" }}><span><b>{o.title}</b><br />{o.desc}<br />{applied.includes(i) && <b style={{ color: decision === "Approved" ? "green" : decision === "Rejected" ? "red" : "#6b4a2a" }}>Status: {decision} {decision === "Approved" ? "✅" : decision === "Rejected" ? "❌" : "⏳"}</b>}</span><button onClick={() => { if (!applied.includes(i)) { setApplied([...applied, i]); alert("✅ You applied for: " + o.title); } }} style={{ background: applied.includes(i) ? "#9c6b2f" : "#d4af37", color: applied.includes(i) ? "white" : "#3b1f0b", border: "none", padding: "10px 16px", borderRadius: 8, fontWeight: "bold", cursor: "pointer", height: "fit-content" }}>{applied.includes(i) ? "✓ Applied" : "Apply Now"}</button></div>;
        })}
      </div>{footer}
    </div>
  );

  if (view === "agent") return (
    <div style={{ fontFamily: "Georgia, serif", background: "#fdf6e3", minHeight: "100vh" }}>{header}
      <div style={{ background: "#fdf3d8", padding: "30px", textAlign: "center" }}><h1 style={{ color: "#3b1f0b", fontWeight: "normal" }}>🎧 Support Agent Dashboard</h1><p>Logged in as {currentUser?.email || email}</p></div>
      <div style={{ maxWidth: 700, margin: "20px auto", padding: 20 }}>
        <h3 style={{ color: "#3b1f0b" }}>Your Assigned Requests</h3>
        {agentRequests.length === 0 ? <div style={{ background: "white", padding: 20, borderRadius: 10, color: "#6b4a2a" }}><p>No requests yet.</p><p>Go to Client → Type a request → Logout → Login as Agent → It will appear here!</p></div> :
        agentRequests.map((r, i) => <div key={i} style={{ background: "white", padding: 18, borderRadius: 10, marginBottom: 12, borderLeft: "5px solid #d4af37" }}><b>{r.business}</b><p>{r.issue}</p><span style={{ background: "#e8c97a", padding: "4px 12px", borderRadius: 15 }}>{r.status}</span><div style={{ marginTop: 12, display: "flex", gap: 10, flexWrap: "wrap" }}><button onClick={() => { const c = [...agentRequests]; c[i].status = "In Progress"; setAgentRequests(c); }} style={{ background: "#c9a24a", color: "white", border: "none", padding: "9px 14px", borderRadius: 8, cursor: "pointer" }}>Start → In Progress</button><button onClick={() => { const c = [...agentRequests]; c[i].status = "Resolved"; setAgentRequests(c); }} style={{ background: "#3b1f0b", color: "#d4af37", border: "none", padding: "9px 14px", borderRadius: 8, cursor: "pointer" }}>Mark Resolved ✓</button><button onClick={() => { alert("💬 Message sent to " + r.business); }} style={{ background: "#d4af37", color: "#3b1f0b", border: "none", padding: "9px 14px", borderRadius: 8, cursor: "pointer", fontWeight: "bold" }}>💬 Support Client</button></div></div>)}
      </div>{footer}
    </div>
  );

  if (view === "admin") return (
    <div style={{ fontFamily: "Georgia, serif", background: "#fdf6e3", minHeight: "100vh" }}>{header}
      <div style={{ background: "#fdf3d8", padding: "30px", textAlign: "center" }}><h1 style={{ color: "#3b1f0b", fontWeight: "normal" }}>⚙️ Admin Dashboard</h1><p>Logged in as {currentUser?.email || email}</p></div>
      <div style={{ maxWidth: 700, margin: "20px auto", padding: 20 }}>
        <h3 style={{ color: "#3b1f0b", textAlign: "center" }}>📊 View Dashboard Stats</h3>
        <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
          <div style={{ background: "#e8c97a", padding: 20, borderRadius: 10, width: 150, textAlign: "center" }}><h2>{users.filter(u => u.role === "client").length}</h2><p>Total MSMEs</p></div>
          <div style={{ background: "#eeddbe", padding: 20, borderRadius: 10, width: 150, textAlign: "center" }}><h2>{opps.length}</h2><p>Opportunities</p></div>
          <div style={{ background: "#9c6b2f", color: "white", padding: 20, borderRadius: 10, width: 150, textAlign: "center" }}><h2>{applied.length}</h2><p>Applications</p></div>
        </div>
        <p style={{ textAlign: "center", color: "#3b1f0b", marginTop: 12, fontWeight: "bold" }}>Open: {agentRequests.filter(r => r.status === "Open").length} | In Progress: {agentRequests.filter(r => r.status === "In Progress").length} | Resolved: {agentRequests.filter(r => r.status === "Resolved").length}</p>
        <div style={{ background: "white", padding: 20, borderRadius: 10, border: "2px solid #d4af37", marginTop: 20 }}>
          <h3 style={{ color: "#3b1f0b" }}>+ Post New Opportunity - Type Yours Here</h3>
          <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Type opportunity title... e.g. Women in Business Grant" style={{ width: "100%", padding: 12, border: "2px solid #d4af37", borderRadius: 8, boxSizing: "border-box", marginBottom: 10 }} />
          <input value={oppDesc} onChange={(e) => setOppDesc(e.target.value)} placeholder="Type description... e.g. R100,000 for women-owned businesses" style={{ width: "100%", padding: 12, border: "2px solid #d4af37", borderRadius: 8, boxSizing: "border-box" }} /><br /><br />
          <button onClick={() => { if (title) { setOpps([...opps, { title, desc: oppDesc || "New opportunity" }]); setTitle(""); setOppDesc(""); alert("✅ Opportunity posted! Client can now see it!"); } }} style={{ background: "#c9a24a", color: "white", border: "none", padding: "11px 22px", borderRadius: 8, cursor: "pointer" }}>Post Opportunity</button>
        </div>
        <h3 style={{ color: "#3b1f0b", marginTop: 25 }}>📋 Review Applications - Approve or Reject</h3>
        {applied.length === 0 ? <p style={{ background: "white", padding: 16, borderRadius: 10, color: "#6b4a2a" }}>No applications yet. Client must apply first — then they appear here.</p> :
        applied.map((idx, i) => {
          const decision = decisions[idx] || "Pending";
          return (
            <div key={i} style={{ background: "white", padding: 16, borderRadius: 10, marginBottom: 10, borderLeft: "5px solid #d4af37" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span><b>{currentUser?.name || "Client"}</b><br />{opps[idx]?.title}</span>
                <span style={{ background: decision === "Approved" ? "green" : decision === "Rejected" ? "red" : "#e8c97a", color: decision === "Pending" ? "#3b1f0b" : "white", padding: "5px 12px", borderRadius: 15, fontSize: 13, fontWeight: "bold" }}>{decision}</span>
              </div>
              <div style={{ display: "flex", gap: 10, marginTop: 12 }}>
                <button onClick={() => { setDecisions({ ...decisions, [idx]: "Approved" }); alert("✅ Approved!"); }} style={{ background: "green", color: "white", border: "none", padding: "9px 18px", borderRadius: 8, fontWeight: "bold", cursor: "pointer" }}>✅ Approve</button>
                <button onClick={() => { setDecisions({ ...decisions, [idx]: "Rejected" }); alert("❌ Rejected!"); }} style={{ background: "#b00020", color: "white", border: "none", padding: "9px 18px", borderRadius: 8, fontWeight: "bold", cursor: "pointer" }}>❌ Reject</button>
              </div>
            </div>
          );
        })}
        <h3 style={{ color: "#3b1f0b", marginTop: 20 }}>👥 Manage Users - All Registered Clients Appear Here!</h3>
        {users.map((u, i) => <div key={i} style={{ background: "white", padding: 14, borderRadius: 10, marginBottom: 8 }}>{u.email} — {u.name} — {u.role}</div>)}
      </div>{footer}
    </div>
  );
}

export default App;