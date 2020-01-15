import * as types from "../constants/post.types";

export const addPost = () => ({
  type: types.ADD_POST
});

export const submitPost = post => ({
  type: types.SUBMIT_POST,
  post: post
});

export const editPost = id => ({
  type: types.EDIT_POST,
  id: id
});

export const updatePost = (id, post) => ({
  type: types.UPDATE_POST,
  id: id,
  post: post
});

export const deletePost = id => ({
  type: types.DELETE_POST,
  id: id
});

export const previewPost = post => ({
  type: types.PREVIEW_POST,
  post: post
});

export const cancleEditPost = () => ({
  type: types.CANCLE_EDIT_POST
});

export const onBack = () => ({
  type: types.ON_BACK
});
