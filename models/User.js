const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');
const { Schema, model } = require('mongoose');

const UserSchema = new Schema(
  {
  username: {
    type: String,
    trim: true,
    required: 'Username is Required'
  },

  password: {
    type: String,
    trim: true,
    required: 'Password is Required',
    minlength: 6
  },

  email: {
    type: String,
    unique: true,
    match: [/.+@.+\..+/]
  },
  thoughts: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Thought'
    }
  ],
  friends: [
    {
      type: Schema.Types.ObjectId,
      ref: 'User'
    }
  ]
},

  // userCreated: {
  //   type: Date,
  //   default: Date.now
  // }


  {
    toJSON: {
      virtuals: true,
      getters: true

    // prevents virtuals from creating duplicate of _id as `id`
  },
  id: false
  }
);

//  get number of friendss
userSchema.virtual('friendCount').get(function() {
  return this.friends.length;
});

const User = model('User', userSchema);

module.exports = User;