import { useEffect } from "react";

export default function Maintenance() {
  useEffect(() => {
    const styleSheet = document.createElement("style");
    styleSheet.type = "text/css";
    styleSheet.innerText = `
      @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
    `;
    document.head.appendChild(styleSheet);
    return () => {
      document.head.removeChild(styleSheet);
    };
  }, []);

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>🚧 Maintenance Mode</h1>
      <p style={styles.text}>
        We&apos;re currently working on improving your experience. Please check back soon!
      </p>
      <div style={styles.loader}></div>
      <p style={styles.smallText}>Thank you for your patience.</p>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    textAlign: "center",
    backgroundColor: "#f4f4f9",
    color: "#333",
    padding: "20px",
  },
  heading: {
    fontSize: "2.5rem",
    marginBottom: "20px",
  },
  text: {
    fontSize: "1.2rem",
    marginBottom: "30px",
  },
  loader: {
    border: "5px solid #f3f3f3",
    borderTop: "5px solid #3498db",
    borderRadius: "50%",
    width: "50px",
    height: "50px",
    animation: "spin 1s linear infinite",
    margin: "0 auto",
  },
  smallText: {
    fontSize: "0.9rem",
    marginTop: "20px",
  },
};
