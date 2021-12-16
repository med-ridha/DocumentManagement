const express = require('express');
const cors = require('cors');
const mongoose = require(`./database/mongoose.js`);
const document = require(`./database/module/document.js`);
const app = express();
app.use(cors());
app.use(express.json());
const PORT = 1337;

app.listen(PORT, () => console.log(`served at ${PORT}`));

app.get('/documents/all', (req, res) =>{
    document.find({})
        .then(documents => res.send(documents))
        .catch((error) => console.error(error));
});

app.get('/documents/:documentId', (req, res) =>{
    document.find({ _id: req.params.documentId })
        .then(document => res.send(document))
        .catch((error) => console.error(error));
});

app.put('/documents/update/:documentId', (req, res) => {
    let filter = {
        '_id' : req.params.documentId
    }
    let update = {
        fullName: req.body.fullname,
        description: req.body.des,
        doc: req.body.doc
    }
    document.updateOne(filter, update)
        .then(result => res.send(result))
        .catch((error) => console.error(error));
});
app.post ('/documents/create', (req, res) => {
    let fullName = req.body.fullname;
    let description = req.body.des;
    let doc = req.body.doc;
    if (fullName.length == 0 || description.length == 0 || doc.length == 0){
        res.status(400).send("required fields");
    }else{
        (new document({
            fullName : fullName,
            description: description,
            doc: doc 
        }))
            .save()
            .then(document => res.send())
            .catch((error) => console.error(error));
    }
});
