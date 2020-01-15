import React, { useState } from "react";
import CKEditor from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import * as utils from "../../helpers/utils";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams
} from "react-router-dom";

const TextEditor = props => {
  let imagesUpload = [];
  const [data, setData] = utils.useStateFromProp(props.data);
  let tempDiv = document.createElement("div");

  const _onChange = (event, editor) => {
    const data = editor.getData();
    setData(data);
    if (typeof props.onChange === "function") {
      props.onChange(data);
    } else {
      // // 		console.log('Todo viewItem.parent',viewItem.parent)
    }
  };

  const _onBlur = (event, editor) => {
    if (typeof props.onBlur === "function") {
      props.onBlur(event, editor);
    } else {
      // 		console.log('Todo viewItem.parent',viewItem.parent)
    }
  };

  const _onFocus = (event, editor) => {
    if (typeof props.onFocus === "function") {
      props.onFocus(event, editor);
    } else {
      // 		console.log('Todo viewItem.parent',viewItem.parent)
    }
  };

  const _onPreview = () => {
    if (typeof props.onPreview === "function") {
      props.onPreview(data);
    } else {
      // 		console.log('Todo viewItem.parent',viewItem.parent)
    }
  };

  const _onSubmit = () => {
    if (data) {
      let submitData = _onTranformData(data);
      if (typeof props.onSubmit === "function") {
        props.onSubmit(submitData);
      } else {
        // 		console.log('Todo viewItem.parent',viewItem.parent)
      }
    } else {
      alert("not thing to submit");
    }
  };

  const _onCancle = () => {
    if (typeof props.onCancle === "function") {
      props.onCancle();
    } else {
      // 		console.log('Todo viewItem.parent',viewItem.parent)
    }
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

  const _onTranformData = editorData => {
    imagesUpload = _getListImageToUpload(tempDiv, imagesUpload, editorData);
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

    return editorDataConverted;
  };

  let match = useRouteMatch();

  return (
    <div>
      <CKEditor
        editor={ClassicEditor}
        onInit={editor => {}}
        data={props.data}
        config={{ ...props }}
        onChange={_onChange}
        onBlur={_onBlur}
        onFocus={_onFocus}
        height={500}
      />
      <button onClick={_onSubmit}>Submit</button>
      <button onClick={_onPreview}>
        <Link to={`/blogs/preview`}>Preview</Link>
      </button>
      <button onClick={_onCancle}>Cancle</button>
    </div>
  );
};

export default TextEditor;
