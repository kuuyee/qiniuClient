/**
 * Created by zhangweiwei on 2017/2/28.
 */
import * as types from '../mutation-types';

export default {
    state: {
        app: {
            name: '',               //cos name
            buckets_info: [],       //bucket对象列表
            //计划中...
            datas: [],              //TODO: 上传/下载日志列表
            access_token:'',
            user_info:{},
            user_roles:[],
        }

    },
    mutations: {
        [types.app.buckets_info](state, value) {
            state.app.buckets_info = value;
        },
        [types.app.a_update_buckets_info](state, value) {
            state.app.buckets_info.forEach((item, index) => {
                if (item.name === value.name) {
                    state.app.buckets_info[index].permission = value.permission;
                }
            });
        },
        [types.app.name](state, value) {
            state.app.name = value;
        },
        [types.app.datas](state, value) {
            state.app.datas = value;
        },
        [types.app.access_token](state, value) {
            state.app.access_token = value;
        },
        [types.app.user_info](state, value) {
            state.app.user_info = value;
        },
        [types.app.user_roles](state, value) {
            state.app.user_roles = value;
        },
    },
    actions: {
        [types.app.a_buckets_info](context, value) {
            context.commit(types.app.buckets_info, value);
        },
        [types.app.a_update_buckets_info](context, value) {
            context.commit(types.app.a_update_buckets_info, value);
        },
        [types.app.a_name](context, value) {
            context.commit(types.app.name, value);
        },
        [types.app.a_datas](context, value) {
            context.commit(types.app.datas, value);
        },
        [types.app.access_token](context, value) {
            context.commit(types.app.access_token, value);
        },
        [types.app.user_info](context, value) {
            context.commit(types.app.user_info, value);
        },
        [types.app.user_roles](context, value) {
            context.commit(types.app.user_roles, value);
        },
    },
    getters: {
        [types.app.buckets_info](state) {
            return state.app.buckets_info;
        },
        [types.app.name](state) {
            return state.app.name;
        },
        [types.app.datas](state) {
            return state.app.datas;
        },
        [types.app.access_token](state) {
            return state.app.access_token;
        },
        [types.app.user_info](state) {
            return state.app.user_info;
        },
        [types.app.user_roles](state) {
            return state.app.user_roles;
        },
    }
};