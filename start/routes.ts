const ConvertFilesController = () => import('#controllers/convert_files_controller')
import router from '@adonisjs/core/services/router'

router.get('/', async () => 'It works!')

router.post('/convert', [ConvertFilesController, 'store'])
