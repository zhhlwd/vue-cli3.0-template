import * as type from './mutations_types';
import http from '@api/http';
import requestConfig from '@api/index';

export default {
  namespaced: true,
  state: {
    token: localStorage.getItem('token') || '',
    user: JSON.parse(localStorage.getItem('userDate')) || {}
  },
  mutations: {
    [type.LOGIN](state, data) {
      let userDate = data.data;
      state.token = userDate.token;
      state.user = userDate;
      localStorage.setItem('token', userDate.token);
      localStorage.setItem(
        'userDate',
        JSON.stringify(userDate)
      );
    }
  },
  actions: {
    async login(state, data) {
      try {
        requestConfig.login.data = {
          username: data.username,
          password: data.password
        };
        let res = await http(requestConfig.login);
        state.commit(type.LOGIN, res);
        setTimeout(() => {
          const redirect =
            data.$route.query.redirect || '/';
          data.$router.replace({
            path: redirect
          });
        }, 3000);
      } catch (error) {}
    }
  },
  getters: {
    token(state) {
      return state.token;
    },
    user(state) {
      console.log('state', state);
      return state.user;
    }
  }
};
