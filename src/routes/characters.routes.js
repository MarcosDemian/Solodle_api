import express from 'express';
import { login, register } from '../controllers/authController.js';
import { authenticateToken } from '../middlewares/authenticateToken.js';
import { authorizeRole } from '../middlewares/authorizeRole.js';
import * as characterController from '../controllers/character/characterController.js';
import * as attributeController from '../controllers/attribute/attributeController.js';
import upload from '../config/upload.js';

const router = express.Router();

router.post('/login', login);
router.post('/register', register);

// Rutas para attribute
router.get('/attributes', authenticateToken, authorizeRole('user', 'admin'), attributeController.getAllAttributes); 
router.get('/attributes/:id', authenticateToken, authorizeRole('user', 'admin'), attributeController.getAttributeById); 
router.post('/attributes', authenticateToken, authorizeRole('admin'), attributeController.createAttribute); 
router.patch('/attributes/:id', authenticateToken, authorizeRole('admin'), attributeController.updateAttribute); 
router.delete('/attributes/:id', authenticateToken, authorizeRole('admin'), attributeController.deleteAttribute); 

// Rutas para character
router.get('/random-character', authenticateToken, authorizeRole('user', 'admin'), characterController.getRandomCharacter);
router.get('/', authenticateToken, authorizeRole('user', 'admin'), characterController.getAllCharacters);
router.get('/:id', authenticateToken, authorizeRole('user', 'admin'), characterController.getCharacterById);
router.get('/gender/:gender', authenticateToken, authorizeRole('user', 'admin'), characterController.getCharactersByGender);
router.get('/species/:species', authenticateToken, authorizeRole('user', 'admin'), characterController.getCharactersBySpecies);
router.get('/affiliation/:affiliation', authenticateToken, authorizeRole('user', 'admin'), characterController.getCharactersByAffiliation);
router.get('/attribute/:id/attributes', authenticateToken, authorizeRole('user', 'admin'), characterController.getCharacterAttributes);
router.post('/', authenticateToken, authorizeRole('admin'), upload.single('image'), characterController.createCharacter);
router.patch('/:id', authenticateToken, authorizeRole('admin'), characterController.updateCharacter);
router.delete('/:id', authenticateToken, authorizeRole('admin'), characterController.deleteCharacter);

export default router;