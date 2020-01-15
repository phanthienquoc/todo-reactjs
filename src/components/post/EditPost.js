import React, { useState } from "react";
import { useDispatch } from "react-redux";
import * as action from "../../actions/post.action";
import TextEditor from "../../components/common/TextEditor";
import Preview from "./Preview";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams,
  useHistory
} from "react-router-dom";

const EditPost = props => {
  console.log("edit post");

  let history = useHistory();
  const _onPreview = () => {
    props.onPreview(props.postReducer.editPost);
  };
  const _onCancle = () => {};
  const _onSubmit = updateContent => {
    const updateData = {
      ...props.postReducer.editPost,
      content: updateContent
    };
    props.onUpdate(updateData);
  };
  props = {
    ...props,
    history: history,
    data: props.postReducer.editPost.content,
    onSubmit: _onSubmit
  };

  return (
    <React.Fragment>
      <h2>Using CKEditor 5 build in React</h2>
      <TextEditor {...props}></TextEditor>
    </React.Fragment>
  );
};

export default EditPost;
