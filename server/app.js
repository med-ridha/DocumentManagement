import fs       from 'fs'
import cors     from 'cors'
import multer   from 'multer'
import express  from 'express'
import document from './database/module/document.js'
import mongoose from './database/mongoose.js'

const app = express();

app.use(cors());
app.use(express.json());

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

app.put('/documents/update/:documentId',type, (req, res) => {
    let fullName = req.body.fullname;
    let description = req.body.des;
    let date = new Date(Date.now()).toUTCString();

    let filter = {
        '_id' : req.params.documentId
    }

    let update = {
        fullName: fullName,
        description: description,
        date: date
    }

    //if the user didn't update the file itself
    if (req.file){
        let originalName = req.file.originalname;
        let args = originalName.split(".");
        let ext = args[args.length - 1];
        let doc = req.file.filename+"."+ext;

        update.doc = doc;

        let tmpPath = req.file.path;
        let targetPath = 'uploads/' + doc;
        let src = fs.createReadStream(tmpPath);
        let dest = fs.createWriteStream(targetPath);


        src.pipe(dest);
        src.on('end', () => {
            //delete tmp file
            fs.unlink(tmpPath, (err) =>{
                if (err) throw err;
                console.log("file deleted");
                document.find(filter)
                    .then(doc => {
                        //delete old file
                        fs.unlink(`uploads/${doc[0].doc}`, (err) =>{
                            if (err) throw err;
                            console.log("file deleted");
                            //update the document
                            document.updateOne(filter, update)
                                .then(result => res.send(result))
                                .catch((error) => console.error(error));
                        })
                    })
                    .catch((error) => console.error(error));
            })
        });

        src.on('error', (err) => {
            console.log(err)
            res.status(500).json({'error': err});
        })
    }else{
        document.updateOne(filter, update)
            .then(result => res.send(result))
            .catch((error) => console.error(error));
    } 
});

app.get ('/uploads/:filename', type, (req, res) => {
    let filename = req.params.filename;
    res.download(`uploads/${filename}`);
});

app.post ('/documents/create', type, async (req, res) => {
    let fullName = req.body.fullname;
    let description = req.body.des;
    let date = new Date(Date.now()).toUTCString();

    //extract the file extension 
    let originalName = req.file.originalname;
    let args = originalName.split(".");
    let ext = args[args.length - 1];
    let doc = req.file.filename+"."+ext;

    
    let tmpPath = req.file.path;
    let targetPath = 'uploads/' + doc;
    let src = fs.createReadStream(tmpPath);
    let dest = fs.createWriteStream(targetPath);

    src.pipe(dest);

    src.on('end', () => {
        //remove tmp file 
        fs.unlink(tmpPath, (err) =>{
            if (err) throw err;
            console.log("file deleted");
            if (fullName.length == 0 || description.length == 0 || doc.length == 0){
                res.status(400).send("required fields");
            }else{
                (new document({ fullName : fullName, description: description, date: date, doc: doc}))
                    .save()
                    .then(doc => res.send(doc))
                    .catch((error) => console.error(error));
            }
        })
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
                //remove file 
                fs.unlink(`uploads/${result[0].doc}`, (err)=>{
                    if (err) throw err;
                    console.log('deleted');
                    res.send(doc)
                })
            })
            .catch((error) => console.error(error));
    })
})
