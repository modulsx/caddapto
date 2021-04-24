import { useState } from "react";
import ReactJson from "react-json-view";
import { Navbar, Button } from "react-bootstrap";

function App() {
  const [caddyJson, setCaddyJson] = useState({});
  const [caddyfile, setCaddyfile] = useState("");
  const handleCaddyfileChange = (event) => {
    setCaddyfile(event.target.value);
  };
  const handleConvertButton = () => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ input: caddyfile }),
    };
    fetch("/api/caddapto", requestOptions)
      .then((response) => response.json())
      .then((data) => setCaddyJson(data));
  };
  return (
    <div style={{ overflowX: "hidden" }}>
      <Navbar bg="light" variant="light">
        <Navbar.Brand href="#home">Caddapto App</Navbar.Brand>
        <Button
          className="mr-auto"
          variant="success"
          size="sm"
          onClick={handleConvertButton}
        >
          Convert
        </Button>
      </Navbar>
      <div className="row">
        <div className="col-12">
          <textarea
            value={caddyfile}
            className="form-control"
            id="caddyfile-input"
            style={{
              minHeight: "50vh",
              border: "none",
              outline: "none",
              resize: "none",
            }}
            autoCorrect="off"
            autoCapitalize="off"
            spellCheck="false"
            onChange={handleCaddyfileChange}
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
