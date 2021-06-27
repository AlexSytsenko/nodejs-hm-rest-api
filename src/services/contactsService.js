const { Contact } = require('../../model/db/contactModel')

const listContacts = async (id, page, limit, favorite) => {
  let searchParams = { owner: id }

  if (favorite !== null) {
    searchParams = { owner: id, favorite }
  }

  if (limit) {
    const result = await Contact.paginate(
      searchParams,
      { page, limit, select: { owner: 0 } }
    )

    const { docs: contacts, totalDocs, totalPages } = result
    return { contacts, totalDocs, totalPages, page, limit }
  }
  const data = await Contact.find(searchParams).select({ owner: 0 })
  return data
}

const getContactById = async (id, userId) => {
  const data = await Contact.findOne({ _id: id, owner: userId }).select({
    owner: 0,
  })

  return data
}

const addContact = async body => {
  const contact = new Contact(body)
  const data = await contact.save()

  return data
}

const removeContact = async (id, userId) => {
  const contact = await Contact.findOneAndRemove({ _id: id, owner: userId })

  return contact
}

const updateContact = async (id, body, userId) => {
  const contact = await Contact.findOneAndUpdate(
    { _id: id, owner: userId },
    { $set: body },
    { new: true },
  ).select({
    owner: 0,
  })
  return contact
}

const updateStatusContact = async (id, body, userId) => {
  const contact = await Contact.findOneAndUpdate(
    { _id: id, owner: userId },
    { $set: body },
    { new: true },
  ).select({
    owner: 0,
  })
  return contact
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateStatusContact,
}
