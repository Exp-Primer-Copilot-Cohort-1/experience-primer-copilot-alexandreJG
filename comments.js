// Create web server
var express = require('express');
var router = express.Router();

// Import mongoose
var mongoose = require('mongoose');

// Connect to mongoose
mongoose.connect('mongodb://localhost:27017/my_db', { useNewUrlParser: true });

// Create schema
var Schema = mongoose.Schema;

// Create data schema
var CommentsSchema = new Schema({
  title: String,
  body: String
});

// Create data model
var CommentsModel = mongoose.model('comments', CommentsSchema);

// GET all comments
router.get('/all', function(req, res, next) {
  CommentsModel.find({}, function(err, docs) {
    res.json(docs);
  });
});

// GET one comment by ID
router.get('/:id', function(req, res, next) {
  CommentsModel.findById(req.params.id, function(err, docs) {
    res.json(docs);
  });
});

// POST one comment
router.post('/add', function(req, res, next) {
  new CommentsModel({
    title: req.body.title,
    body: req.body.body
  }).save(function(err, doc) {
    res.json(doc);
  });
});

// PUT one comment
router.put('/edit/:id', function(req, res, next) {
  CommentsModel.updateOne(
    {
      _id: req.params.id
    },
    {
      title: req.body.title,
      body: req.body.body
    },
    function(err, doc) {
      res.json(doc);
    }
  );
});

// DELETE one comment
router.delete('/delete/:id', function(req, res, next) {
  CommentsModel.deleteOne(
    {
      _id: req.params.id
    },
    function(err, doc) {
      res.json(doc);
    }
  );
});

module.exports = router;