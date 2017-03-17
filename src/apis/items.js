import {Item} from '..';

export const readItems = query => {
  return Item.find(query);
};

export const createItem = data => {
  const title = data.title ? data.title : data;
  const item = new Item();
  item.title = title;
  return item.save();
};

export const readItem = item => {
  const _id = item._id ? item._id : item;
  return Item.findOne({_id});
};

export const updateItem = (item, data) => {
  const _id = item._id ? item._id : item;
  const cmd = data.$set ? data : {$set: data};
  return Item.findOneAndUpdate({_id}, cmd);
};

export const deleteItem = item => {
  const _id = item._id ? item._id : item;
  return Item.findOneAndRemove({_id});
};
