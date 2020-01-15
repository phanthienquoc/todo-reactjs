import React from "react";

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
  return `
        <!DOCTYPE html>
        <html>
        <head>
        <meta charset="UTF-8">
        <title>Title of the document</title>
        <style>
        :root {
          --ck-image-style-spacing: 1.5em;
        }
        
        li,
        p,
        h1,
        h2,
        h3,
        h4,
        h5,
        span,
        a {
          text-align: left;
        }
        
        figure.image img {
          width: 100%;
        }
  
        figure.image.image_resized {
          margin: 0 auto;
        }
        
        figure.image.image-style-side,
        figure.image.image-style-align-left {
          float: left;
          max-width: 50%;
        }
        figure.image.image-style-align-center {
        }
        figure.image.image-style-align-right {
          max-width: 50%;
          float: right;
        }
        
        figure.image.image-style-side {
          float: right;
          margin-left: var(--ck-image-style-spacing);
        }
        
        figure.image.image-style-align-left {
          float: left;
          margin-right: var(--ck-image-style-spacing);
        }
        
        figure.image.image-style-align-center {
          margin-left: auto;
          margin-right: auto;
        }
        
        figure.image.image-style-align-right {
          float: right;
          margin-left: var(--ck-image-style-spacing);
        }</style>
        </head>
        <body>
        </body>
        ${data}
        </html>
        `;
};

export default PreView;
