import React, { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addPost, editPost, deletePost } from "../../actions/post.action";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams
} from "react-router-dom";

const ListPost = props => {
  const dispatch = useDispatch();

  const deleteItem = id => {
    dispatch(deletePost(id));
  };

  const editItem = id => {
    dispatch(editPost(id));
  };

  const addItem = () => {
    dispatch(addPost());
  };

  return (
    <Fragment>
      <h2>List Post</h2>
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {props.postReducer.posts.length > 0 ? (
            props.postReducer.posts.map(item => (
              <tr key={item.id}>
                <td>{item.title}</td>
                <td>
                  <button
                    className="button muted-button"
                    onClick={() => editItem(item.id)}
                  >
                    <Link to={`/blogs/edit`}>Edit</Link>
                  </button>
                  <button
                    className="button muted-button"
                    onClick={() => deleteItem(item.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={3}>No post</td>
              <td></td>
            </tr>
          )}
        </tbody>
      </table>
      {!props.postReducer.isEdit || props.postReducer.posts.length === 0 ? (
        <button className="button muted-button" onClick={() => addItem()}>
          <Link to={`/blogs/create`}>Add</Link>
        </button>
      ) : (
        ""
      )}
    </Fragment>
  );
};

export default ListPost;
