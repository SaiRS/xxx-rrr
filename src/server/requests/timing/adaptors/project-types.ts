/**
 * timing返回的项目信息(简单形式)
 * @export
 * @interface _IBTimingProjectProfile
 */
export interface _IBTimingProjectProfile {
  self: string; // 格式为/projects/{{projectId}}
}

/**
 * timing返回的项目信息
 * @interface _IBTimingProject
 */
export interface _IBTimingProject extends _IBTimingProjectProfile {
  title: string;
  title_chain: string[]; // 该project和该project以上的所有层级的project的title
  color: string; // #RRGGBB
  productivity_score: number; // 生产力分数，取值范围[-1, 1]
  is_archived: boolean; // 是否已完成
  parent: _IBTimingProjectProfile | null;
  children: _IBTimingProjectProfile[];
}
