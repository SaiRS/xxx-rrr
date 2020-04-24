import { _IBTimingProjectProfile, _IBTimingProject } from './project-types';

export interface _IBTimingTask {
  self: string; // "\/time-entries\/1",
  start_date: string; // "2019-01-01T00:00:00.000000+00:00",
  end_date: string; // "2019-01-01T01:00:00.000000+00:00",
  duration: number; // 时长，单位(s)
  title: string;
  notes: string;
  is_running: boolean;
  project: _IBTimingProjectProfile | _IBTimingProject;
}
