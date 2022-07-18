const express = require("express");

const controlers = require("../../controlers/contacts");

const router = express.Router();

const { cntrWrapper } = require("../../helpers");

router.get("/", cntrWrapper(controlers.listContacts));

router.get("/:contactId", cntrWrapper(controlers.getContactById));

router.post("/", cntrWrapper(controlers.addContact));

router.delete("/:contactId", cntrWrapper(controlers.removeContact));

router.put("/:contactId", cntrWrapper(controlers.updateContact));

module.exports = router;
