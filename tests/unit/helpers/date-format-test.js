
import { dateFormat } from 'task-manager/helpers/date-format';
import { module, test } from 'qunit';

module('Unit | Helper | date format');

test('Format Date', function(assert) {
  let date = "588aa63ded0c79d06633d90f";
  let formattedDate = dateFormat([date]);
  assert.equal(formattedDate, 'Thu Jan 26 2017 17:45:33 GMT-0800 (PST)');
});
