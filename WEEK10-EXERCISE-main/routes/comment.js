const express = require("express");
const pool = require("../config");
const path = require("path")
const router = express.Router();


// Require multer for file upload
const multer = require('multer')
// SET STORAGE
var storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, './static/uploads')
  },
  filename: function (req, file, callback) {
    callback(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
  }
})
const upload = multer({ storage: storage })

router.get('/:blogId/comments', function(req, res, next){
});


// Get comment
router.post('/:blogId/comments', upload.single('myImage'), async function(req, res, next){
    const conn = await pool.getConnection()
    // Begin transaction
    await conn.beginTransaction();
    const file = req.file;
    try {
      let results = await conn.query("INSERT INTO comments (blog_id, comment, comments.like, comment_by_id) VALUES (?, ?, ?, ?);", [
        req.params.blogId, req.body.comment, 0, null
      ]);
      const Id = results[0].insertId;
      if(file){
        console.log(file.path)
        await conn.query(
          "INSERT INTO images(blog_id, file_path, comment_id) VALUES(?, ?, ?);",
          [req.params.blogId, file.filename, Id])

          
      }
      await conn.commit()
      res.redirect(`/blogs/${req.params.blogId}`);
    } catch (err) {
      await conn.rollback();
      next(err);
    } finally {
      console.log('finally')
      conn.release();
    }
});

// Update comment
router.put('/comments/:commentId', async function (req, res, next) {
  const [check] = await pool.query('SELECT id FROM comments where id = ?;', [req.params.commentId])
  try {
      if (check[0].id == null){
          throw err
      }
      const [id] = await pool.query('select max(id)+1 s from comments ')
      console.log(req.params.comments)
      const [row, field] = await pool.query('update  `comments` set comment = ?, comments.like = ?, comment_date = ?, comment_by_id = ?, blog_id = ? where id = ?;',
          [req.body.comment, req.body.like, req.body.comment_date, req.body.comment_by_id, req.body.blog_id, req.params.commentId])
      console.log(req.params.comments)
      return res.json({
          "message": "A new comment is added (id:" + id[0].s + ")is updated",
          "comment": { comment: req.body.comment, like: req.body.like, comment_date: req.body.comment_date,comment_by_id : req.body.comment_by_id, blog_id : req.body.blog_id }
      })
  } catch (err) {
      return res.json({ "message": "ไม่มีจ้า" })
  }
});

// Delete comment
router.delete('/comments/:commentId', async function (req, res, next) {
  const [check] = await pool.query('SELECT id FROM comments where id = ?;', [req.params.commentId])
  try {
      if (check[0].id == null){
          throw err
      }
      const [row, field] = await pool.query('DELETE FROM `comments` WHERE id = ?;', [req.params.commentId])
      console.log(req.params.blogId)
      return res.json({ "message": "Comment (ID:" + req.params.commentId + ") is deleted." })
  } catch (err) {
      return res.json({ "message": "ไม่มีจ้า" })
  }
});

// Delete comment
router.put('/comments/addlike/:commentId', async function (req, res, next) {
  const [check] = await pool.query('SELECT id FROM comments where id = ?;', [req.params.commentId])
  try {
      if (check[0].id == null){
          throw err
      }
      const [row, field] = await pool.query('update `comments`set comments.like = comments.like + 1  WHERE id = ?;', [req.params.commentId])
      console.log(req.params.blogId)
      return res.json({ "message": "success"})
  } catch (err) {
      return res.json({ "message": "ไม่มีจ้า" })
  }
});


exports.router = router