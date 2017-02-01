import { moduleForModel, test } from 'ember-qunit';

moduleForModel('group-task', 'Unit | Serializer | group task', {
  // Specify the other units that are required for this test.
  needs: ['serializer:group-task']
});

// Replace this with your real tests.
test('it serializes records', function(assert) {
  let record = this.subject();

  let serializedRecord = record.serialize();

  assert.ok(serializedRecord);
});
