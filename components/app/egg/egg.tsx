import React from 'react';
import './egg.css';


export type script = {
  title: string;
  code: string;
  description: string;
};


export default function Egg({ codeSnippets }: { codeSnippets: script[] }) {
  // console.log(codeSnippets);

  return (
    <div className="egg-page">
      <div className="terminal-window">
        <div className="terminal-bar">

          <div className="terminal-buttons">
            <div className="button close"></div>
            <div className="button minimize"></div>
            <div className="button maximize"></div>
          </div>
          <div className="terminal-title">secret_page.py</div>
        </div>

        <div className="terminal-content">
          <div className="code-header">
            <h1>🐍 Python Code Snippets</h1>
            <p className="tagline">A collection of Python examples</p>
          </div>

          {codeSnippets.map((snippet, index) => (
            <div key={index} className="code-snippet">
              <div className="snippet-header">
                <h2>{snippet.title}</h2>
                <p className="description">{snippet.description}</p>
              </div>
              <pre className="code-block">
                <code>{snippet.code}</code>
              </pre>
            </div>
          ))}

          <div className="easter-egg">
            <p>🎉 You found the secret page! 🎉</p>
            <p className="small">(This is just for fun - no need to tell anyone)</p>
          </div>
        </div>
      </div>
    </div>
  );
};
