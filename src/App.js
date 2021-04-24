import { useState } from "react";
import ReactJson from "react-json-view";
import { Navbar, Button } from "react-bootstrap";
import { CopyToClipboard } from "react-copy-to-clipboard";

function App() {
  const [caddyfile, setCaddyfile] = useState("");
  const [caddyJson, setCaddyJson] = useState({});
  const handleCaddyfileChange = (event) => {
    setCaddyfile(event.target.value);
  };
  const handleConvertButton = () => {
    if (caddyfile) {
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ input: caddyfile }),
      };
      fetch("/api/caddapto", requestOptions)
        .then((response) => response.json())
        .then((data) => setCaddyJson(data));
    }
  };
  return (
    <div style={{ overflowX: "hidden" }}>
      <Navbar bg="light" variant="light">
        <Navbar.Brand href="/">
          <img
            src="/logo192.png"
            width="30"
            height="30"
            className="d-inline-block align-top"
            alt="React Bootstrap logo"
          />{" "}
          Caddapto
        </Navbar.Brand>
        <Button
          className="mr-auto"
          variant="success"
          size="sm"
          onClick={handleConvertButton}
        >
          Convert
        </Button>
        <span className="ml-auto">
          <a
            href="https://github.com/suryamodulus/caddapto"
            target="_blank"
            rel="noreferrer"
            style={{
              color: "inherit",
              textDecoration: "none",
              cursor: "pointer",
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="icon icon-tabler icon-tabler-brand-github"
              width="22"
              height="22"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="#2c3e50"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M9 19c-4.3 1.4 -4.3 -2.5 -6 -3m12 5v-3.5c0 -1 .1 -1.4 -.5 -2c2.8 -.3 5.5 -1.4 5.5 -6a4.6 4.6 0 0 0 -1.3 -3.2a4.2 4.2 0 0 0 -.1 -3.2s-1.1 -.3 -3.5 1.3a12.3 12.3 0 0 0 -6.2 0c-2.4 -1.6 -3.5 -1.3 -3.5 -1.3a4.2 4.2 0 0 0 -.1 3.2a4.6 4.6 0 0 0 -1.3 3.2c0 4.6 2.7 5.7 5.5 6c-.6 .6 -.6 1.2 -.5 2v3.5" />
            </svg>
            Github
          </a>
        </span>
      </Navbar>
      <div className="row">
        <div className="col-12">
          <textarea
            value={caddyfile}
            className="form-control"
            id="caddyfile-input"
            style={{
              minHeight: "50vh",
              resize: "none",
            }}
            autoCorrect="off"
            autoCapitalize="off"
            spellCheck="false"
            onChange={handleCaddyfileChange}
            placeholder="Type Caddyfile contents here"
          ></textarea>
        </div>
        <div
          className="col-12"
          style={{
            minHeight: "50vh",
            backgroundColor: "rgb(43, 48, 59)",
            overflowY: "scroll",
          }}
        >
          <div style={{ position: "absolute", right: "15px", zIndex: "10000" }}>
            <CopyToClipboard text={JSON.stringify(caddyJson, null, 2)}>
              <Button variant="outline-primary" size="sm">
                Copy To Clipboard
              </Button>
            </CopyToClipboard>
          </div>
          {/* <pre className="text-white">{JSON.stringify(caddyJson, null, 2)}</pre> */}
          <ReactJson
            src={caddyJson}
            name={false}
            theme="ocean"
            collapseStringsAfterLength={false}
            enableClipboard={false}
            displayDataTypes={false}
            displayObjectSize={false}
            indentWidth="2"
          />
        </div>
      </div>
    </div>
  );
}

export default App;
