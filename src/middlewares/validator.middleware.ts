
import { body } from 'express-validator';
 export const validatorMiddleware ={
     validateBlogInputModel: ()=> [
         body('name')
             .isLength({max:10})
             .withMessage('name must be at max 4 chars long')
             .exists()
             .withMessage('name is required'),
         body('youtubeUrl')
             .isLength({max:100})
             .withMessage('youtubeUrl must be at max 100 chars long')
             .trim()
             .matches(/^https:\/\/([a-zA-Z0-9_-]+.)+[a-zA-Z0-9_-]+(\/[a-zA-Z0-9_-]+)*\/?$/)
             .exists()
             .withMessage('name is required')
     ],
     validatePostInputModel:()=>[
         body('title')
             .exists()
             .withMessage('title is required')
             .isLength({max:30})
             .withMessage('title must be at max 30 chars long'),
         body('shortDescription')
             .exists()
             .withMessage('shortDescription is required')
             .isLength({max:100})
             .withMessage('shortDescription must be at max 100 chars long'),
         body('content')
             .exists()
             .withMessage('content is required')
             .isLength({max:1000})
             .withMessage('content must be at max 1000 chars long'),
         body('blogId')
             .exists()
             .withMessage('blogId is required'),
     ]
}