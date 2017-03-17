import {expect} from 'chai';
import {Item} from '../src';
import freshDb from './fresh-db';

const getAllItems = length => {
  return Item.find()
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
    const item = new Item();
    item.title = 'Amazing!';

    return item.save()
      .then(() => getAllItems(5))
      .then(items => {
        const [item1, item2, item3, item4, item5] = items;

        expect(item1.title).to.equal('Great!');
        expect(item2.title).to.equal('Super!');
        expect(item3.title).to.equal('Yes!');
        expect(item4.title).to.equal('Cool!');
        expect(item5.title).to.equal('Amazing!');

        expect(item5._id).to.eql(item._id);
      });
  }));

  it(`An item can be updated`, freshDb(function () {
    return getAllItems(4)
      .then(items => items[3].update({$set: {title: 'Wicked!'}}))
      .then(() => getAllItems(4))
      .then(items => {
        const [item1, item2, item3, item4] = items;

        expect(item1.title).to.equal('Great!');
        expect(item2.title).to.equal('Super!');
        expect(item3.title).to.equal('Yes!');
        expect(item4.title).to.equal('Wicked!');
      });
  }));

  it(`An item can be deleted`, freshDb(function () {
    return getAllItems(4)
      .then(items => items[0].remove())
      .then(() => getAllItems(3))
      .then(items => {
        const [item1, item2, item3] = items;

        expect(item1.title).to.equal('Super!');
        expect(item2.title).to.equal('Yes!');
        expect(item3.title).to.equal('Cool!');
      });
  }));
});
