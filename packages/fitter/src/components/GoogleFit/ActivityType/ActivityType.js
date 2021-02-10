import { h } from 'preact';

const TYPES = {
  7: 'walk',
  8: 'run',
  unknown: 'activity'
};

const ActivityType = ({ type }) => <div>{TYPES[type] || TYPES.unknown}</div>;

export default ActivityType;
