import { moduleForModel, test } from 'ember-qunit';

moduleForModel('task', 'Unit | Model | task', {
  // Specify the other units that are required for this test.
  needs: []
});

test('Model Schema Valid Expectation', function(assert) {
  assert.expect(4)

  let model = this.subject({id: 1, name:"Clean House", Summary: "With Sweeper", completed: false });

  assert.equal(model.get('id'), 1);
  assert.equal(model.get('name'), "Clean House");
  assert.equal(model.get('Summary'), "With Sweeper");
  assert.equal(model.get('completed'), false);
});
