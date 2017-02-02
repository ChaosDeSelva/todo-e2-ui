import DS from 'ember-data';

export default DS.RESTSerializer.extend({
    primaryKey: '_id',
    normalizeFindAllResponse(store, type, payload) {
        return {
            data: {
                id: payload._id,
                type: payload.name
            }
        };
    }
});
