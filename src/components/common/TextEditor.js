import React, { useState, useEffect } from "react";
import CKEditor from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import "../../scss/preview.scss";

const TextEditor = props => {
  let imagesUpload = [];
  const [isPreview, setIsPreview] = useState(false);
  const [data, setData] = useStateFromProp(props.data);

  let tempDiv = document.createElement("div");

  const _onChange = (event, editor) => {
    const data = editor.getData();
    setData(data);
    if (typeof props.onChange === "function") {
      props.onChange(data);
    } else {
      // alert("onChange function not implement");
    }
  };

  const _onBlur = (event, editor) => {
    if (typeof props.onBlur === "function") {
      props.onBlur(event, editor);
    } else {
      // alert("onBlur function not implement");
    }
  };

  const _onFocus = (event, editor) => {
    if (typeof props.onFocus === "function") {
      props.onFocus(event, editor);
    } else {
      // alert("onFocus function not implement");
    }
  };

  const _onPreview = () => {
    setIsPreview(true);
  };

  const _onSubmit = () => {
    if (data) {
      let submitData = _onTranformData(data);
      if (typeof props.onSubmit === "function") {
        props.onSubmit(submitData);
      } else {
        alert("submit function not implement");
      }
    } else {
      alert("not thing to submit");
    }
  };

  const _onCancle = () => {
    if (typeof props.onCancle === "function") {
      setData("");
      setIsPreview(false);
      props.onCancle();
    } else {
      alert("onChange function not implement");
    }
  };

  const _onBack = () => {
    setIsPreview(false);
  };

  const _getListImageToUpload = (parenHtml, imagesUpload, editorData) => {
    parenHtml.innerHTML = editorData.toString();

    let figure = tempDiv.getElementsByTagName("figure");
    let array = [...figure];
    array.map(item => {
      // console.log("class : ", item.getAttribute("class"));
      // console.log("style : ", item.getAttribute("style"));
    });

    let imgs = tempDiv.getElementsByTagName("img");
    for (let i = 0; i < imgs.length; i++) {
      let idImage = [props.user, i].join("_");
      imgs[i].setAttribute("id", idImage);
      let srcImg = imgs[i].getAttribute("src");

      if (srcImg.indexOf(`base64`) !== -1) {
        imagesUpload = [
          ...imagesUpload,
          {
            id: idImage,
            src: srcImg
          }
        ];
      }
    }

    return imagesUpload;
  };

  const _onUploadSingleFile = (file, fileName) => {
    return props.onUploadSingleFile(file, fileName);
  };

  const _onUploadMultiFiles = files => {
    let results = props.onUploadMultiFiles(files);
    results.map(item => {
      if (item.src != null || item.src !== undefined) {
        return item;
      } else {
        return {
          ...item,
          src: "error",
          alt: item.error || item.fileName
        };
      }
    });

    return results;
  };

  const _onTranformData = editorData => {
    imagesUpload = _getListImageToUpload(tempDiv, imagesUpload, editorData);
    imagesUpload = _onUploadMultiFiles(imagesUpload);

    // imagesUpload = imagesUpload.map(item => {
    //   return {
    //     ...item,
    //     upload: function() {
    //       return "https://images.pexels.com/photos/414612/pexels-photo-414612.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260";
    //     }
    //   };
    // });

    // imagesUpload = imagesUpload.map(item => {
    //   const rawResponse = item.upload();
    //   return {
    //     ...item,
    //     src: rawResponse
    //   };
    // });

    for (let i = 0; i < imagesUpload.length; i++) {
      tempDiv
        .querySelector(`#${imagesUpload[i].id}`)
        .setAttribute("src", imagesUpload[i].src);
    }
    let editorDataConverted = tempDiv.innerHTML.toString();

    return editorDataConverted;
  };

  let previewData = {
    data: data
  };

  return (
    <div>
      {isPreview ? (
        <div>
          <PreView {...previewData}></PreView>
          <button onClick={_onBack}>Back</button>
        </div>
      ) : (
        <div>
          <div className="ckeditor-container">
            <CKEditor
              editor={ClassicEditor}
              onInit={editor => {}}
              data={data}
              config={{ ...props }}
              onChange={_onChange}
              onBlur={_onBlur}
              onFocus={_onFocus}
            />
          </div>
          <button onClick={_onSubmit}>Submit</button>
          <button onClick={_onPreview}>Preview</button>
          <button onClick={_onCancle}>Cancle</button>
        </div>
      )}
    </div>
  );
};

export default TextEditor;

const PreView = props => {
  return (
    <React.Fragment>
      {props.data && props.data.length === 0 ? (
        <div>
          <h1>Nothing to preview</h1>
        </div>
      ) : (
        ""
      )}
      <div>{viewEditorHtml(convertToHTMLSaveDb(props.data))}</div>
    </React.Fragment>
  );
};

const viewEditorHtml = data => {
  return <div dangerouslySetInnerHTML={{ __html: data }}></div>;
};

const convertToHTMLSaveDb = data => {
  return `<div class="preview-editor"> ${data}</div>`;
};

const useStateFromProp = initialValue => {
  const [inputs, setInputs] = useState(initialValue);

  useEffect(() => setInputs(initialValue), [initialValue]);

  return [inputs, setInputs];
};
