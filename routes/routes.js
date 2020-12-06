import { Router } from "../deps.js";
import * as behaviorContr from "./controllers/behaviorController.js";
import * as authContr from "./controllers/authController.js";
import * as summaryApi from "./apis/summaryApi.js";
import * as rootContr from "./controllers/rootController.js";

const router = new Router();

router.get('/', rootContr.getRoot); //landing page

router.get('/behavior/reporting', behaviorContr.getBehaviorReport); //reporting time choice accessible from here
router.get('/behavior/reporting/morning', behaviorContr.getMorningReport); //morning report form accessible from here
router.get('/behavior/reporting/evening', behaviorContr.getEveningReport); //evening report form accessible from here
router.post('/behavior/reporting/morning', behaviorContr.postMorningReport); //posting morning report 
router.post('/behavior/reporting/evening', behaviorContr.postEveningReport); //posting evening report

router.get('/auth/login', authContr.getLogin); //login form accessible from here
router.get('/auth/registration', authContr.getRegistration) //registration accessible from here
router.post('/auth/registration', authContr.postRegistration) //registers user
router.get('/auth/registrationSuccessful', authContr.registrationSuccessful)

router.get('/auth/login', authContr.getLogin)
router.post('/auth/login', authContr.postLogin)

router.post('/auth/logout', authContr.postLogout)

//router.get('/behavior/summary', behaviorContr.getWeeklySummary);
//router.get('/auth/logout', getLogout); //logout button is here
//router.post('/auth/logout', helloApi.setHello); //logs user out

export { router };