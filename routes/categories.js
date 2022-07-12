const express = require('express')
const { schemaValidator } = require('../middlewares/validator')
const { category } = require('../schemas/category')
const {
  get, getCategoryById, post, put, destroy,
} = require('../controllers/categories')
const { verifyUsers } = require('../middlewares/auth')
const { isAdmin } = require('../middlewares/isAdmin')

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
 *      Category:
 *        type: object
 *        properties:
 *          id:
 *            type: number
 *            description: the auto-generated id of category
 *          name:
 *            type: string
 *            description: the name of category
 *          description:
 *            type: string
 *            description: the description of category
 *          image:
 *            type: string
 *            description: url link to image
 *          createdAt:
 *            type: string
 *            format: date-time
 *            description: the category creation date
 *          updatedAt:
 *            type: string
 *            format: date-time
 *            description: the category update date
 *          deletedAt:
 *            type: string
 *            format: date-time
 *            description: the soft-delete date of the category
 *        required:
 *            - name
 *        example:
 *            id: 1
 *            name: news
 *            description: news category
 *            image: https://descripciondepuestos.net/descripcion-del-trabajo-de-category-manager-2/
 *            deletedAt: null
 *            createdAt: 2022-07-11T00:00:00.000Z
 *            updatedAt: 2022-07-12T00:00:00.000Z
 *
 *      CategoryNotFound:
 *        type: object
 *        properties:
 *          message:
 *            type: string
 *            description: A message for the not found category
 *          statusCode:
 *           type: number
 *           description: Http Status Code
 *        example:
 *          message: Category not found
 *          statusCode: 404
 *
 *      Unauthorized:
 *        properties:
 *          message:
 *            type: string
 *            description: A message for the category not created
 *          code:
 *           type: number
 *           description: Http Status Code
 *        example:
 *          code: 401
 *          message: JWT must be provided
 *
 *   parameters:
 *     CategoryID:
 *       in: path
 *       name: id
 *       schema:
 *         type: number
 *       required: true
 *       description: The category id number
 */

/**
 * @swagger
 * /categories:
 *   get:
 *     summary: Returns a Categories list
 *     tags: [Categories]
 *     responses:
 *        200:
 *          description: Successful response - Categories retrieved successfully
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
 *                  $ref: '#/components/schemas/Category'
 *        404:
 *          description: Error response - Category not found
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/CategoryNotFound'
 *        500:
 *          description: Error response - Internal server error
 */
router.get('/', get)

/**
 * @swagger
 * /categories:
 *   post:
 *     summary: Create a new Category
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
 *                description: the name of category
 *                required: true
 *               description:
 *                type: string
 *                required: false
 *               image:
 *                type: string
 *                required: false
 *     responses:
 *        200:
 *          description: Successful response - Category successfully created
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
 *          description: Error response - Error creating Category
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Unauthorized'
 *        500:
 *          description: Error response - Internal server error
 */
router.post('/', verifyUsers, isAdmin, schemaValidator(category), post)

/**
 * @swagger
 * /categories/{id}:
 *   get:
 *     summary: Returns a Category by ID
 *     tags: [Categories]
 *     parameters:
 *       - $ref: '#/components/parameters/CategoryID'
 *     responses:
 *       200:
 *         description: Successful response - Categories retrieved successfully
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
 *                 $ref: '#/components/schemas/Category'
 *       404:
 *         description: Error response - Category not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CategoryNotFound'
 *       500:
 *          description: Error response - Internal server error
*/
router.get('/:id', getCategoryById)

/**
 * @swagger
 * /categories/{id}:
 *   put:
 *     summary: Update a Category by ID
 *     tags: [Categories]
 *     parameters:
 *       - $ref: '#/components/parameters/CategoryID'
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
 *                 description: the name of category
 *                 required: true
 *               description:
 *                 type: string
 *                 required: false
 *               image:
 *                 type: string
 *                 required: false
 *           example:
 *             name: update category
 *             description: update a category
 *             image: updated
 *             deletedAt: null
 *             createdAt: 2022-07-11T00:00:00.000Z
 *             updatedAt: 2022-07-12T00:00:00.000Z
 *     responses:
 *       200:
 *         description: Successful response - Category successfully update
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
 *               message: Category successfully update
 *               body: [1]
 *       401:
 *          description: Error response - Error creating Category
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Unauthorized'
 *       404:
 *         description: Error response - Category not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CategoryNotFound'
 *       500:
 *          description: Error response - Internal server error
*/
router.put('/:id', verifyUsers, isAdmin, schemaValidator(category), put)

/**
 * @swagger
 * /categories/{id}:
 *   delete:
 *     summary: Delete a Category by ID
 *     tags: [Categories]
 *     security:
 *      - ApiKeyAuth: []
 *     parameters:
 *       - $ref: '#/components/parameters/CategoryID'
 *     responses:
 *       200:
 *         description: Successful response - Category deleted successfully
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
 *                 $ref: '#/components/schemas/Category'
 *             example:
 *               code: 200
 *               status: true
 *               message: Category deleted successfully
 *               body: 1
 *       401:
 *          description: Error response - Error creating Category
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Unauthorized'
 *       404:
 *         description: Error response - Category not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CategoryNotFound'
 *       500:
 *          description: Error response - Internal server error
*/
router.delete('/:id', verifyUsers, isAdmin, destroy)

module.exports = router
