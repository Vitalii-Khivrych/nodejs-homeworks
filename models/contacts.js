// const fs = require('fs/promises')
const path = require("path");
const fs = require("fs/promises");

const contactsPath = path.join(__dirname, "contacts.json");

const rewriteContacts = async (contacts) =>
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));

const listContacts = async () => {
  try {
    const result = await fs.readFile(contactsPath);
    return JSON.parse(result);
  } catch (error) {
    console.error(error.message);
  }
};

const getContactById = async (contactId) => {
  try {
    const contacts = await listContacts();
    const result = contacts.find(({ id }) => id === contactId);

    return result || null;
  } catch (error) {
    console.error(error.message);
  }
};

const removeContact = async (contactId) => {
  try {
    const contacts = await listContacts();
    const index = contacts.findIndex(({ id }) => id === contactId);

    if (index === -1) {
      return null;
    }

    const [result] = contacts.splice(index, 1);
    await rewriteContacts(contacts);
    return result;
  } catch (error) {
    console.error(error.message);
  }
};

const addContact = async ({ name, email, phone }) => {
  try {
    const contacts = await listContacts();

    const newContact = {
      id: (parseInt(contacts[contacts.length - 1].id) + 1).toString(),
      name,
      email,
      phone,
    };

    await rewriteContacts([...contacts, newContact]);
    return newContact;
  } catch (error) {
    console.error(error.message);
  }
};

const updateContact = async (contactId, body) => {
  try {
    const contacts = await listContacts();
    const index = contacts.findIndex(({ id }) => id === contactId);

    if (index === -1) {
      return null;
    }

    contacts[index] = { id: contactId, ...body };
    await rewriteContacts(contacts);
    return contacts[index];
  } catch (error) {
    console.error(error.message);
  }
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
