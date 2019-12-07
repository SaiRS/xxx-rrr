import lodable from '@loadable/component';

export const AnalysisEntry = lodable(
  /* webpackChunkName: analysis-entry */ () => import('./analysis-entry'),
);
