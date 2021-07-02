const express = require('express')
const { v4: uuidv4 } = require('uuid')
const multer = require('multer')

const router = express.Router()
const path = require('path')
require('dotenv').config()

const UPLOAD_DIR = path.join('./tmp')
const { asyncWrapper } = require('../../helpers/apiHelpers')
const { uploadFileController } = require('../../controllers/usersController')

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, UPLOAD_DIR)
  },
  filename: (req, file, cb) => {
    const [, extension] = file.originalname.split('.')
    cb(null, `${uuidv4()}.${extension}`)
  },
})

const upload = multer({
  storage: storage,
  limits: { fileSize: 2000000 },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.includes('image')) {
      cb(null, true)
      return
    }
    cb(null, false)
  },
})

router.patch('/avatars', upload.single('avatar'), asyncWrapper(uploadFileController))

module.exports = router
