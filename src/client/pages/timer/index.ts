import lodable from '@loadable/component';

export const TimerEntry = lodable(
  /* webpackChunkName: "timer-entry" */ () => import('./timer-entry'),
);
