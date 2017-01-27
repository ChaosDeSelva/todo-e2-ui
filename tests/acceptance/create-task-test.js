import { test } from 'qunit';
import moduleForAcceptance from 'task-manager/tests/helpers/module-for-acceptance';

moduleForAcceptance('Acceptance | create task');

const ENTER = {keyCode: 13};
const DOWN_ARROW = {keyCode: 40};

test('visiting /', function(assert) {
  visit('/');

  andThen(function() { console.log(currentURL());
    assert.equal(currentURL(), '/');

    andThen(() => {
      var displayValue = 'Portland';

      fillIn('#taskName', 'Portland');

      for (let i = 0; i < displayValue.length; ++i) {
        triggerEvent('#taskName', 'keydown', {keyCode: displayValue.charCodeAt(i)});
      }
      Ember.run.later(function () {
        triggerEvent('#taskName', 'keydown', DOWN_ARROW);
        triggerEvent('#taskName', 'keydown', ENTER);
        andThen(() => {
          assert.equal(find('#taskName').val(), 'Portland, OR, United States');

        });
      }, 1000);
    });
  });
});
