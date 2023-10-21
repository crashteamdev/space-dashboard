import axios from "../../../utils/axios";
import { createSlice } from "@reduxjs/toolkit";
import { map } from "lodash";
import { AppDispatch } from "../../store";

const API_URL = "/api/data/postData";

interface StateType {
  posts: any[];
  token: string;
  subscription: {
    active: boolean;
    createdAt: string;
    endAt: string;
    type: string;
    typeNumeric: number;
  };
  followers: any[];
  gallery: any[];
}

const initialState = {
  posts: [],
  token: "",
  subscription: {
    active: false,
    createdAt: "",
    endAt: "",
    type: "default", // default, advanced, pro
    typeNumeric: 1, // 1, 2, 3
  },
  followers: [],
  gallery: [],
};

export const UserProfileSlice = createSlice({
  name: "UserPost",
  initialState,
  reducers: {
    getTokens: (state, action) => {
      state.token = action.payload;
    },
    getSubscription: (state, action) => {
      state.subscription = action.payload;
    },
    getPosts: (state, action) => {
      state.posts = action.payload;
    },
    getFollowers: (state, action) => {
      state.followers = action.payload;
    },
    getPhotos: (state, action) => {
      state.gallery = action.payload;
    },
    onToggleFollow(state: StateType, action) {
      const followerId = action.payload;

      const handleToggle = map(state.followers, (follower) => {
        if (follower.id === followerId) {
          return {
            ...follower,
            isFollowed: !follower.isFollowed,
          };
        }

        return follower;
      });

      state.followers = handleToggle;
    },
  },
});

export const {
  getPosts,
  getFollowers,
  onToggleFollow,
  getPhotos,
  getTokens,
  getSubscription,
} = UserProfileSlice.actions;

export const fetchToken = (token: string, context: string) => async (dispatch: AppDispatch) => {
  try {
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `https://${context}-api.marketdb.pro/v1/user/api-key`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    axios
      .request(config)
      .then((response) => {
        console.log(response.data);
        dispatch(getTokens(response.data));
      })
      .catch((error) => {
        console.log(error);
      });
  } catch (err: any) {
    throw new Error(err);
  }
};

export const fetchRefreshToken =
  (token: string, context: string) => async (dispatch: AppDispatch) => {
    try {
      let config = {
        method: "put",
        maxBodyLength: Infinity,
        url: `https://${context}-api.marketdb.pro/v1/user/api-key`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      axios
        .request(config)
        .then((response) => {
          console.log(response.data);
          dispatch(getTokens(response.data));
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (err: any) {
      throw new Error(err);
    }
  };

export const fetchGenerateToken =
  (token: string, context: string) => async (dispatch: AppDispatch) => {
    try {
      let config = {
        method: "post",
        maxBodyLength: Infinity,
        url: `https://${context}-api.marketdb.pro/v1/user/api-key`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      axios
        .request(config)
        .then((response) => {
          console.log(response.data);
          dispatch(getTokens(response.data));
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (err: any) {
      throw new Error(err);
    }
  };

export const fetchProfileStatus =
  (token: string, context: string) => async (dispatch: AppDispatch) => {
    try {
      let config = {
        method: "get",
        maxBodyLength: Infinity,
        url: `https://${context}-api.marketdb.pro/v1/user/subscription`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      axios
        .request(config)
        .then((response) => {
          console.log(response.data);
          dispatch(getSubscription(response.data));
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (err: any) {
      throw new Error(err);
    }
  };

export const fetchPosts = () => async (dispatch: AppDispatch) => {
  try {
    const response = await axios.get(`${API_URL}`);
    dispatch(getPosts(response.data));
  } catch (err: any) {
    throw new Error(err);
  }
};
export const likePosts = (postId: number) => async (dispatch: AppDispatch) => {
  try {
    const response = await axios.post("/api/data/posts/like", { postId });
    dispatch(getPosts(response.data.posts));
  } catch (err: any) {
    throw new Error(err);
  }
};
export const addComment =
  (postId: number, comment: any[]) => async (dispatch: AppDispatch) => {
    try {
      const response = await axios.post("/api/data/posts/comments/add", {
        postId,
        comment,
      });
      dispatch(getPosts(response.data.posts));
    } catch (err: any) {
      throw new Error(err);
    }
  };

export const addReply =
  (postId: number, commentId: any[], reply: any[]) =>
  async (dispatch: AppDispatch) => {
    try {
      const response = await axios.post("/api/data/posts/replies/add", {
        postId,
        commentId,
        reply,
      });
      dispatch(getPosts(response.data.posts));
    } catch (err: any) {
      throw new Error(err);
    }
  };

export const fetchFollwores = () => async (dispatch: AppDispatch) => {
  try {
    const response = await axios.get(`/api/data/users`);
    dispatch(getFollowers(response.data));
  } catch (err: any) {
    throw new Error(err);
  }
};

export const fetchPhotos = () => async (dispatch: AppDispatch) => {
  try {
    const response = await axios.get(`/api/data/gallery`);
    dispatch(getPhotos(response.data));
  } catch (err: any) {
    throw new Error(err);
  }
};

export default UserProfileSlice.reducer;
