import React, { useState } from "react";
import * as actionPost from "../../actions/post.action";
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

const FormPost = props => {
  console.log("add post");
  let match = useRouteMatch();
  let history = useHistory();

  props = {
    ...props,
    data: props.postReducer.editPost.content || "",
    history: history
  };
  return (
    <React.Fragment>
      <h2>Using CKEditor 5 build in React</h2>
      <TextEditor {...props} />
    </React.Fragment>
  );
};

export default FormPost;
