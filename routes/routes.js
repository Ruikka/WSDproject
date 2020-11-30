import { Router } from "../deps.js";
import { hello, login, logout, behavior, summary, register, morning, evening} from "./controllers/viewController.js";

const router = new Router();

router.get('/', hello); //default landing page here
router.get('/auth/registration', register) //registration accessible from here
//router.post('/auth/registration', registerUser) //registers user
router.get('/auth/login', login); //login form accessible from here
//router.post('/auth/login', helloApi.getHello); //logs user in
router.get('/auth/logout', logout); //logout button is here
//router.post('/auth/logout', helloApi.setHello); //logs user out
router.get('/behavior/reporting', behavior); //reporting form accessible from here
router.get('/behavior/summary', summary); //report summary accessible from here
router.get('/behavior/reporting/morning', morning); //morning report accessible from here
router.get('/behavior/reporting/evening', evening); //evening report accessible from here



export { router };