import { useState } from "react";
import axios from "axios";
import "./App.css";
import { Analytics } from "@vercel/analytics/next";

function App() {
  const [resume, setResume] = useState("");
  const [job, setJob] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleOptimize = async () => {
    setLoading(true);
    setError("");
    setResult(null);

    if (!resume.trim() || !job.trim()) {
      setError("Please add both a resume and a job description.");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/optimize`, {
        resume,
        job,
      });

      setResult(response.data);
    } catch (err) {
      console.error("Frontend error:", err);

      const message =
        err.response?.data?.details ||
        err.response?.data?.error ||
        "Something went wrong while optimizing the resume.";

      setError(message);
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = async () => {
  if (!result?.optimizedResume) return;

  try {
    await navigator.clipboard.writeText(result.optimizedResume);
    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 2000);
  } catch (err) {
    console.error("Copy failed:", err);
    setError("Could not copy the optimized resume.");
  }
};

const handleDownload = () => {
  if (!result?.optimizedResume) return;

  const blob = new Blob([result.optimizedResume], { type: "text/plain" });
  const url = window.URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = "optimized_resume.txt";
  a.click();

  window.URL.revokeObjectURL(url);
};

  return (
    <div className="page">
      <div className="hero">
        <h1>STYLZ Career AI</h1>
        <p>
          AI-powered resume optimization, match analysis, and skill gap feedback
          for job seekers.
        </p>
        <p className="version">Version 1.0 • Early Access</p>
      </div>

      <div className="layout">
        <div className="card">
          <h2>Input</h2>

          <label>Resume</label>
          <textarea
            placeholder="Paste your resume here"
            value={resume}
            onChange={(e) => setResume(e.target.value)}
            rows={12}
          />

          <label>Job Description</label>
          <textarea
            placeholder="Paste the job description here"
            value={job}
            onChange={(e) => setJob(e.target.value)}
            rows={12}
          />

          <button onClick={handleOptimize} disabled={loading}>
            {loading ? "Analyzing..." : "Optimize Resume"}
          </button>

          {error && (
            <div className="error-box">
              <strong>Error:</strong> {error}
            </div>
          )}
        </div>

        <div className="card">
          <h2>Results</h2>

          {!result && !loading && (
            <p className="placeholder">
              Your scores, strengths, gaps, and optimized resume will appear here.
            </p>
          )}

          {result && (
            <>
              <div className="score-grid">
                <div className="score-card">
                  <h3>Resume Score</h3>
                  <p>{result.resumeScore}/100</p>
                  <div className="progress-bar">
                    <div 
                      className="progress-fill"
                      style={{ width: `${result.resumeScore}%` }}
                    ></div>
                  </div>
                </div>

                <div className="score-card">
                  <h3>Match Score</h3>
                  <p>{result.matchScore}/100</p>
                  <div className="progress-bar">
                    <div 
                      className="progress-fill"
                      style={{ width: `${result.matchScore}%` }}
                    ></div>
                  </div>
                </div>
              </div>

              <div className="result-section">
                <h3>Top Strengths</h3>
                <ul>
                  {result.strengths?.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>

              <div className="result-section">
                <h3>Skill Gaps</h3>
                <ul>
                  {result.gaps?.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>

              <div className="result-section">
                <h3>Improvement Suggestions</h3>
                <ul>
                  {result.improvements?.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>

              <div className="result-section">
                <div className="result-header">
                  <h3>Optimized Resume</h3>

                  <div style={{ display: "flex", gap: "10px" }}>
                    <button className="copy-btn" onClick={handleCopy}>
                      {copied ? "Copied!" : "Copy"}
                    </button>

                    <button className="download-btn" onClick={handleDownload}>
                      Download
                    </button>
                  </div>
                </div>

                <div className="roadmap">
                  <h3>In Progress...</h3>
                  <ul>
                    <li>AI Resume Rewriting</li>
                    <li>Keyword Optimization</li>
                    <li>Personalized Job Match Insights</li>
                    <li>Downloadable Optimized Resume</li>
                  </ul>
                  <p className="roadmap-note">STYLZ Career AI is actively being developed. Thank you for being an early user!</p>
                </div>

                <pre>{result.optimizedResume}</pre>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;