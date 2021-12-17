const express = require('express');
const app = express();
const fs = require('fs');

const document = require('./database/module/document.js');
const mongoose = require('./database/mongoose.js');

const cors = require('cors');
app.use(cors());
app.use(express.json());

const multer = require('multer');
const upload = multer( { dest: 'tmp/' } );
const type = upload.single('recfile');

app.listen(1337, () => console.log(`served at 1337`));

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

app.get ('/uploads/:filename', type, (req, res) => {
    let filename = req.params.filename;
    res.download(`uploads/${filename}`);
});
app.post ('/documents/create', type, (req, res) => {
    let fullName = req.body.fullname;
    let description = req.body.des;
    let doc = req.file.originalname;
    let tmpPath = req.file.path;
    var targetPath = 'uploads/' + doc;

    var src = fs.createReadStream(tmpPath);
    var dest = fs.createWriteStream(targetPath);
    src.pipe(dest);
    src.on('end', () => {
        fs.unlink(tmpPath, (err) =>{
            if (err) throw err;
            console.log("file deleted");
        })
        console.log('done') 
        if (fullName.length == 0 || description.length == 0 || doc.length == 0){
            res.status(400).send("required fields");
        }else{
            (new document({ fullName : fullName, description: description, doc: doc }))
                .save()
                .then(doc => res.send(doc))
                .catch((error) => console.error(error));
        }
    });
    src.on('error', (err) => {
        console.log(err)
        res.status(500).json({'error': err});
    });
});

app.delete('/documents/delete/:documentId', (req, res)=>{
    let filter = {
        '_id' : req.params.documentId
    }
    document.find(filter).then(result => {
        document.deleteOne(filter)
            .then((doc) => {
                fs.unlink(`uploads/${result[0].doc}`, (err)=>{
                    if (err) throw err;
                    console.log('deleted');
                    res.send(doc)
                })
            })
            .catch((error) => console.error(error));
    })
    
})
