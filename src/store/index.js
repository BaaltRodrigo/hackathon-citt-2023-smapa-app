import {
  collection,
  getDoc,
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
  invitation: {},
};

const mutations = {
  setLocation(state, payload) {
    const { latitude, longitude } = payload.coords;
    state.location = { latitude, longitude };
  },

  setInvitation(state, payload) {
    state.invitation = payload;
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

  async fetchInvitation({ commit }, payload) {
    // get invitation reference
    const invitationRef = doc(db, "invitations", payload);

    // get invitation document
    const invitationSnapshot = await getDoc(invitationRef);

    if (!invitationSnapshot.exists()) {
      console.log("invitation does not exist");
      return;
    }

    // save invitation values to state
    commit("setInvitation", {
      ...invitationSnapshot.data(),
      id: invitationSnapshot.id,
    });
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
      // get invitation id
      // const { id } = invitation;
      // transport.sendMail({
      //   ...mailOptions,
      //   html: `<a href="http://localhost:8080/invitation/${id}">Haz click aqui para aceptar la invitacion</a>`,
      // });
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
