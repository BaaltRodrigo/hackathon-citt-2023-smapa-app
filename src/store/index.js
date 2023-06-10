import {
  collection,
  getDocs,
  addDoc,
  doc,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../config/firebase";

import { createStore } from "vuex";
import HydrantsModule from "./hydrants";
import AuthModule from "./auth";

const state = {
  location: {},
};

const mutations = {
  setLocation(state, payload) {
    const { latitude, longitude } = payload.coords;
    state.location = { latitude, longitude };
  },
};

const actions = {
  async fetchLocation({ commit }) {
    // Get location from browser
    const location = await new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject);
    });

    // Commit location to state
    commit("setLocation", location);
  },

  async sendInvitation({ state }, payload) {
    // get invitations reference
    console.log("entered invitation");

    const invitationsRef = collection(db, "invitations");

    // add new invitation document
    console.log("saving invitation");

    const invitation = await addDoc(invitationsRef, {
      ...payload,
      used: false,
      created_at: serverTimestamp(),
    });

    // send invitation via email
    if (invitation) {
      console.log("invitation sent");
    }
  },
};

export default createStore({
  state,
  mutations,
  actions,
  modules: {
    hydrants: HydrantsModule,
    auth: AuthModule,
  },
});
