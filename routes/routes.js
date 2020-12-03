import { Router } from "../deps.js";
import { root, getBehaviorReport, getMorningReport, postMorningReport, getEveningReport, postEveningReport} from "./controllers/behaviorController.js";

const router = new Router();

router.get('/', root); //default landing page here
//router.get('/auth/registration', getRegistration) //registration accessible from here
//router.post('/auth/registration', registerUser) //registers user
//router.get('/auth/login', getLogin); //login form accessible from here
//router.post('/auth/login', helloApi.getHello); //logs user in
//router.get('/auth/logout', getLogout); //logout button is here
//router.post('/auth/logout', helloApi.setHello); //logs user out
router.get('/behavior/reporting', getBehaviorReport); //reporting form accessible from here
//router.get('/behavior/summary', getSummary); //report summary accessible from here
router.get('/behavior/reporting/morning', getMorningReport); //morning report accessible from here
router.post('/behavior/reporting/morning', postMorningReport); //posting morning report.               Work on this next!
router.get('/behavior/reporting/evening', getEveningReport); //evening report accessible from here
router.post('/behavior/reporting/evening', postEveningReport)



export { router };