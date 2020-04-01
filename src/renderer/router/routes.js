import * as Constants from '../service/constants';

export default [
    {
        path: '/',
        name: Constants.PageName.main,
        components: require('@/pages/Main.vue'),
        children: [
            {
                path: Constants.PageName.bucketPage,
                name: Constants.PageName.bucketPage,
                components: require('@/pages/bucketPage.vue')
            },
            {
                path: Constants.PageName.setup,
                name: Constants.PageName.setup,
                components: require('@/pages/Setup.vue')
            }
        ]
    },
    {
        path: '/' + Constants.PageName.netdisk,
        name: Constants.PageName.netdisk,
        components: require('@/pages/netdisk/main.vue'),
        children: [
            {
                path: Constants.PageName.netdisk_enterprise,
                name: Constants.PageName.netdisk_enterprise,
                components: require('@/pages/netdisk/enterprise.vue')
            },
            {
                path: Constants.PageName.netdisk_personal,
                name: Constants.PageName.netdisk_personal,
                components: require('@/pages/netdisk/personal.vue')
            }
        ]
    },
    {
        path: '/' + Constants.PageName.login,
        name: Constants.PageName.login,
        components: require('@/pages/Login.vue')
    },
    {
        path: '/' + Constants.PageName.tray,
        name: Constants.PageName.tray,
        components: require('@/pages/Tray.vue'),
        meta: {hideTitle: true}
    },
    {
        path: '/' + Constants.PageName.about,
        name: Constants.PageName.about,
        components: require('@/pages/About'),
        meta: {hideTitle: true}
    }
];