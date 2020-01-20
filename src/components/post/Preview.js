import React from "react";
import "../../scss/preview.scss";

const PreView = props => {
  let data = props.postReducer.editPost.content;
  return (
    <React.Fragment>
      <div>{viewEditorHtml(convertToHTMLSaveDb(data))}</div>
      <button onClick={props.onBack}>back</button>
    </React.Fragment>
  );
};

const viewEditorHtml = data => {
  return <div dangerouslySetInnerHTML={{ __html: data }}></div>;
};

const convertToHTMLSaveDb = data => {
  return `<div class="preview-editor"> ${data}</div>`;
};

export default PreView;
