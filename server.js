// import modules
const express = require("express");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const RagisterModel = require("./Model/Ragister");
const TxnModel = require("./Model/Transcation");
const connectToDb = require("./DB/connection");
const PORT = 5000 || process.env.PORT;

const app = express();

// connection for the database
connectToDb()

// middleware 
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }));


// routes
app.post("/ragister", async (req, res) => {
    const { userName, password, confirm_pass } = req.body;

    try {
        const isUserAvilabe = await RagisterModel.find({ userName })

        if (isUserAvilabe.length > 0) {
            res.send({ status: "Ok", msg: "User Already Exist You Have to Login", data: isUserAvilabe })
        } else {
            if (password === confirm_pass) {
                try {
                    const hash = await bcrypt.hash(password, 8)
                    const Ragister = await RagisterModel.create({
                        userName, password: hash
                    })
                    res.send({ status: "Ok", msg: "successfully saved", data: Ragister })
                } catch (err) {
                    res.send({ status: "Error", msg: "Hashing Problem", Error: err })
                }
            } else {
                res.send({ status: "Not Ok", msg: "confirm password is wrong" })
            }
        }

    } catch (err) {
        res.send({ status: "Error", msg: "Error From Availabe", Error: err })
    }
})


app.post("/login", async (req, res) => {
    const { userName, password } = req.body

    try {
        let user = await RagisterModel.find({ userName })

        if (user.length > 0) {
            let hashPass = user[0].password
            try {
                let access = await bcrypt.compare(password, hashPass)

                if (access) {
                    res.send({ status: "Ok", msg: "successfully logged in" })
                } else {
                    res.send({ status: "Ok", msg: "password is not exist in the database", Error: err })
                }

            } catch (err) {
                res.send({ status: "Ok", msg: "password is wrong", Error: err })
            }
        }

    } catch (err) {
        res.send({ status: "Ok", msg: "error from login checking", Error: err })
    }

})


app.post("/save-txn", async (req, res) => {

    const { userId, amount, type, remark } = req.body

    const SendTxn = await TxnModel.create({ userId, amount, type, remark })

    res.send({ txn: SendTxn })

})


app.post("/get-txn", async (req, res) => {

    let { userId } = req.body
    console.log(userId)

    let txnFromUsers = await TxnModel.find({ userId })

    res.send({ data: txnFromUsers })

})

//listen port 
app.listen(PORT, () => {
    console.log("Server is Running.....")
})
