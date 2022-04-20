const mongoose = require("mongoose");
const slug = require('mongoose-slug-generator');
const mongooseDelete = require('mongoose-delete');
// const url = 'localhost:27017/F8_education_dev.courses'
// mongoose.connect({useNewUrlParser: true},{useUnifiedTopology: true})

const Schema = mongoose.Schema;

const Course = new Schema({
    name: {type: String, required: true},
    description: {type: String,},
    image: {type: String,},
    videoId: {type: String, required: true},
    level: {type: String,},
    slug: { type: String, slug: "name", unique: true },
},{
    timestamps: true,
});

//Add plugins
mongoose.plugin(slug);
Course.plugin(mongooseDelete,{ 
    deletedAt : true,
    overrideMethods: 'all' ,
});

module.exports = mongoose.model('Course', Course);