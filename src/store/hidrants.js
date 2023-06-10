import { db } from "../firebase";

const state = {
  hydrants: [],
};

const mutations = {
  setHydrants(state, payload) {
    state.hydrants = payload;
  },
};

const actions = {
  async fetchHydrants({ commit }) {
    // hydrants reference and snapshot
    const hydrantsRef = collection(db, "hydrants");
    const hydrantsSnapshot = await getDocs(hydrantsRef);

    console.log(hydrantsSnapshot);
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
