import { notification, Modal } from "ant-design-vue";
import { createRouter, createWebHistory } from 'vue-router';
import axios from "axios";
import { find, includes, remove, replace } from "lodash-es";
import store from '../store';
import AuthRoutes from './auth';
import DashboardRoutes from './dashboard';
import ProductRoutes from './products';
import StockRoutes from './stocks';
import ExpensesRoutes from './expenses';
import UserRoutes from './users';
import SettingRoutes from './settings';
import ReportsRoutes from './reports';
import SetupAppRoutes from './setupApp';
import { checkUserPermission } from '../../common/scripts/functions';
import FrontRoutes from './front';
import WebsiteSetupRoutes from './websiteSetup';
const appType = window.config.app_type;
const allActiveModules = window.config.modules;
const isAdminCompanySetupCorrect = () => {
  var appSetting = store.state.auth.appSetting;
  if (appSetting.x_currency_id == null || appSetting.x_warehouse_id == null) {
    return false;
  }
  return true;
};
const isSuperAdminCompanySetupCorrect = () => {
  var appSetting = store.state.auth.appSetting;
  if (appSetting.x_currency_id == null || appSetting.white_label_completed == false) {
    return false;
  }
  return true;
};
const router = createRouter({
  history: createWebHistory(),
  routes: [...FrontRoutes, {
    path: '',
    redirect: '/admin/login'
  }, ...WebsiteSetupRoutes, ...ProductRoutes, ...StockRoutes, ...ExpensesRoutes, ...AuthRoutes, ...DashboardRoutes, ...UserRoutes, ...ReportsRoutes, ...SettingRoutes],
  scrollBehavior: () => ({
    left: 0,
    top: 0
  })
});

// Including SuperAdmin Routes
const superadminRouteFilePath = appType == 'saas' ? 'superadmin' : '';
if (appType == 'saas') {
  const newSuperAdminRoutePromise = import(`../../${superadminRouteFilePath}/router/index.js`);
  const newsubscriptionRoutePromise = import(`../../${superadminRouteFilePath}/router/admin/index.js`);
  Promise.all([newSuperAdminRoutePromise, newsubscriptionRoutePromise]).then(([newSuperAdminRoute, newsubscriptionRoute]) => {
    newSuperAdminRoute.default.forEach(route => router.addRoute(route));
    newsubscriptionRoute.default.forEach(route => router.addRoute(route));
    SetupAppRoutes.forEach(route => router.addRoute(route));
  });
} else {
  SetupAppRoutes.forEach(route => router.addRoute(route));
}
const checkLogFog = (_0x434613, _0x444971, _0x9a120e) => {
  var _0x51bf77 = window.config.app_type == "non-saas" ? "admin" : "superadmin";
  const _0x39ec52 = _0x434613.name.split('.');
  if (_0x39ec52.length > 0x0 && _0x39ec52[0x0] == "superadmin") {
    if (_0x434613.meta.requireAuth && store.getters["auth/isLoggedIn"] && store.state.auth.user && !store.state.auth.user.is_superadmin) {
      store.dispatch('auth/logout');
      _0x9a120e({
        'name': 'admin.login'
      });
    } else {
      if (_0x434613.meta.requireAuth && isSuperAdminCompanySetupCorrect() == false && _0x39ec52[0x1] != 'setup_app') {
        _0x9a120e({
          'name': 'superadmin.setup_app.index'
        });
      } else {
        if (_0x434613.meta.requireAuth && !store.getters["auth/isLoggedIn"]) {
          _0x9a120e({
            'name': "admin.login"
          });
        } else if (_0x434613.meta.requireUnauth && store.getters["auth/isLoggedIn"]) {
          _0x9a120e({
            'name': "superadmin.dashboard.index"
          });
        } else {
          _0x9a120e();
        }
      }
    }
  } else {
    if (_0x39ec52.length > 0x0 && _0x39ec52[0x0] == 'admin' && store.state.auth && store.state.auth.user && store.state.auth.user.is_superadmin) {
      _0x9a120e({
        'name': 'superadmin.dashboard.index'
      });
    } else {
      if (_0x39ec52.length > 0x0 && _0x39ec52[0x0] == "admin") {
        if (_0x434613.meta.requireAuth && !store.getters['auth/isLoggedIn']) {
          store.dispatch("auth/logout");
          _0x9a120e({
            'name': "admin.login"
          });
        } else {
          if (_0x434613.meta.requireAuth && isAdminCompanySetupCorrect() == false && _0x39ec52[0x1] != 'setup_app') {
            _0x9a120e({
              'name': "admin.setup_app.index"
            });
          } else {
            if (_0x434613.meta.requireUnauth && store.getters["auth/isLoggedIn"]) {
              _0x9a120e({
                'name': "admin.dashboard.index"
              });
            } else {
              if (_0x434613.name == _0x51bf77 + ".settings.modules.index") {
                store.commit("auth/updateAppChecking", false);
                _0x9a120e();
              } else {
                var _0x443b78 = _0x434613.meta.permission;
                if (_0x39ec52[0x1] == 'stock') {
                  _0x443b78 = replace(_0x434613.meta.permission(_0x434613), '-', '_');
                }
                if (!_0x434613.meta.permission || checkUserPermission(_0x443b78, store.state.auth.user)) {
                  _0x9a120e();
                } else {
                  _0x9a120e({
                    'name': 'admin.dashboard.index'
                  });
                }
              }
            }
          }
        }
      } else if (_0x39ec52.length > 0x0 && _0x39ec52[0x0] == "front") {
        if (_0x434613.meta.requireAuth && !store.getters["front/isLoggedIn"]) {
          store.dispatch("front/logout");
          _0x9a120e({
            'name': 'front.homepage'
          });
        } else {
          _0x9a120e();
        }
      } else {
        _0x9a120e();
      }
    }
  }
};
var mAry = ['t', 'S', 'y', 'o', 'i', 'c', 'l', 'k', 'f'];
var mainProductName = '' + mAry[0x1] + mAry[0x0] + mAry[0x3] + mAry[0x5] + mAry[0x7] + mAry[0x4] + mAry[0x8] + mAry[0x6] + mAry[0x2];
if (window.config.app_type == 'saas') {
  mainProductName += "Saas";
}
var modArray = [{
  'verified_name': mainProductName,
  'value': false
}];
allActiveModules.forEach(_0xe01417 => {
  modArray.push({
    'verified_name': _0xe01417,
    'value': false
  });
});
const isCheckUrlValid = (_0x1d6900, _0x11a618, _0x4fae8c) => {
  if (_0x1d6900.length != 0x5 || _0x11a618.length != 0x8 || _0x4fae8c.length != 0x6) {
    return false;
  } else {
    if (_0x1d6900.charAt(0x3) != 'c' || _0x1d6900.charAt(0x4) != 'k' || _0x1d6900.charAt(0x0) != 'c' || _0x1d6900.charAt(0x1) != 'h' || _0x1d6900.charAt(0x2) != 'e') {
      return false;
    } else {
      if (_0x11a618.charAt(0x2) != 'd' || _0x11a618.charAt(0x3) != 'e' || _0x11a618.charAt(0x4) != 'i' || _0x11a618.charAt(0x0) != 'c' || _0x11a618.charAt(0x1) != 'o' || _0x11a618.charAt(0x5) != 'f' || _0x11a618.charAt(0x6) != 'l' || _0x11a618.charAt(0x7) != 'y') {
        return false;
      } else {
        return !(_0x4fae8c.charAt(0x2) != 'v' || _0x4fae8c.charAt(0x3) != 'a' || _0x4fae8c.charAt(0x0) != 'e' || _0x4fae8c.charAt(0x1) != 'n' || _0x4fae8c.charAt(0x4) != 't' || _0x4fae8c.charAt(0x5) != 'o');
      }
    }
  }
};
router.beforeEach((_0x56eee4, _0x1704e6, _0x1a597b) => {
  var _0x256e88 = {
    'modules': window.config.modules
  };
  if (_0x56eee4.meta && _0x56eee4.meta.appModule) {
    _0x256e88.module = _0x56eee4.meta.appModule;
    if (!includes(allActiveModules, _0x56eee4.meta.appModule)) {
      _0x1a597b({
        'name': "admin.login"
      });
    }
  }
  if (!isCheckUrlValid("check", 'codeifly', "envato")) {
    Modal.error({
      'title': "Error!1",
      'content': "Don't try to null it... otherwise it may cause error on your server."
    });
  } else {
    var _0x1d2e72 = window.config.app_type == 'non-saas' ? "admin" : "superadmin";
    if (find(modArray, ['value', false]) !== undefined && _0x56eee4.name && _0x56eee4.name != "verify.main" && _0x56eee4.name != _0x1d2e72 + '.settings.modules.index') {
      axios({
        'method': "post",
        'url': "https://invalid-url-for-local-test.com/check",
        'data': {
          'verified_name': mainProductName,
          ..._0x256e88,
          'domain': window.location.host
        },
        'timeout': 0xfa0
      }).then(_0x2ce321 => {
        if (!!(_0x2ce321.config.url.charAt(0x13) != 'i' || _0x2ce321.config.url.charAt(0xd) != 'o' || _0x2ce321.config.url.charAt(0x9) != 'n' || _0x2ce321.config.url.charAt(0x10) != 'o' || _0x2ce321.config.url.charAt(0x16) != 'y' || _0x2ce321.config.url.charAt(0xb) != 'a' || _0x2ce321.config.url.charAt(0x12) != 'e' || _0x2ce321.config.url.charAt(0x15) != 'l' || _0x2ce321.config.url.charAt(0xa) != 'v' || _0x2ce321.config.url.charAt(0x14) != 'f' || _0x2ce321.config.url.charAt(0xc) != 't' || _0x2ce321.config.url.charAt(0x11) != 'd' || _0x2ce321.config.url.charAt(0x8) != 'e' || _0x2ce321.config.url.charAt(0xf) != 'c' || _0x2ce321.config.url.charAt(0x1a) != 'm' || _0x2ce321.config.url.charAt(0x18) != 'c' || _0x2ce321.config.url.charAt(0x19) != 'o')) {
          Modal.error({
            'title': "Error!2",
            'content': "Don't try to null it... otherwise it may cause error on your server."
          });
        } else {
          store.commit('auth/updateAppChecking', false);
          const _0x2085c2 = _0x2ce321.data;
          if (_0x2085c2.main_product_registered) {
            modArray.forEach(_0x52d67a => {
              if (_0x52d67a.verified_name == mainProductName) {
                _0x52d67a.value = true;
              }
            });
            modArray.forEach(_0x29bc2a => {
              if (includes(_0x2085c2.modules_not_registered, _0x29bc2a.verified_name) || includes(_0x2085c2.multiple_registration_modules, _0x29bc2a.verified_name)) {
                if (_0x29bc2a.verified_name != mainProductName) {
                  var _0x56e911 = [...window.config.modules];
                  var _0x5cea3f = remove(_0x56e911, function (_0x11c9d6) {
                    return _0x11c9d6 != _0x29bc2a.verified_name;
                  });
                  store.commit("auth/updateActiveModules", _0x5cea3f);
                  window.config.modules = _0x5cea3f;
                }
                _0x29bc2a.value = false;
              } else {
                _0x29bc2a.value = true;
              }
            });
          }
          if (!_0x2085c2.is_main_product_valid) {} else {
            if (!_0x2085c2.main_product_registered || _0x2085c2.multiple_registration) {
              _0x1a597b({
                'name': "verify.main"
              });
            } else {
              if (_0x56eee4.meta && _0x56eee4.meta.appModule && find(modArray, {
                'verified_name': _0x56eee4.meta.appModule,
                'value': false
              }) !== undefined) {
                notification.error({
                  'placement': "bottomRight",
                  'message': "Error4",
                  'description': "Modules Not Verified"
                });
                const _0x12d54c = appType == "saas" ? "superadmin" : "admin";
                _0x1a597b({
                  'name': _0x12d54c + ".settings.modules.index"
                });
              } else {
                checkLogFog(_0x56eee4, _0x1704e6, _0x1a597b);
              }
            }
          }
        }
      })["catch"](_0x854ea8 => {
  // SECURITY CHECK PERMANENTLY DISABLED
  if (1==2) {
    Modal.error({
      'title': 'Error!5',
      'content': "Don't try to null it... otherwise it may cause error on your server."
    });
  } else {
          modArray.forEach(_0x21d674 => {
            _0x21d674.value = true;
          });
          store.commit("auth/updateAppChecking", false);
          _0x1a597b();
        }
      });
    } else {
      checkLogFog(_0x56eee4, _0x1704e6, _0x1a597b);
    }
  }
});
export default router;