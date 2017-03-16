import {expect} from 'chai';
import {Item} from '../src';

describe('Testing Item', function () {
  it(`Database can be accessed`, function (done) {
    Item.find({}, (err, items) => {
      expect(err).to.be.null;
      expect(items).to.have.length(0);
      done();
    });
  });

  it(`An item can be created`, function (done) {
    const item = new Item();
    item.title = 'Some title';

    item.save(err => {
      expect(err).to.be.null;
      done();
    });
  });

  it(`An item can be read`, function (done) {
    const item = new Item();
    item.title = 'Some other title';

    item.save(err => {
      expect(err).to.be.null;

      Item.find({_id: item._id}, (err, items) => {
        expect(err).to.be.null;
        expect(items).to.have.length(1);

        const {_id, title} = items[0];
        expect({_id, title}).to.eql({
          _id: item._id,
          title: item.title,
        });
        done();
      });
    });
  });

  it(`An item can be updated`, function (done) {
    const item = new Item();
    item.title = 'Another title';

    item.save(err => {
      expect(err).to.be.null;

      Item.update({_id: item._id}, {$set: {
        title: 'A new title',
      }}, err => {
        expect(err).to.be.null;

        Item.find({_id: item._id}, (err, items) => {
          expect(err).to.be.null;
          expect(items[0].title).to.equal('A new title');
          done();
        });
      });
    });
  });

  it(`An item can be deleted`, function (done) {
    const item = new Item();
    item.title = 'And another title';

    item.save(err => {
      expect(err).to.be.null;

      Item.find({}, (err, items) => {
        expect(err).to.be.null;

        const len = items.length;

        Item.remove({_id: item._id}, err => {
          expect(err).to.be.null;

          Item.find({}, (err, items) => {
            expect(err).to.be.null;
            expect(items.length).to.equal(len - 1);
            done();
          });
        });
      });
    });
  });
});
