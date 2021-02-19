const isTestStartEvent = (event) => event.name === 'test_fn_start';
const isTestEndEvent = (event) => event.name === 'test_done';
const isTestFailureEvent = (event) => event.name === 'test_fn_failure';
const isTestsEndEvent = (event) => event.name === 'teardown';
const getTestID = (event) => {
  let id = event.name;

  if (event.parent && event.parent.name !== 'ROOT_DESCRIBE_BLOCK') {
    const parentID = getTestID(event.parent);
    id = `${parentID}/${id}`;
  }

  return id;
};

module.exports = {
  isTestStartEvent,
  isTestEndEvent,
  isTestFailureEvent,
  isTestsEndEvent,
  getTestID
};
