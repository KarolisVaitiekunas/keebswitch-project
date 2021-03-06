import partModel from "../models/keyboardPart";
import { dbConnect } from "../utils/dbConnect";

export const updateParts = async (data) => {
  dbConnect();

  const DBparts = await partModel.find();
  const keys = Object.keys(data);

  let createNew;

  keys.forEach((element) => {
    data[element].forEach(async (part) => {
      createNew = DBparts.every((DBpart) => {
        if (part.productName === DBpart.productName) {
          return false;
        }
        return true;
      });
      if (createNew) {
        //if part doesnt exist in db create
        let newPart = new partModel(part);
        await newPart.save();
      }
    });
  });

  let DBpart_;

  DBparts.forEach((DBpart) => {
    let existsInNewData = false;
    let existingItemInNewData;
    keys.forEach(async (element) => {
      data[element].forEach(async (part) => {
        if (DBpart.productName === part.productName) {
          existsInNewData = true;
          existingItemInNewData = part;
        } else {
        }
        DBpart_ = DBpart;
      });

      if (existsInNewData === false) {
        //if it doesnt exist in upcoming data, delete from db
        await DBpart_.deleteOne();
      }
      if (existsInNewData) {
        await partModel.updateOne(
          { _id: DBpart_._id },
          { $set: { productPrice: existingItemInNewData.productPrice, availability: existingItemInNewData.availability } }
        );
      }
    });
  });
};

export const getParts = async (filterObject, sort) => {
  dbConnect();
  const parts = await partModel.find(filterObject).sort({ productPrice: sort });

  return parts;
};

export const getPartById = async (body) => {
  dbConnect();
  let parts = [];

  for (const part of body) {
    const _part = await partModel.findById(part.id);
    parts.push(_part);
  }

  return parts;
};
