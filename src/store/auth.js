import { doc, getDoc, setDoc } from "firebase/firestore";
import { auth, db } from "../config/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

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

  /**
   * As soon as the user is logged in, we need to update the user in the database
   * In the case that the user is a new user, we create a new user instead
   * of update an existing one.
   */
  async updateUserToFirebase({ state }, user) {
    const userRef = doc(db, state.collection, user.uid); // This may be null
    const userDoc = await getDoc(userRef);

    // No user, create a new one
    if (!userDoc.exists()) {
      await setDoc(userRef, {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
        // photoURL: user.photoURL // This is not available for all providers
      });
    } else {
      // The user exists, update it
      // Email will never be updated
      await updateDoc(userRef, {
        displayName: user.displayName,
      });
    }

    console.log(user);
  },
};

export default {
  namespaced: true,
  actions,
  mutations,
  state,
};
