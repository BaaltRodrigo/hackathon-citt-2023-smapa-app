import { createStore } from "vuex";
// import AuthModule from "./auth";

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
};

export default createStore({
  state,
  mutations,
  actions,
  modules: {
    // auth: AuthModule,
  },
});
