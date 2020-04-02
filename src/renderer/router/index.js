import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './routes';
import * as Constants from '../service/constants';

Vue.use(VueRouter)

import PasteImageService from "../service/pasteImageService";

const pasteImageService = new PasteImageService();

export const router = new VueRouter({
  //mode: 'history',
  //base: process.env.BASE_URL,
  scrollBehavior: () => ({ y: 0 }),
  routes
})



/* router.beforeEach((to, from, next) => {
  ViewUI.LoadingBar.start(); //全局页面加载条-开始
  Util.title(to.meta.title);
  var name = to.name;
  if (Cookies.get('locking') == '1' && name !== 'locking') {
    // 判断当前是否是锁定状态
    next({
      replace: true,
      name: 'locking'
    });
  } else if (Cookies.get('locking') == '0' && name == 'locking') {
    next(false);
  } else {
    // 白名单
    var whiteList = name != 'login' && name != 'regist' && name != 'regist-result' && name != 'relate' && name != 'reset' && name != 'authorize' && name != 'shareInfo';

    if (!Cookies.get('userInfo') && whiteList) {
      // 判断是否已经登录且前往的页面不是登录页
      next({
        name: 'login'
      });
    } else if (Cookies.get('userInfo') && name == 'login') {
      // 判断是否已经登录且前往的是登录页
      console.log(Cookies.get('userInfo'));
      Util.title();
      next({
        name: 'home_index'
      });
    } else {
      Util.toDefaultPage([...routers], name, router, next);
    }
  }
}); */


/* router.afterEach((to) => {
  Util.openNewPage(router.app, to.name, to.params, to.query);
  ViewUI.LoadingBar.finish(); //全局页面加载条-结束
  window.scrollTo(0, 0);
});
 */
router.afterEach((to, from) => {
  if (to.meta && to.meta.hideTitle) {
    document.getElementById('title') && document.getElementById('title').remove();
  }
  if (to.name === Constants.PageName.login) {
    pasteImageService.setEnable(false);
  } else {
    pasteImageService.setEnable(true);
  }
});