const router = require('express').Router()

const { post, login, getUserByToken } = require('../controllers/users')
const { schemaValidator } = require('../middlewares/validator')
const { user } = require('../schemas/user')
const { isAuthenticatedUser } = require('../middlewares/auth')

/**
 * @swagger
 * components:
 *  securitySchemes:
 *      ApiKeyAuth:
 *          type: apiKey
 *          in: header
 *          name: authorization
 *  schemas:
 *      User:
 *          type: object
 *          properties:
 *              id:
 *                  type: integer
 *                  description: the auto-incremented id of the user
 *              firstName:
 *                  type: string
 *                  description: the name of the user
 *              lastName:
 *                  type: string
 *                  description: the lastname of the user
 *              email:
 *                  type: string
 *                  description: the email of the user
 *              password:
 *                  type: string
 *                  description: the password of the user
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
 *              - firstName
 *              - lastName
 *              - email
 *              - password
 *          example:
 *              firstName: name
 *              lastName: lastname
 *              email: example@alkemy.com
 *              password: Passsword1.
 *              roleId: 1
 *              createdAt: 2022-07-12 18:41:45
 *              updatedAt: 2022-07-12 18:41:45
 *              deletedAt: null
 *
 *      LoginUser:
 *          type: object
 *          properties:
 *              email:
 *                  type: string
 *                  description: the email of the user
 *              password:
 *                  type: string
 *                  description: the password of the user
 *          required:
 *              - email
 *              - password
 *          example:
 *              email: example@alkemy.com
 *              password: Passsword1.
 */

/**
 * @swagger
 *  /auth/register:
 *  post:
 *      summary: create a user
 *      tags: [User]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      $ref: '#/components/schemas/User'
 *      responses:
 *          200:
 *              description: user created successfully
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
 *                                      firstName:
 *                                          type: string
 *                                      lastName:
 *                                          type: string
 *                                      email:
 *                                          type: string
 *                                      password:
 *                                          type: string
 *                                      roleId:
 *                                          type: integer
 *                                      createdAt:
 *                                          type: string
 *                                          format: date-time
 *                                      updatedAt:
 *                                          type: string
 *                                          format: date-time
 *                          example:
 *                              firstName: name
 *                              lastName: lastname
 *                              email: examplealkemy.com
 *                              password: password
 *                              roleId: 1
 *                              createdAt: 2022-07-12 18:41:45
 *                              updatedAt: 2022-07-12 18:41:45
 *          403:
 *              description: Parameter missing
 *          500:
 *              description: Error response - Internal server error
 */
router.post('/register', schemaValidator(user), post)

/**
 * @swagger
 *  /auth/login:
 *  post:
 *      summary: login a user
 *      tags: [User]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      $ref: '#/components/schemas/LoginUser'
 *      responses:
 *          200:
 *              description: user logged in successfully
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
 *                                      firstName:
 *                                          type: string
 *                                      lastName:
 *                                          type: string
 *                                      email:
 *                                          type: string
 *                                      password:
 *                                          type: string
 *                                      photo:
 *                                          type: string
 *                                      roleId:
 *                                          type: integer
 *                                      createdAt:
 *                                          type: string
 *                                          format: date-time
 *                                      updatedAt:
 *                                          type: string
 *                                          format: date-time
 *                                      token:
 *                                          type: string
 *                          example:
 *                              firstName: name
 *                              lastName: lastname
 *                              email: example@alkemy.com
 *                              password: password
 *                              photo: https://www.egames.news/__export/1636396870396/sites/debate/img/2021/11/08/hisoka-hunter-x-hunter.jpg_242310155.jpg
 *                              roleId: 1
 *                              createdAt: 2022-07-12 18:41:45
 *                              updatedAt: 2022-07-12 18:41:45
 *                              token: token
 *          401:
 *              description: Invalid credentials
 *          500:
 *              description: Arguments required
 */
router.post('/login', login)

/**
 * @swagger
 *  /auth/me:
 *  get:
 *      summary: get user data
 *      tags: [User]
 *      security:
 *          - ApiKeyAuth: []
 *      responses:
 *          200:
 *              description: user successfully
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
 *                                      firstName:
 *                                          type: string
 *                                      lastName:
 *                                          type: string
 *                                      email:
 *                                          type: string
 *                                      password:
 *                                          type: string
 *                                      photo:
 *                                          type: string
 *                                      roleId:
 *                                          type: integer
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
 *                              firstName: name
 *                              lastName: lastname
 *                              email: example@alkemy.com
 *                              password: password
 *                              photo: https://www.egames.news/__export/1636396870396/sites/debate/img/2021/11/08/hisoka-hunter-x-hunter.jpg_242310155.jpg
 *                              roleId: 1
 *                              createdAt: 2022-07-12 18:41:45
 *                              updatedAt: 2022-07-12 18:41:45
 *                              deletedAt: null
 *          403:
 *              description: Invalid token
 */
router.get('/me', isAuthenticatedUser, getUserByToken)

module.exports = router
