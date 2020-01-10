import React, { useState } from "react";
import "./App.css";
import { useSelector } from "react-redux";
import ListingTodo from "./components/ListingTodo";
import { InputNumber } from "antd";
import * as utils from "./helpers/utils";
import "antd/dist/antd.css"; // or 'antd/dist/antd.less'
import TextEditor from "./components/TextEditor";

function App() {
  const data = "";
  const onBlur = () => {};
  const onFocus = () => {};
  const onChange = data => {};
  const onSubmit = editorData => {
    setConfig({
      ...config,
      data: editorData
    });
  };
  const handleConvertData = data => {};
  const [config, setConfig] = useState({
    onChange,
    onBlur,
    onFocus,
    onSubmit,
    data
  });

  return (
    <div className="App">
      <h2>Using CKEditor 5 build in React</h2>
      <TextEditor {...config} />
    </div>
  );
}

export default App;
