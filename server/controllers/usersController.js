const User = require('../models/userModel')
const brcypt = require('bcrypt')

module.exports.register = async (req, res, next) => {
  try {
    const { username, email, password } = req.body
    const usernameCheck = await User.findOne({ username })
    if (usernameCheck) {
      return res.json({ message: '이미 존재하는 유저명입니다.', status: false })
    }
    const emailCheck = await User.findOne({ email })
    if (emailCheck) {
      return res.json({
        message: '이미 존재하는 이메일 주소입니다.',
        status: false,
      })
    }
    const hashedpassword = await brcypt.hash(password, 10)
    const user = await User.create({
      email,
      username,
      password: hashedpassword,
    })
    delete user.password
    return res.json({ status: true, user })
  } catch (err) {
    next(err)
  }
}

module.exports.login = async (req, res, next) => {
  try {
    const { username, password } = req.body
    const user = await User.findOne({ username })
    if (!user) {
      return res.json({
        message: '유저명 또는 비밀번호가 일치하지 않습니다.',
        status: false,
      })
    }
    const isPasswordValid = await brcypt.compare(password, user.password)
    if (!isPasswordValid) {
      return res.json({
        message: '유저명 또는 비밀번호가 일치하지 않습니다.',
        status: false,
      })
    }
    delete user.password

    return res.json({ status: true, user })
  } catch (err) {
    next(err)
  }
}

module.exports.setAvatar = async (req, res, next) => {
  try {
    const userId = req.params.id
    const avatarImage = req.body.image
    const userData = await User.findByIdAndUpdate(userId, {
      isAvatarImageSet: true,
      avatarImage: avatarImage,
    })
    return res.json({
      isSet: userData.isAvatarImageSet,
      image: userData.avatarImage,
    })
  } catch (err) {
    next(err)
  }
}

module.exports.getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find({ _id: { $ne: req.params.id } }).select([
      'email',
      'username',
      'avtarImage',
      '_id',
    ])
    return res.json(users);
  } catch (err) {
    next(err)
  }
}
