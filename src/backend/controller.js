const pool = require('./connection');

const getAllPosts = async (_, res) => {
    try {
        let client = await pool.connect();
        let data = await client.query('SELECT posts.post_id, posts.post_content, posts.user_id, users.user_id AS id, users.user_name from posts JOIN users on posts.user_id = users.user_id ORDER BY posts.post_id DESC;');
        res.json(data.rows)
        client.release();

    } catch (error) {
        console.log(error)
        res.send(error)
    }
}

const getPostsById = async (req, res) => {
    let id = req.params.id
    try {

        let client = await pool.connect();
        let data = await client.query('SELECT posts.post_id, posts.post_content, posts.user_id, users.user_id AS id, users.user_name from posts JOIN users ON posts.user_id = users.user_id WHERE posts.user_id = $1 ORDER BY posts.post_id DESC;', [id])
        res.json(data.rows)
        client.release()

    } catch (error) {
        console.log(error)
        res.send(error)
    }
}

const getAllUsers = async (_, res) => {
    try {
        let client = await pool.connect();
        let data = await client.query('SELECT * FROM users')
        res.json(data.rows)
        client.release()

    } catch (error) {
        console.log(error)
        res.send(error)
    }
}

const createNewUser = async (req, res) => {
    let firstName = req.body.First_Name
    let lastName = req.body.Last_Name
    let userName = req.body.userName
    let email = req.body.email
    let password = req.body.password

    try {
        let client = await pool.connect();
        let data = await client.query('INSERT INTO users (first_name, last_name, user_name, email, password, darktheme) VALUES($1, $2, $3, $4, $5, $6);', [firstName, lastName, userName, email, password, false])
        res.json(req.body)
        client.release()
    } catch (error) {
        console.error(error);
        res.send(error)
    }
}

const createNewPost = async (req, res) => {
    let postContent = req.body.postContent;
    let userId = req.body.userId;

    try {
        let client = await pool.connect();
        let data = await client.query('INSERT INTO posts (post_content, user_id) VALUES ($1, $2)', [postContent, userId])
        res.json(data.rows)
        client.release()

    } catch (error) {
        console.error(error);
        res.send(error)
    }
}

const deletePostById = async (req, res) => {
    let postId = req.params.id
    try {
        let client = await pool.connect();
        let data = await client.query('DELETE FROM posts WHERE post_id = $1', [postId])
        res.json(data.rows)
        client.release()

    } catch (error) {
        console.error(error);
        res.send(error)
    }
}

const getSinglePostById = async (req, res) => {
    let postId = req.params.id
    try {
        let client = await pool.connect()
        let data = await client.query('SELECT * FROM posts WHERE post_id = $1', [postId])
        res.json(data.rows)
        client.release()

    } catch (error) {
        console.log(error)
    }
}

const updatePostById = async (req, res) => {
    let postId = req.params.id
    let text = req.body.textContent
    try {
        let client = await pool.connect()
        let data = await client.query('UPDATE posts SET post_content = $1 WHERE post_id = $2', [text, postId])
        res.json(data.rows)
        client.release()
    } catch (error) {
        console.error(error);
        res.send(error)
    }
}

const updateUserData = async (req, res) => {
    let userId = req.body.userId
    let firstName = req.body.First_Name
    let lastName = req.body.Last_Name
    let email = req.body.email
    let password = req.body.password

    try {
        let client = await pool.connect();
        let data = await client.query('UPDATE users SET first_name = $1, last_name = $2, email = $3, password = $4 WHERE user_id = $5', [firstName, lastName, email, password, userId])
        res.json(data.rows)
        client.release()

    } catch (error) {
        console.error(error)
        res.send(error)
    }
}

module.exports = {
    getAllPosts,
    getPostsById,
    getAllUsers,
    createNewUser,
    createNewPost,
    deletePostById,
    getSinglePostById,
    updatePostById,
    updateUserData
}