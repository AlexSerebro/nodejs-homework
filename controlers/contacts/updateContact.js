const contacts = require("../../models/contacts");
const { createError } = require("../../helpers");
const { contactAddSchema } = require("../../schemas/schemas");

const updateContact = async (req, res, next) => {
  const { error } = contactAddSchema.validate(req.body);
  if (error) {
    throw createError(400, (message = "missing fields"));
  }
  const { contactId } = req.params;
  const result = await contacts.updateContact(contactId, req.body);
  if (!result) {
    throw createError(404);
  }

  res.status(200).json(result);
};

module.exports = updateContact;
