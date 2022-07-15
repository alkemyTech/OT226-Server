const router = require('express').Router()

const {
  get, post, destroy, put,
} = require('../controllers/members')
const { schemaValidator } = require('../middlewares/validator')
const { member } = require('../schemas/member')
const { verifyUsers } = require('../middlewares/auth')

/**
 * @swagger
 * components:
 *  securitySchemes:
 *    ApiKeyAuth:
 *      type: apiKey
 *      in: header
 *      name: authorization
 *  schemas:
 *    Members:
 *      type: object
 *      properties:
 *        id:
 *          type: number
 *          description: id auto-generated of members
 *        name:
 *          type: string
 *          description: name of member
 *        facebookUrl:
 *          type: string
 *          description: url of facebook profile
 *        instagramUrl:
 *          type: string
 *          description: url of instagram profile
 *        linkedinUrl:
 *          type: string
 *          description: url of linkedin profile
 *        image:
 *          type: string
 *          description: image member
 *        createdAt:
 *          type: string
 *          format: date-time
 *          description: member creation date
 *        updatedAt:
 *          type: string
 *          format: date-time
 *          description: member update date
 *        deletedAt:
 *          type: string
 *          format: date-time
 *          description: soft-delete date of member
 *      required:
 *        - name
 *      example:
 *        id: 1
 *        name: member1
 *        facebookUrl: https://facebook.com/profile
 *        instagramUrl: https://instagram.com/profile
 *        linkedinUrl: https://linkedin.com/profile
 *        image: https://images.com/
 *        createdAt: 2022-07-11T00:00:00.000Z
 *        updatedAt: 2022-07-12T00:00:00.000Z
 *        deletedAt: null
 *    MemberNotFound:
 *      type: Object
 *      properties:
 *        message:
 *          type: string
 *          description: A message for the not found members
 *        statusCode:
 *          type: number
 *          description: Http Status Code
 *      example:
 *        message: Member not found
 *        statusCode: 404
 *    Unauthorized:
 *        properties:
 *          message:
 *            type: string
 *            description: A message for the member not created
 *          code:
 *           type: number
 *           description: Http Status Code
 *        example:
 *          code: 401
 *          message: JWT must be provided
 * parameters:
 *    MemberID:
 *      in: path
 *      name: id
 *      schema:
 *        type: number
 *        required: true
 *        description: The category id number
 */
/**
 * @swagger
 * /members:
 *  get:
 *    summary: Return a Members list
 *    tags: [Members]
 *    responses:
 *      200:
 *        description: Successful response - Members retrieved successfully
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              properties:
 *                code:
 *                  type: number
 *                  format: number
 *                status:
 *                  type: boolean
 *                  format: boolean
 *                message:
 *                  type: string
 *                  format: string
 *                body:
 *                    type: array
 *                    properties:
 *                      name:
 *                        type: string
 *                        format: string
 *              items:
 *                  $ref: '#/components/schemas/Members'
 *      404:
 *        description: Error response - Member not found
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/MemberNotFound'
 *      500:
 *        description: Error response - Internal server error
 */
router.get('/', get)
/**
 * @swagger
 * /members:
 *   post:
 *     summary: Create a new Member
 *     tags: [Members]
 *     security:
 *      - ApiKeyAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *            name:
 *              type: string
 *              description: name of member
 *              required: true
 *            facebookUrl:
 *              type: string
 *              description: facebook-Url of member
 *              required: true
 *            instagramUrl:
 *              type: string
 *              description: instagram-Url of member
 *              required: true
 *            linkedinUrl:
 *              type: string
 *              description: linkedin-Url of member
 *              required: true
 *            image:
 *              type: string
 *              description: image of member
 *              required: true
 *     responses:
 *        200:
 *          description: Successful response - Member successfully created
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
 *                  name: member1
 *                  facebookUrl: https://facebook.com/profile
 *                  instagramUrl: https://instagram.com/profile
 *                  linkedinUrl: https://linkedin.com/profile
 *                  image: https://images.com/
 *                  createdAt: 2022-07-11T00:00:00.000Z
 *                  updatedAt: 2022-07-12T00:00:00.000Z
 *        401:
 *          description: Error response - Error creating Member
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Unauthorized'
 *        500:
 *          description: Error response - Internal server error
 */
router.post('/', schemaValidator(member), post)
/**
 * @swagger
 * /members/{id}:
 *   put:
 *     summary: Update a Member by ID
 *     tags: [Members]
 *     parameters:
 *       - $ref: '#/components/parameters/MemberID'
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
 *                 description: the name of member
 *                 required: true
 *               facebookUrl:
 *                 type: string
 *                 description: facebook-url of member
 *                 required: false
 *               instagramUrl:
 *                 type: string
 *                 description: instagram-url of member
 *                 required: false
 *               linkedinUrl:
 *                 type: string
 *                 description: linkedin-url of member
 *                 required: false
 *           example:
 *            name: update member
 *            facebookUrl: update facebook-Url
 *            instagramUrl: update instagram-Url
 *            linkedinUrl: update linkedin-Url
 *            image: update image
 *            createdAt: 2022-07-11T00:00:00.000Z
 *            updatedAt: 2022-07-12T00:00:00.000Z
 *     responses:
 *       200:
 *         description: Successful response - Member successfully updated
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
 *               message: Member successfully updated
 *               body: [1]
 *       401:
 *          description: Error response - Error updating Member
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Unauthorized'
 *       404:
 *         description: Error response - Member not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/MemberNotFound'
 *       500:
 *          description: Error response - Internal server error
*/
router.put('/:id', verifyUsers, put)
/**
 * @swagger
 * /members/{id}:
 *   delete:
 *     summary: Delete a Member by ID
 *     tags: [Members]
 *     security:
 *      - ApiKeyAuth: []
 *     parameters:
 *       - $ref: '#/components/parameters/MemberID'
 *     responses:
 *       200:
 *         description: Successful response - Member deleted successfully
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
 *                 $ref: '#/components/schemas/Members'
 *             example:
 *               code: 200
 *               status: true
 *               message: Member deleted successfully
 *               body: 1
 *       401:
 *          description: Error response - Error deleting Member
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Unauthorized'
 *       404:
 *         description: Error response - Member not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/MemberNotFound'
 *       500:
 *          description: Error response - Internal server error
*/
router.delete('/:id', verifyUsers, destroy)

module.exports = router
