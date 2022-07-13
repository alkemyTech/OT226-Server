const express = require('express')
const { schemaValidator } = require('../middlewares/validator')
const { postTestimonial } = require('../schemas/testimonial')
const {
  get, put, post, destroy,
} = require('../controllers/testimonials')
const { verifyUsers } = require('../middlewares/auth')
const { isAdmin } = require('../middlewares/isAdmin')

const router = express.Router()

router.get('/', get)

/**
 * @swagger
 * components:
 *  securitySchemes:
 *      ApiKeyAuth:
 *          type: apiKey
 *          in: header
 *          name: authorization
 *  schemas:
 *      Testimonial:
 *          type: object
 *          properties:
 *              id:
 *                  type: integer
 *                  description: the auto-incremented id of the testimonial
 *              name:
 *                  type: string
 *                  description: the name of the testimonial
 *              image:
 *                  type: string
 *                  description: the image of the testimonial
 *              content:
 *                  type: string
 *                  description: the content of the testimonial
 *              createdAt:
 *                  type: string
 *                  format: date-time
 *                  description: the creation date
 *              updatedAt:
 *                  type: string
 *                  format: date-time
 *                  description: the update date
 *              deletedAt:
 *                  type: string
 *                  format: date-time
 *                  description: the deletion date
 *          required:
 *              - name
 *          example:
 *              name: testimonial
 *              image: https://popupsmart.com/encyclopedia/images/t/e/s/t/i/testimonial-example-da3e2204.png
 *              content: this is a testimonial content example
 *              createdAt: 2022-07-12 18:41:45
 *              updatedAt: 2022-07-12 18:41:45
 *              deletedAt: null
 */

/**
 * @swagger
 *  /testimonials/{id}:
 *  put:
 *      summary: update testimonials
 *      tags: [Testimonials]
 *      security:
 *          - ApiKeyAuth: []
 *      parameters:
 *          - in: path
 *            name: id
 *            schema:
 *              type: integer
 *            required: true
 *            description: the testimonial id
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      $ref: '#/components/schemas/Testimonial'
 *      responses:
 *          200:
 *              description: testimonial updated
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              code:
 *                                  type: integer
 *                              status:
 *                                  type: boolean
 *                              message:
 *                                  type: string
 *                              body:
 *                                  type: object
 *                                  properties:
 *                                      id:
 *                                          type: integer
 *                                      name:
 *                                          type: string
 *                                      image:
 *                                          type: string
 *                                      content:
 *                                          type: string
 *                                      deletedAt:
 *                                          type: string
 *                                          format: date-time
 *                                      createdAt:
 *                                          type: string
 *                                          format: date-time
 *                                      updatedAt:
 *                                          type: string
 *                                          format: date-time
 *                          example:
 *                              name: testimonial
 *                              image: https://popupsmart.com/encyclopedia/images/t/e/s/t/i/testimonial-example-da3e2204.png
 *                              content: this is a testimonial content example
 *                              createdAt: 2022-07-12 18:41:45
 *                              updatedAt: 2022-07-12 18:41:45
 *                              deletedAt: null
 *          401:
 *              description: Unauthorized user
 *          404:
 *              description: Testimonial not found
 */
router.put('/:id', verifyUsers, isAdmin, put)

/**
 * @swagger
 *  /testimonials:
 *  post:
 *      summary: create testimonials
 *      tags: [Testimonials]
 *      security:
 *          - ApiKeyAuth: []
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      $ref: '#/components/schemas/Testimonial'
 *      responses:
 *          200:
 *              description: testimonial created
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              code:
 *                                  type: integer
 *                              status:
 *                                  type: boolean
 *                              message:
 *                                  type: string
 *                              body:
 *                                  type: object
 *                                  properties:
 *                                      id:
 *                                          type: integer
 *                                      name:
 *                                          type: string
 *                                      content:
 *                                          type: string
 *                                      createdAt:
 *                                          type: string
 *                                          format: date-time
 *                                      updatedAt:
 *                                          type: string
 *                                          format: date-time
 *                          example:
 *                              name: testimonial
 *                              content: this is a testimonial content example
 *                              createdAt: 2022-07-12 18:41:45
 *                              updatedAt: 2022-07-12 18:41:45
 *          401:
 *              description: Unauthorized user
 *          500:
 *              description: Error response - Internal server error
 */
router.post('/', verifyUsers, isAdmin, schemaValidator(postTestimonial), post)

/**
 * @swagger
 *  /testimonials/{id}:
 *  delete:
 *      summary: delete testimonials
 *      tags: [Testimonials]
 *      security:
 *          - ApiKeyAuth: []
 *      parameters:
 *          - in: path
 *            name: id
 *            schema:
 *              type: integer
 *            required: true
 *            description: the testimonial id
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      $ref: '#/components/schemas/Testimonial'
 *      responses:
 *          200:
 *              description: testimonial deleted
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              code:
 *                                  type: integer
 *                              status:
 *                                  type: boolean
 *                              message:
 *                                  type: string
 *                              body:
 *                                  type: array
 *                                  items:
 *                                      type: integer
 *                          example:
 *                              code: 200
 *                              status: true
 *                              message: Category deleted successfully
 *                              body: 1
 *          401:
 *              description: Unauthorized user
 *          404:
 *              description: Testimonial not found
 *          500:
 *              description: Error response - Internal server error
 */
router.delete('/:id', verifyUsers, isAdmin, destroy)

module.exports = router
