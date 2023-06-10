import { collection, getDocs, setDoc, doc } from "firebase/firestore";
import { db } from "../config/firebase";

const state = {
  hydrants: [],
  hydrant: {},
};

const mutations = {
  addHydrant(state, payload) {
    state.hydrants.push(payload);
  },

  setHydrant(state, payload) {
    state.hydrant = payload;
  },

  updateHydrant(state, payload) {
    // find index of hydrant to update
    const index = state.hydrants.findIndex(
      (hydrant) => hydrant.id === payload.id
    );
    // update hydrant
    state.hydrants[index] = payload;
  },
};

const actions = {
  async fetchHydrants({ state, commit }) {
    // hydrants reference and snapshot
    const hydrantsRef = collection(db, "hidrants"); // change to hydrants when ready
    const hydrantsSnapshot = await getDocs(hydrantsRef);

    // save hydrants values to state
    hydrantsSnapshot.docs.forEach((doc) => {
      // console.log({
      //   ...doc.data(),
      //   id: doc.id,
      // });
      commit("addHydrant", { ...doc.data(), id: doc.id });
    });
  },

  async updateHydrant({ commit }, payload) {
    // hydrants reference and snapshot
    console.log(payload);
    const hydrantsRef = doc(db, "hidrants", payload.id);
    // Set with merge to not overwrite existing data
    const hydrant = await setDoc(hydrantsRef, payload, { merge: true });

    if (hydrant) {
      console.log("hydrant updated");
    }

    // save hydrants values to state
    commit("updateHydrant", payload);
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
