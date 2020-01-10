import React, { useState } from "react";
import CKEditor from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

const TextEditor = props => {
  let user = "afk_trump";
  let imagesUpload = [];
  const [data, setData] = useState();
  let tempDiv = document.createElement("div");
  const [editorData, setEditorData] = useState();
  const submit = () => {
    let submitData = onSubmit(data);
    console.log(submitData);
    props.onSubmit(submitData);
  };

  const getListImageToUpload = (parenHtml, imagesUpload, editorData) => {
    parenHtml.innerHTML = editorData.toString();
    let imgs = tempDiv.getElementsByTagName("img");
    for (let i = 0; i < imgs.length; i++) {
      let idImage = [user, i].join("_");
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

  const onSubmit = editorData => {
    imagesUpload = getListImageToUpload(tempDiv, imagesUpload, editorData);
    imagesUpload = imagesUpload.map(item => {
      return {
        ...item,
        upload: function() {
          return "https://images.pexels.com/photos/414612/pexels-photo-414612.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260";
        }
      };
    });

    imagesUpload = imagesUpload.map(item => {
      const rawResponse = item.upload();
      return {
        ...item,
        src: rawResponse
      };
    });

    for (let i = 0; i < imagesUpload.length; i++) {
      tempDiv
        .querySelector(`#${imagesUpload[i].id}`)
        .setAttribute("src", imagesUpload[i].src);
    }
    let editorDataConverted = tempDiv.innerHTML.toString();
    setData(editorDataConverted);

    return editorDataConverted;
  };

  return (
    <div>
      <CKEditor
        editor={ClassicEditor}
        onInit={editor => {}}
        data={props.data}
        config={{ ...props }}
        onChange={(event, editor) => {
          const data = editor.getData();
          setData(data);
          props.onChange(data);
        }}
        onBlur={(event, editor) => {
          props.onBlur(event, editor);
        }}
        onFocus={(event, editor) => {
          props.onFocus(event, editor);
        }}
      />
      <button onClick={submit}>Submit 2</button>
    </div>
  );
};

export default TextEditor;
