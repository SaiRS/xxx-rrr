import lodable from '@loadable/component';

export const PlanEntry = lodable(
  /* webpackChunkName: "plan-entry" */ () => import('./plan-entry'),
);
