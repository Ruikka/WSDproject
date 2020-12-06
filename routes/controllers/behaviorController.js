import { executeQuery } from "../../database/database.js";
import { validate, required, numberBetween, isNumber, isInt, isDate } from '../../deps.js'
import {getWeekSummary, getMonthSummary,} from '../../services/summaryService.js'

const root = ({render}) => {
  render('rootView.ejs')
};

const getBehaviorReport = ({render}) => {
  render('reportView.ejs')
};

const getMorningReport = ({render}) => {
  render('morningView.ejs')
};

const postMorningReport = async({request, response, render, session}) => {
  //const user = await session.get('user');
  const user_id = 1 //user.id

  const body = request.body();
  const params = await body.value;

  const date = params.get('date')
  const hours_slept = Number(params.get('hours_slept'));
  const sleep_quality = Number(params.get('sleep_quality'));
  const mood = Number(params.get('mood'));

  //data is for validation
  const data = {}
  data.date = date
  data.hours_slept = hours_slept
  data.sleep_quality = sleep_quality
  data.mood = mood

  const validationRules = {
    date: [required, isDate],
    hours_slept: [required, isNumber, numberBetween(0,24)],
    sleep_quality: [required, isInt, numberBetween(1,5)],
    mood: [required, isInt, numberBetween(1,5)]
  }

  const [passes, errors] = await validate(data, validationRules)
  console.log(passes)
  console.log(errors)

  if (!passes) {
    render('morningView.ejs', {...data, errors: errors})
    return
  }

  /**Todoo:
   * - add user message 'Report submitted' with session
   */

  const existingDate = await executeQuery("SELECT * FROM morning_reports WHERE date = $1 AND user_id = $2;", date, user_id)
  if (existingDate && existingDate.rowCount > 0) {
    // Update existing report
    await executeQuery("UPDATE morning_reports SET (hours_slept, sleep_quality, mood) = ($1, $2, $3) WHERE user_id = $4;",
      hours_slept,
      sleep_quality,
      mood,
      user_id
    );
    await session.set('msg', `Your morning report for the date '${date}' has been changed`)
    //response.redirect('/')
  } else {
  await executeQuery("INSERT INTO morning_reports (date, hours_slept, sleep_quality, mood, user_id) VALUES ($1, $2, $3, $4, $5);", date, hours_slept, sleep_quality, mood, user_id);
  await session.set('msg', `Your morning report for the date '${date}' has been changed successfully`)
  //response.redirect('/')
  }
  response.redirect('/')
}

const getEveningReport = ({render}) => {
  render('eveningView.ejs')
};

const postEveningReport = async({request, response, render}) => {
  const body = request.body();
  const params = await body.value;
  
  const user_id = 1

  const date = params.get('date')
  const sports_time = Number(params.get('sports_time'));
  const study_time = Number(params.get('study_time'));
  const eating = Number(params.get('eating'));
  const mood = Number(params.get('mood'));

  //data is for validation
  const data = {}
  data.date = date
  data.sports_time = sports_time
  data.study_time = study_time
  data.eating = eating
  data.mood = mood

  const validationRules = {
    date: [required, isDate],
    sports_time: [required, isNumber, numberBetween(0,24)],
    study_time: [required, isNumber, numberBetween(0,24)],
    eating: [required, isInt, numberBetween(1,5)],
    mood: [required, isInt, numberBetween(1,5)]
  }

  const [passes, errors] = await validate(data, validationRules)
  console.log(passes)
  console.log(errors)

  if (!passes) {
    render('eveningView.ejs', {...data, errors: errors})
    return
  }
  

  /**Todoo:
   * - add user message 'Report submitted' with session
   */

  const existingDate = await executeQuery("SELECT * FROM evening_reports WHERE date = $1 AND user_id = $2;", date, user_id)
  if (existingDate && existingDate.rowCount > 0) {
    // Update existing report
    await executeQuery("UPDATE evening_reports SET (sports_time, study_time, eating, mood) = ($1, $2, $3, $4) WHERE user_id = $5;",
      sports_time,
      study_time,
      eating,
      mood,
      user_id
    );
    await session.set('msg', `Your evening report for the date '${date}' has been changed`)
   // response.redirect('/')
  } else {
  await executeQuery("INSERT INTO evening_reports (date, sports_time, study_time, eating, mood, user_id) VALUES ($1, $2, $3, $4, $5, $6);", date, sports_time, study_time, eating, mood, user_id);
  await session.set('msg', `Your morning report for the date '${date}' has been set successfully`)
  //response.redirect('/')
  }
}

const getSummaryView= async({render}) => {
  render('summaryView.ejs')
}

const getWeeklySummary = async({render, session}) => {
  const user = await session.get('user');
  const user_id = user.id

  const date = new Date()
  const firstDayOfYear = new Date(date.getFullYear(), 0, 1);
  const pastDaysOfYear = (date - firstDayOfYear) / 86400000;
  var week = Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7);
  var year = date.getFullYear()
  const summary = await getUserWeekSummary(user_id, year, week)
  render('summaryView.ejs', {...summary, year: year, week: week})
}


export { root, getBehaviorReport, getMorningReport, postMorningReport, getEveningReport, postEveningReport, getSummaryView, getWeeklySummary };