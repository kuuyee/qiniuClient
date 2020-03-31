import Main from '@/views/Main.vue';

// 不作为Main组件的子页面展示的页面单独写，如下
export const loginRouter = {
    path: '/login',
    name: 'login',
    meta: {
        title: '登录 - GoMK智能检修管理平台 '
    },
    component: () => import('@/views/login/main.vue')
};

export const page403 = {
    path: '/403',
    meta: {
        title: '403-权限不足'
    },
    name: 'error-403',
    component: () => import('@/views/error-page/403.vue')
};

export const page500 = {
    path: '/500',
    meta: {
        title: '500-服务端错误'
    },
    name: 'error-500',
    component: () => import('@/views/error-page/500.vue')
};

// 动态路由 作为Main组件的子页面展示但是不在左侧菜单显示的路由写在otherRouter里
export const otherRouter = {
    path: '/',
    name: 'otherRouter',
    redirect: '/home',
    component: Main,
    children: [
        { path: 'home', title: { i18n: 'home' }, name: 'home_index', component: () => import('@/views/home/home.vue') },
        { path: 'ownspace', title: '个人中心', name: 'ownspace_index', component: () => import('@/views/layout/own-space/own-space.vue') },
        { path: 'change-pass', title: '修改密码', name: 'change_pass', component: () => import('@/views/layout/change-pass/change-pass.vue') },
        { path: 'message', title: '消息中心', name: 'message_index', component: () => import('@/views/layout/message/message.vue') },
        { path: 'ptb-edit', title: '任务书编辑', name: 'ptb_edit', component: () => import('@/views/oh-plan/ptb/edit.vue') },
        { path: 'leave', title: '请假申请', name: 'leave', component: () => import('@/views/activiti/business/leave.vue') },
    ]
};
export const shareInfo = {
    path: '/share/info/:randomcode',
    name: 'shareInfo',
    component: () => import('@/views/netdisk/share/info.vue'),
    meta: {
        title: 'share-网盘分享内容查看',
    }
};

export const locking = {
    path: '/locking',
    name: 'locking',
    component: () => import('@/views/layout/lockscreen/components/locking-page.vue')
};

export const appRouter = [];

// 所有上面定义的路由都要写在下面的routers里
export const routers = [
    loginRouter,
    //registRouter,
    //registResult,
    //reset,
    //relateRouter,
    //authorizeRouter,
    otherRouter,    //动态路由存在这里
    shareInfo,      //分享查看
    locking,
    ...appRouter,
    page500,
    page403
];
