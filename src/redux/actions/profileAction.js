import { GLOBALTYPES, DeleteData } from "./globalTypes";
import { getDataAPI, patchDataAPI } from "../../utils/fetchData";
import { imageUpload } from "../../utils/imageUpload";
import { createNotify, removeNotify } from "./notifyAction";

export const PROFILE_TYPES = {
  LOADING: "LOADING_PROFILE",
  GET_USER: "GET_PROFILE_USER",
  FOLLOW: "FOLLOW",
  UNFOLLOW: "UNFOLLOW",
  GET_ID: "GET_PROFILE_ID",
  GET_POSTS: "GET_PROFILE_POSTS",
  UPDATE_POST: "UPDATE_PROFILE_POSTS",

};


export const getProfileUsers = ({ id, auth}) => async (dispatch) => {

  dispatch({type:PROFILE_TYPES.GET_ID, payload: id})

    try {
      dispatch({type: PROFILE_TYPES.LOADING, payload:true});
      const res =  getDataAPI(`/user/${id}`, auth.token);
      
      const res1 =  getDataAPI(`/user_posts/${id}`, auth.token);

      const users = await res;
      const posts = await res1;

      dispatch({ type: PROFILE_TYPES.GET_USER, payload: users.data });
      dispatch({ type: PROFILE_TYPES.GET_POSTS, payload: {...posts.data, _id: id, page: 2} });

      dispatch({ type: PROFILE_TYPES.LOADING, payload: false });
      
    } catch (err) {
      dispatch({ type: GLOBALTYPES.ALERT, payload: {error: err.response.data.msg} });
    }
  }



export const updateProfileUser = ({userData, picturePath, auth}) => async (dispatch) => {
  if(!userData.firstName){
    return dispatch({type: GLOBALTYPES.ALERT, payload: {error: "Please enter First Name."}})
  }
  if(!userData.lastName){
    return dispatch({type: GLOBALTYPES.ALERT, payload: {error: "Please enter Last Name."}})
  }

  if (userData.story.length > 200) {
    return dispatch({
      type: GLOBALTYPES.ALERT,
      payload: { error: "Story is too long." },
    });
  }

  try {
    let media;
    dispatch({
      type: GLOBALTYPES.ALERT,
      payload: { loading: true }
    });

    if(picturePath){
      media = await imageUpload([picturePath]);
    }

    const res = await patchDataAPI("user", { ...userData, picturePath: picturePath ? media[0].url : auth.user.picturePath }, auth.token);

    dispatch({
      type: GLOBALTYPES.AUTH,
      payload: {
        ...auth,
        user: {
          ...auth.user,
          ...userData,
          picturePath: picturePath ? media[0].url : auth.user.picturePath,
        },
      },
    });
   
    dispatch({
      type: GLOBALTYPES.ALERT,
      payload: { success: res.data.msg },
    });

  } catch (err) {
    dispatch({
      type: GLOBALTYPES.ALERT,
      payload: { error: err.response.data.msg },
    });
  }

};

export const follow = ({ users, user, auth, socket }) => async (dispatch) => {
  let newUser;
  if(users.every(item => item._id !== user._id )){
    newUser = { ...user, followers: [...user.followers, auth.user] };
  }else{
    users.forEach(item => {
      if(item._id === user._id){
        newUser = { ...item, followers: [...item.followers, auth.user] };
      }
    })
  }
   
  
  dispatch({ type: PROFILE_TYPES.FOLLOW, payload: newUser });

  dispatch({ type: GLOBALTYPES.AUTH, payload: { ...auth, user:{...auth.user, following: [...auth.user.following, newUser] } } });

  

  try {
    const res = await patchDataAPI(
      `/user/${user._id}/follow`,
      null,
      auth.token
    );
    // todo socket
    socket.emit("follow", res.data.newUser);

    // todo notification
    const msg = {
      id: auth.user._id,
      text: 'started following you',
      recipients: [newUser._id],
      url: `/profile/${auth.user._id}`,
    };

    dispatch(createNotify({ msg, auth, socket }));
  } catch (err) {
    dispatch({
      type: GLOBALTYPES.ALERT,
      payload: { error: err.response.data.msg },
    });
  }
};

export const unfollow = ({ users, user, auth, socket }) => async (dispatch) => {

    let newUser;
    if (users.every((item) => item._id !== user._id)) {
      newUser = {
        ...user,
        followers: DeleteData(user.followers, auth.user._id),
      };
    } else {
      users.forEach((item) => {
        if (item._id === user._id) {
          newUser = {
            ...item,
            followers: DeleteData(item.followers, auth.user._id),
          };
        }
      });
    }
  
  dispatch({ type: PROFILE_TYPES.UNFOLLOW, payload: newUser });

  dispatch({
    type: GLOBALTYPES.AUTH,
    payload: {
      ...auth,
      user: {
        ...auth.user,
        following: DeleteData(auth.user.following, newUser._id)
      },
    },
  });

  

  try {
    const res = await patchDataAPI(
      `/user/${user._id}/unfollow`,
      null,
      auth.token
    );

    // todo socket
    socket.emit("unFollow", res.data.newUser);

    // todo notification
    const msg = {
      id: auth.user._id,
      text: "started following you",
      recipients: [newUser._id],
      url: `/profile/${auth.user._id}`,
    };

    dispatch(removeNotify({ msg, auth, socket }));
    
  } catch (err) {
    dispatch({
      type: GLOBALTYPES.ALERT,
      payload: { error: err.response.data.msg },
    });
  }
};