const Course = require('../models/Courses');
const {mongooseToOject} = require('../../util/mongoose')
class CourseController {

    //[GET] /COURSES/:SLUG
    show(req, res, next) {
        Course.findOne({ slug: req.params.slug})
        .then((course) => {
            res.render('courses/show', {course: mongooseToOject(course)})
        })
        .catch(next)
    }
    //[GET] /COURSES/create
    create(req, res, next) {
        res.render("courses/create")
    }
    //[POST] /COURSES/store
    store(req, res, next) {
        req.body.image = `https://img.youtube.com/vi/${req.body.videoId}/sddefault.jpg`
        const course = new Course(req.body);
        course.save()
        .then(() => res.redirect('/me/stored/courses'))
        .catch(error => {
            
        })

    }
    //[GET] /COURSES/:id/edit
    edit(req, res, next) {
        Course.findById(req.params.id)
        .then(course => res.render('courses/edit',{
            course: mongooseToOject(course)
        }))
        .catch(next)
    }

    //[PUT] /COURSES/:id
    update(req, res, next){
        Course.updateOne({ _id: req.params.id}, req.body)
        .then(() => res.redirect('/me/stored/courses'))
        .catch(next)
    }
    //[DELETE] /COURSES/:id
    destroy(req, res, next){
        Course.delete({ _id: req.params.id})
        .then(() => res.redirect('back'))
        .catch(next);
    }

    //[DELETE] /COURSES/:id/force
    forceDestroy(req, res, next){
        Course.deleteOne({ _id: req.params.id})
        .then(() => res.redirect('back'))
        .catch(next);
    }

    //[PATCH] /COURSES/:id/restore
    restore(req, res, next){
        Course.restore({ _id: req.params.id})
        .then(() => res.redirect('back'))
        .catch(next);
    }
    
}

module.exports = new CourseController();
