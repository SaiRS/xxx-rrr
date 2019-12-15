import lodable from '@loadable/component';

export const SettingEntry = lodable(
  /* webpackChunkName: "setting-entry" */ () => import('./setting-entry'),
);
