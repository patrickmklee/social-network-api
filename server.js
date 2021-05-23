const express = require('express');
const mongoose = require('mongoose');

const app = express();
const routes = require('./routes');
const PORT = process.env.PORT || 4001;

const db = require('./models');


mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/socialnetworkdb', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: true,
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(routes);

// // Retrieve all notes
// app.get('/thoughts', (req, res) => {
//   db.Note.find({})
//     .then(dbNote => {
//       res.json(dbNote);
//     })
//     .catch(err => {
//       res.json(err);
//     });
// });

// // Retrieve all users
// app.get('/users', (req, res) => {
//   db.User.find({})
//     .then(dbUser => {
//       res.json(dbUser);
//     })
//     .catch(err => {
//       res.json(err);
//     });
// });


// // Retrieve all users
// app.post('/users', (req, res) => {
//   db.User.find({})
//     .then(dbUser => {
//       res.json(dbUser);
//     })
//     .catch(err => {
//       res.json(err);
//     });
// });

// // Create a new note and associate it with user
// app.post('/thought', ({ body }, res) => {
//   db.Note.create(body)
//     .then(({ _id }) =>
//       db.User.findOneAndUpdate({}, { $push: { notes: _id } }, { new: true })
//     )
//     .then(dbUser => {
//       res.json(dbUser);
//     })
//     .catch(err => {
//       res.json(err);
//     });
// });

// app.get('/thoughts', (req, res) => {
//   db.User.find({})
//     .populate({
//       path: 'thoughts',
//       select: '-__v'
//     })
//     .select('-__v')
//     .then(dbUser => {
//       res.json(dbUser);
//     })
//     .catch(err => {
//       res.json(err);
//     });
// });

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});
