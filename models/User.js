const { Schema, model, Types } = require(`mongoose`);

const schema = new Schema({
    login: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    avatar: { type: String },
    files: [{ type: Types.ObjectId, ref: `File` }],
});
module.exports = model(`User`, schema);
