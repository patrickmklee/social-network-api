const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');


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
    // new Schema({ name: 'string' })]
  
    {
      type: Schema.Types.Array,
      ref: 'User',
      unique: false,
      id: false
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
UserSchema.path('thoughts').validate(function(value) {
  if (this.username === this.parent.username) {
    
    return (false);
  } 
  
    return true;
  

// validate: {
//   validator: () => 
// }
});


//  get number of friendss
UserSchema.virtual('friendCount').get(function() {
  return this.friends.length;
});

const User = model('User', UserSchema);

module.exports = User;