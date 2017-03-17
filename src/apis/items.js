import {Item} from '..';

export const readItems = query => {
  return Item.find(query);
};

export const createItem = data => {
  return Item.save(data);
};

export const readItem = item => {
  const _id = item._id ? item._id : item;
  const [item0] = Item.find({_id}, projection);
  return item0;
};

export const updateItem = (item, data) => {
  const _id = item._id ? item._id : item;
  return Item.update({_id}, data);
};

export const deleteItem = item => {
  const _id = item._id ? item._id : item;
  return Item.remove({_id});
};
