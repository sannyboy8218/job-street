import User from "../models/User.js";

const create = async (userData) => {
  return await User.create(userData);
};

const findByEmail = async (email) => {
  return await User.findOne({ email });
};
const findById = async (id) => {
  return await User.findById(id).select("-password");
};
export default {
  create,
  findByEmail,
  findById
};