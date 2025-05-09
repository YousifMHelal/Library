import { Router } from "express"
import { addBook, deleteBooks, getBook, getBooks, getCategories, getShelfs, getStands, updateBook, viewLibraryPage } from "../controllers/library.controller.js"
import { authenticatedApi, authenticatedPage } from "../../authentication/middlewares/authentication.middlewares.js"

const router = Router()


router.get('/library', authenticatedPage, viewLibraryPage)

// APIS
router.get('/api/categories',authenticatedApi, getCategories)
router.get('/api/shelfs', authenticatedApi, getShelfs)
router.get('/api/stands', authenticatedApi, getStands)
router.get('/api/books', authenticatedApi, getBooks)
router.get('/api/book/:id', authenticatedApi, getBook)
router.put('/api/book/:id', authenticatedApi, updateBook)
router.post('/api/book', authenticatedApi, addBook)
router.delete('/api/book/:id', authenticatedApi, deleteBooks)

export default router