const Course = require('../models/Courses');
const {multipleMongooseToObject} = require('../../util/mongoose')
class MeController {
    //[GET] /me/stored/courses
    storedCourses(req, res, next) {

        Course.countDocumentsDeleted()
            .then((deletedCount) => {
                console.log(deletedCount)
            })
            .catch(next)

        Course.find({})
            .then(courses => res.render('me/stored-courses',{
                courses: multipleMongooseToObject(courses)
            }))
            .catch(next)
    }
    //[GET] /me/stored/courses
    trashCourses(req, res, next){
        Course.findDeleted({})
        .then(courses => res.render('me/trash-courses',{
            courses: multipleMongooseToObject(courses)
        }))
        .catch(next)
    }
}
    


    

module.exports = new MeController();
