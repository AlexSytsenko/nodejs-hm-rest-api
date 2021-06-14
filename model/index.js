const fs = require('fs/promises')

const path = require('path')

const contactsPath = path.join(__dirname, './contacts.json')

const listContacts = async () => {
  try {
    const data = await fs.readFile(contactsPath)
    const contactsList = JSON.parse(data)
    return contactsList
  } catch (error) {
    console.log(error.message)
  }
}

const getContactById = async contactId => {
  try {
    const data = await fs.readFile(contactsPath)
    const contactsList = JSON.parse(data)
    const [contact] = contactsList.filter(contact => contact.id === contactId)
    return contact
  } catch (err) {
    console.log(err.message)
  }
}

const removeContact = async contactId => {
  try {
    const data = await fs.readFile(contactsPath)
    const contactsList = JSON.parse(data)
    const newContactsList = contactsList.filter(
      contact => contact.id !== contactId,
    )
    if (newContactsList.length === contactsList.length) {
      return null
    }
    await fs.writeFile(contactsPath, JSON.stringify(newContactsList))
    return newContactsList
  } catch (err) {
    console.log(err.message)
  }
}

const addContact = async body => {
  const { name, email, phone } = body
  const newContact = {
    id: new Date().getTime(),
    name,
    email,
    phone,
  }
  try {
    const data = await fs.readFile(contactsPath)
    const contactsList = JSON.parse(data)
    const newContactList = [...contactsList, newContact]
    await fs.writeFile(contactsPath, JSON.stringify(newContactList))
    return newContact
  } catch (err) {
    console.log(err.message)
  }
}

const updateContact = async (contactId, body) => {
  const { name, email, phone } = body
  try {
    const data = await fs.readFile(contactsPath)
    const contactsList = JSON.parse(data)
    const contactIndex = contactsList.findIndex(contact => contact.id === contactId)

    if (contactIndex === -1) {
      return null
    }
    const newContactList = contactsList.map(contact => {
      if (contact.id === contactId) {
        if (name) {
          contact.name = name
        }
        if (email) {
          contact.email = email
        }
        if (phone) {
          contact.phone = phone
        }
      }
      return contact
    })
    await fs.writeFile(contactsPath, JSON.stringify(newContactList))
    return newContactList[contactIndex]
  } catch (err) {
    console.log(err.message)
  }
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
