import {expect} from 'chai';
import {Item, readItems, createItem, readItem, updateItem, deleteItem}
  from '../src';
import freshDb from './fresh-db';

const getAllItems = length => {
  return readItems()
    .then(items => {
      expect(items).to.have.length(length);
      return items;
    });
};

describe('Testing Item', function () {
  this.timeout(20000); // eslint-disable-line no-invalid-this

  it(`data can be read from database`, freshDb(function () {
    return getAllItems(4)
      .then(items => {
        const [item1, item2, item3, item4] = items;

        expect(item1.title).to.equal('Great!');
        expect(item2.title).to.equal('Super!');
        expect(item3.title).to.equal('Yes!');
        expect(item4.title).to.equal('Cool!');
      });
  }));

  it(`An item can be created`, freshDb(function () {
    const data = {title: 'Amazing!'};

    return createItem(data)
      .then(item => {
        return getAllItems(5).then(items => {
          return {item, items};
        });
      })
      .then(({item, items}) => {
        const [item1, item2, item3, item4, item5] = items;

        expect(item1.title).to.equal('Great!');
        expect(item2.title).to.equal('Super!');
        expect(item3.title).to.equal('Yes!');
        expect(item4.title).to.equal('Cool!');
        expect(item5.title).to.equal('Amazing!');

        expect(item5._id).to.eql(item._id);
      });
  }));

  it(`An item can be read`, freshDb(function () {
    const item = new Item();
    item.title = 'Amazing!';

    return item.save()
      .then(res => readItem({_id: res._id}))
      .then(item1 => {
        expect(item1.title).to.equal('Amazing!');
        expect(item1._id).to.eql(item._id);
      });
  }));

  it(`An item can be updated`, freshDb(function () {
    return getAllItems(4)
      .then(items => updateItem(items[3], {title: 'Wicked!'}))
      .then(item => {
        expect(item.title).to.equal('Cool!');

        return getAllItems(4).then(items => {
          return {item, items};
        });
      })
      .then(({item, items}) => {
        const [item1, item2, item3, item4] = items;

        expect(item1.title).to.equal('Great!');
        expect(item2.title).to.equal('Super!');
        expect(item3.title).to.equal('Yes!');
        expect(item4.title).to.equal('Wicked!');
      });
  }));

  it(`An item can be deleted`, freshDb(function () {
    return getAllItems(4)
      .then(items => deleteItem(items[0]))
      .then(item => {
        expect(item.title).to.equal('Great!');

        return getAllItems(3).then(items => {
          return {item, items};
        });
      })
      .then(({item, items}) => {
        const [item1, item2, item3] = items;

        expect(item1.title).to.equal('Super!');
        expect(item2.title).to.equal('Yes!');
        expect(item3.title).to.equal('Cool!');
      });
  }));
});
