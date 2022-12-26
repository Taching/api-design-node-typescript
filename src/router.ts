import { createUpdate, deleteUpdate, getOneUpdate, getUpdates, updateUpdate } from './handlers/update';
import { getOneProduct, getProducts, createProduct, deleteProduct, updateProduct } from './handlers/product';
import {Router} from 'express'
import { body, oneOf, validationResult } from 'express-validator'
import { handleInputErrors } from './modules/middleware'

const router = Router()

/**
 * /Product
 */

router.get('/product', getProducts)
router.get('/product/:id', getOneProduct)
router.put('/product/:id', body('name').isString(), handleInputErrors, updateProduct)
router.post('/product',body('name').isString(), handleInputErrors, createProduct)
router.delete('/product/:id', deleteProduct)

/**
 * Update
 */

router.get('/update', getUpdates)
router.get('/update/:id', getOneUpdate)
router.put('/update/:id',
    body('title').optional(),
    body('body').optional(),
    body('status').isIn(['IN_PROGRESS', 'SHIPPED', 'DEPRECATED']).optional(),
    body('version').optional(),
    handleInputErrors,
    updateUpdate
)
router.post('/update',
    body('title').exists().isString(),
    body('body').exists().isString(),
    body('productId').exists().isString(),
    createUpdate
    )
router.delete('/update/:id', deleteUpdate)

/**
 * Update Point
 */

router.get('/updatepoint', () => {})
router.get('/updatepoint/:id', () => {})
router.put('/updatepoint/:id',
    body('title').optional().isString(),
    body('description').optional().isString(),
    () => {}
)
router.post('/updatepoint',
    body('title').optional().isString(),
    body('description').optional().isString(),
    () => {}
)
router.delete('/updatepoint/:id', () => {})

export default router