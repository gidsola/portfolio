import '@/css/egg.css';

export default function Egg({ pageData }: { pageData: EggPageData }) {
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
            <p className="tagline">A collection of Python examples.</p>
            <p className="tagline">This page is the closest representation of another site that I cannot remember and could not find. If someone knows which site I speak of please reach out. 😀</p>
          </div>

          {pageData.scripts.map((script, index) => (
            <div key={index} className="code-snippet">
              <div className="snippet-header">
                <h2>{script.title}</h2>
                <p className="description">{script.description}</p>
              </div>
              <pre className="code-block">
                <code>{script.code}</code>
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
