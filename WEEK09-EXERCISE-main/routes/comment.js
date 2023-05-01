const express = require("express");
const pool = require("../config.js");
const router = express.Router();

// Get comment
router.get('/:blogId/comments', function (req, res, next) {
});

// Create new comment
router.post('/:blogId/comments', async function (req, res, next) {
    const [check] = await pool.query('SELECT id FROM blogs where id = ?;', [req.params.blogId])
    // console.log(check[0].id)
    try {
        if (check[0].id == null){
            throw err
        }
        const [id] = await pool.query('select max(id)+1 s from comments ')
        console.log(req.params.blogId)
        const [row, field] = await pool.query('insert into `comments` (blog_id, comment) values(?,?);', [req.params.blogId, req.body.comment])
        console.log(req.params.blogId)
        return res.json({ "message": "A new comment is added (id:" + id[0].s + ")" })
    } catch (err) {
        return res.json({ "message": "ไม่มีจ้า" })
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