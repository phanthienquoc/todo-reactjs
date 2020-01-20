import React, { useState, Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Card, Col, Row } from "antd";
import * as utils from "../../helpers/utils";
import * as postAction from "../../actions/post.action";
import PostList from "./PostList";
import FormPost from "./FormPost";
import EditPost from "./EditPost";
import Preview from "./Preview";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useHistory,
  useRouteMatch
} from "react-router-dom";

const PostDashboard = () => {
  let props = useSelector(state => state);
  const dispatch = useDispatch();
  let history = useHistory();
  let user = "afk_trump";

  const _onSubmit = data => {
    history.push("/blogs/list");
    dispatch(
      postAction.submitPost({
        title: "blog",
        content: data
      })
    );
  };

  const _onPreview = data => {
    dispatch(
      postAction.previewPost({
        title: "blog",
        content: data
      })
    );
  };
  const _onCancle = data => {
    history.goBack();
    dispatch(postAction.cancleEditPost());
  };

  const _onUpdate = data => {
    history.push("/blogs/list");
    dispatch(postAction.updatePost(data.id, data));
  };

  const _onBack = () => {
    history.goBack();
    dispatch(postAction.onBack());
  };

  let url =
    // "https://images-na.ssl-images-amazon.com/images/I/31-rHhErikL._SX331_BO1,204,203,200_.jpg";
    "https://camerabox.vn/uploads/news/2018_11/chup-anh-thien-nhien-theo-mua-2.jpg";

  const callAPI = (file, fileName) => {
    let error = false;
    if (error) {
      return {
        src: url,
        error: "xxx"
      };
    } else {
      return {
        src: url
      };
    }
  };

  const _onUploadSingleFile = (file, fileName) => {
    let result = callAPI(file, fileName);
    return {
      src: result.src,
      error: result.error
    };
  };

  const _onUploadMultiFiles = files => {
    files = files.map(item => {
      let result = _onUploadSingleFile(item.file, item.fileName);
      return {
        ...item,
        src: result.error ? result.error : result.src,
        alt: result.error ? result.error : item.fileName
      };
    });

    return files;
  };

  props = {
    ...props,
    user: user || utils.generateUUID(),
    onSubmit: _onSubmit,
    onPreview: _onPreview,
    onCancle: _onCancle,
    onUpdate: _onUpdate,
    onBack: _onBack,
    onUploadMultiFiles: _onUploadMultiFiles
  };

  return (
    <Switch>
      <Fragment>
        <Route path="/blogs/list">
          <PostList {...props} />
          ``
        </Route>
        <Route path="/blogs/create">
          <FormPost {...props} />
        </Route>
        <Route path="/blogs/edit">
          <EditPost {...props} />
        </Route>
        <Route
          path="/blogs/preview"
          render={({ match }) => {
            return <Preview {...props} />;
          }}
        />
      </Fragment>
    </Switch>
  );
};

export default PostDashboard;
