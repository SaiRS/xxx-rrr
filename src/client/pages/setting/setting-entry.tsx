import * as React from 'react';
import { Switch, Route, RouteComponentProps, Redirect } from 'react-router';
import { TagsSettingPage } from './sub-pages/tags-setting';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import ModuleStyle from './style.module.scss';

interface Props {}
export default function SettingEntry(
  props: Props & RouteComponentProps,
): React.ReactElement {
  return (
    <div className={classNames('w-full', 'h-full', 'flex', 'flex-col')}>
      <div className={classNames(ModuleStyle['header'])}>
        <Link to={`${props.match.path}/tags`}>标签管理</Link>
        <Link to={`${props.match.path}/projects`}>项目管理</Link>
      </div>
      <div className={classNames(ModuleStyle['body'])}>
        <Switch>
          <Route
            path={`${props.match.path}/tags`}
            component={TagsSettingPage}
          ></Route>
          <Redirect to={`${props.match.path}/tags`}></Redirect>
        </Switch>
      </div>
    </div>
  );
}
