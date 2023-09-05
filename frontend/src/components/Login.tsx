export const Login = () => {
  return (
    <div
      style={{
        position: 'absolute',
        top: '40%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        border: '.8px solid gray',
        padding: 20
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 15,
          justifyContent: 'center'
        }}
      >
        <span style={{ fontFamily: 'monospace', fontSize: '1.1rem', color: '#333' }}>
          Login to your postgres database
        </span>
        <input type="text" name="database" placeholder="database..." />
        <input type="text" name="username" placeholder="username" />
        <input type="password" name="password" placeholder="password..." />
        <div>
          <button className="btn btn-main">Login</button>
          <button className="btn btn-underneath">Login</button>
        </div>
      </div>
    </div>
  )
}
