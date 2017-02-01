export default function shareme(groupsInTask, store) {
    var listOfGroups = [];

    if (typeof groupsInTask !== 'undefined') {
      for (var i = 0; i < groupsInTask.length; i++) {
        var record = store.peekRecord('group', groupsInTask[i]);
        if (typeof record !== 'undefined') {
          listOfGroups.pushObject(record);
        }
      }
    }

    return listOfGroups;
}
