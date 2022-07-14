const express = require('express')

const { schemaValidator } = require('../middlewares/validator')
const { news, idNews } = require('../schemas/new')
const {
  post, get, getById, destroy, put, getWithComments,
} = require('../controllers/news')
const { isAdmin } = require('../middlewares/isAdmin')
const { verifyUsers } = require('../middlewares/auth')

const router = express.Router()

/**
 * @swagger
 * components:
 *   securitySchemes:
 *      ApiKeyAuth:
 *        type: apiKey
 *        in: header
 *        name: authorization
 *   schemas:
 *      New:
 *        type: object
 *        properties:
 *          id:
 *            type: number
 *            description: the auto-generated id of new
 *          name:
 *            type: string
 *            description: the name of the news
 *          content:
 *            type: text
 *            description: the content of the news
 *          type:
 *            type: string
 *            description: the type of the news
 *          description:
 *            type: string
 *            description: the description of news
 *          image:
 *            type: string
 *            description: url link to image
 *          categoryId:
 *            type: integer
 *            description: category of the news
 *          createdAt:
 *            type: string
 *            format: date-time
 *            description: the news creation date
 *          updatedAt:
 *            type: string
 *            format: date-time
 *            description: the news update date
 *          deletedAt:
 *            type: string
 *            format: date-time
 *            description: the soft-delete date of the news
 *        required:
 *            - name
 *        example:
 *            id: 1
 *            name: news
 *            content: new school was opened
 *            type: announcement
 *            categoryId: 1
 *            description: news description
 *            image: link to an image
 *            deletedAt: null
 *            createdAt: 2022-07-11T00:00:00.000Z
 *            updatedAt: 2022-07-12T00:00:00.000Z
 *
 *      Comment:
 *        type: object
 *        properties:
 *          id:
 *            type: number
 *            description: the auto-generated id of comment
 *          user_id:
 *            type: string
 *            description: the id of the user
 *          body:
 *            type: text
 *            description: the content of the comment
 *          news_id:
 *            type: integer
 *            description: Id of the news of the comment
 *          createdAt:
 *            type: string
 *            format: date-time
 *            description: the comment creation date
 *          updatedAt:
 *            type: string
 *            format: date-time
 *            description: the comment update date
 *        required:
 *            - name
 *        example:
 *            id: 1
 *            user_id: 25
 *            body: this new was informative
 *            news_id: 2
 *            createdAt: 2022-07-11T00:00:00.000Z
 *            updatedAt: 2022-07-12T00:00:00.000Z
 *
 *      NewNotFound:
 *        type: object
 *        properties:
 *          message:
 *            type: string
 *            description: A message for the not found news
 *          statusCode:
 *           type: number
 *           description: Http Status Code
 *        example:
 *          message: News not found
 *          statusCode: 404
 *
 *      Unauthorized:
 *        properties:
 *          message:
 *            type: string
 *            description: A message for the news not created
 *          code:
 *           type: number
 *           description: Http Status Code
 *        example:
 *          code: 401
 *          message: JWT must be provided
 *
 *   parameters:
 *     NewID:
 *       in: path
 *       name: id
 *       schema:
 *         type: number
 *       required: true
 *       description: The new id number
 */

/**
 * @swagger
 * /news:
 *   get:
 *     summary: Returns a News list
 *     tags: [News]
 *     responses:
 *        200:
 *          description: Successful response - News retrieved successfully
 *          content:
 *            application/json:
 *              schema:
 *                type: array
 *                properties:
 *                  code:
 *                    type: number
 *                    format: number
 *                  status:
 *                    type: boolean
 *                    format: boolean
 *                  message:
 *                    type: string
 *                    format: string
 *                  body:
 *                    type: array
 *                    properties:
 *                      name:
 *                        type: string
 *                        format: string
 *                items:
 *                  $ref: '#/components/schemas/News'
 *        404:
 *          description: Error response - News not found
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/NewNotFound'
 *        500:
 *          description: Error response - Internal server error
 */
router.get('/', get)

/**
 * @swagger
 * /news:
 *   post:
 *     summary: Create a new New
 *     tags: [Categories]
 *     security:
 *      - ApiKeyAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                type: string
 *                description: the name of New
 *                required: true
 *               description:
 *                type: string
 *                required: false
 *               image:
 *                type: string
 *                required: false
 *     responses:
 *        200:
 *          description: Successful response - News successfully created
 *          content:
 *            application/json:
 *              schema:
 *                type: array
 *                properties:
 *                  code:
 *                    type: number
 *                    format: number
 *                  status:
 *                    type: boolean
 *                    format: boolean
 *                  message:
 *                    type: string
 *                    format: string
 *                  body:
 *                    type: object
 *                    properties:
 *                      name:
 *                        type: string
 *                        format: string
 *                example:
 *                  id: 1
 *                  name: news
 *                  createdAt: 2022-07-11T00:00:00.000Z
 *                  updatedAt: 2022-07-12T00:00:00.000Z
 *        401:
 *          description: Error response - Error creating News
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Unauthorized'
 *        500:
 *          description: Error response - Internal server error
 */
router.post('/', verifyUsers, isAdmin, schemaValidator(news), post)

/**
 * @swagger
 * /news/{id}:
 *   get:
 *     summary: Returns a New by ID
 *     tags: [News]
 *     parameters:
 *       - $ref: '#/components/parameters/NewID'
 *     responses:
 *       200:
 *         description: Successful response - News retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               properties:
 *                 code:
 *                   type: number
 *                   format: number
 *                 status:
 *                   type: boolean
 *                   format: boolean
 *                 message:
 *                   type: string
 *                   format: string
 *                 body:
 *                   type: object
 *                   properties:
 *                     name:
 *                       type: string
 *                       format: string
 *               items:
 *                 $ref: '#/components/schemas/New'
 *       404:
 *         description: Error response - New not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/NewNotFound'
 *       500:
 *          description: Error response - Internal server error
 */
router.get('/:id', getById)

/**
 * @swagger
 * /news/{id}:
 *   delete:
 *     summary: Delete a New by ID
 *     tags: [News]
 *     security:
 *      - ApiKeyAuth: []
 *     parameters:
 *       - $ref: '#/components/parameters/NewID'
 *     responses:
 *       200:
 *         description: Successful response - New deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               properties:
 *                 code:
 *                   type: number
 *                   format: number
 *                 status:
 *                   type: boolean
 *                   format: boolean
 *                 message:
 *                   type: string
 *                   format: string
 *                 body:
 *                   type: array
 *                   properties:
 *                     1
 *               items:
 *                 $ref: '#/components/schemas/New'
 *             example:
 *               code: 200
 *               status: true
 *               message: New deleted successfully
 *               body: 1
 *       401:
 *          description: Error response - Error creating New
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Unauthorized'
 *       404:
 *         description: Error response - New not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/NewNotFound'
 *       500:
 *          description: Error response - Internal server error
 */
router.delete('/:id', verifyUsers, isAdmin, destroy)

/**
 * @swagger
 * /news/{id}:
 *   put:
 *     summary: Update a New by ID
 *     tags: [News]
 *     parameters:
 *       - $ref: '#/components/parameters/NewID'
 *     security:
 *      - ApiKeyAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: the name of the news
 *                 required: true
 *               description:
 *                 type: string
 *                 required: false
 *               image:
 *                 type: string
 *                 required: false
 *           example:
 *             name: update new
 *             description: update a new
 *             image: updated
 *             deletedAt: null
 *             createdAt: 2022-07-11T00:00:00.000Z
 *             updatedAt: 2022-07-12T00:00:00.000Z
 *     responses:
 *       200:
 *         description: Successful response - New successfully update
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 code:
 *                   type: number
 *                   format: number
 *                 status:
 *                   type: boolean
 *                   format: boolean
 *                 message:
 *                   type: string
 *                   format: string
 *                 body:
 *                   type: array
 *                   properties:
 *                     1
 *             example:
 *               code: 200
 *               status: true
 *               message: New successfully updated
 *               body: [1]
 *       401:
 *          description: Error response - Error creating New
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Unauthorized'
 *       404:
 *         description: Error response - New not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/NewNotFound'
 *       500:
 *          description: Error response - Internal server error
 */
router.put('/:id', verifyUsers, isAdmin, put)

/**
 * @swagger
 * /news/{id}/comments:
 *   get:
 *     summary: Returns a New by ID, with Comments
 *     tags: [News]
 *     parameters:
 *       - $ref: '#/components/parameters/NewID'
 *     responses:
 *       200:
 *         description: Successful response - News with Comments retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               properties:
 *                 code:
 *                   type: number
 *                   format: number
 *                 status:
 *                   type: boolean
 *                   format: boolean
 *                 message:
 *                   type: string
 *                   format: string
 *                 body:
 *                   type: object
 *                   properties:
 *                     name:
 *                       type: string
 *                       format: string
 *               items:
 *                 $ref: '#/components/schemas/Comment'
 *       404:
 *         description: Error response - New not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/NewNotFound'
 *       500:
 *          description: Error response - Internal server error
 */
router.get('/:id/comments', verifyUsers, schemaValidator(idNews), getWithComments)

module.exports = router
