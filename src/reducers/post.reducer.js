import * as types from "../constants/post.types";

const initialState = {
  posts: [],
  editPost: {
    id: null,
    title: "",
    content: ""
  },
  newPost: {
    id: null,
    title: "",
    content: ""
  },
  isEdit: false,
  isAdd: false
};

const postsReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.ADD_POST: {
      return {
        ...state,
        editPost: { id: null, title: "", content: "" },
        isAdd: false,
        isEdit: true
      };
    }

    case types.SUBMIT_POST: {
      let id = state.posts.length === 0 ? 0 : state.posts[0].id + 1;
      return {
        ...state,
        posts: [
          {
            id: id,
            ...action.post
          },
          ...state.posts
        ],
        editPost: { id: null, title: "", content: "" },
        isEdit: false,
        isAdd: false
      };
    }

    case types.DELETE_POST: {
      let newPosts = state.posts.filter(item => item.id !== action.id);

      return {
        ...state,
        posts: newPosts
      };
    }

    case types.EDIT_POST: {
      let editItem = state.posts.find(item => {
        return item.id === action.id;
      });
      return {
        ...state,
        editPost: editItem,
        isEdit: true,
        isAdd: false
      };
    }

    case types.UPDATE_POST: {
      debugger;
      let newPosts = state.posts.map(item => {
        if (item.id === action.id) {
          return {
            ...item,
            ...action.post
          };
        } else {
          return item;
        }
      });
      return {
        ...state,
        posts: newPosts,
        editPost: { id: null, title: "", content: "" },
        isEdit: false
      };
    }

    case types.CANCLE_EDIT_POST: {
      return {
        ...state,
        editPost: { id: null, title: "", content: "" },
        isEdit: false,
        isAdd: false
      };
    }

    case types.PREVIEW_POST: {
      return {
        ...state,
        editPost: {
          ...state.editPost,
          ...action.post
        },
        isPreview: true
      };
    }

    case types.ON_BACK: {
      return {
        ...state,
        isPreview: false
      };
    }

    default: {
      return {
        ...state
      };
    }
  }
};

export default postsReducer;
