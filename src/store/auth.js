import { doc, getDoc, setDoc, collection, addDoc } from "firebase/firestore";
import { auth, db } from "../config/firebase";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";

const state = {
  user: null,
  token: null,
  collection: "users",
};

const mutations = {
  setUser(state, user) {
    state.user = user;
  },
  setToken(state, token) {
    state.token = token;
  },
};

const actions = {
  async login({ commit, dispatch }, { email, password }) {
    const user = await signInWithEmailAndPassword(auth, email, password);
    const token = await user.user.getIdToken();
    console.log("store", user);
    commit("setUser", user);
    commit("setToken", token);
    // dispatch("updateUserToFirebase", user);
  },

  async registration({ rootState, commit, dispatch }, { email, password }) {
    const user = await createUserWithEmailAndPassword(auth, email, password);
    const token = await user.user.getIdToken();
    commit("setUser", user);
    commit("setToken", token);
    const { invitation } = rootState;
    // console.log(invitation);
    dispatch("updateUserToFirebase", {
      email: invitation.email,
      invitation: invitation.id,
      institution: invitation.institution,
    });
  },

  /**
   * As soon as the user is logged in, we need to update the user in the database
   * In the case that the user is a new user, we create a new user instead
   * of update an existing one.
   */
  async updateUserToFirebase({ state }, user) {
    console.log(user);
    const userRef = collection(db, "users"); // This may be null
    const userDoc = await addDoc(userRef, user);

    // console.log(user);
  },
};

export default {
  namespaced: true,
  actions,
  mutations,
  state,
};
