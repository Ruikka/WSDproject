import { executeQuery } from "../database/database.js";

const noMorningData = {
    average_hours_slept: null,
    average_sleep_quality: null,
    average_morningMood: null
  }
  
  const noEveningData = {
    average_sports_time: null,
    average_study_time: null,
    average_eating_quality: null,
    average_eveningMood: null
  }
  
  const getDate = (y, m, d) => {
    var day = ''
    var month = ''

    if (d < 10) {
        day = '0' + d
    } else {
        day = d
    }

    if (m < 10) {
        month = '0' + m
    } else {
        month = m
    }
    return y+"-"+month+"-"+day
  }
  
  // Summary of all user data
  const getSummary = async() => {
    var morningAVG = await executeQuery("SELECT AVG(hours_slept)::numeric(10,2) as average_hours_slept, AVG(sleep_quality)::numeric(10,2) as average_sleep_quality, AVG(mood)::numeric(10,2) as average_morningMood FROM morning_reports");
    var eveningAVG = await executeQuery("SELECT AVG(sports_time)::numeric(10,2) as average_sports_time, AVG(study_time)::numeric(10,2) as average_study_time, AVG(eating)::numeric(10,2) as average_eating_quality, AVG(mood)::numeric(10,2) as eveningMood FROM evening_reports");
    var moodAVG = await executeQuery("SELECT AVG(mood)::numeric(10,2) as overall_average_mood FROM (SELECT mood, date FROM morning_reports UNION SELECT mood, date FROM evening_reports) as something");
    
    if (!morningAVG || morningAVG.rowCount === 0) {
      morningAVG  = noMorningData
    } else {
      morningAVG = morningAVG.rowsOfObjects()[0]
    }
    if (!eveningAVG  || eveningAVG.rowCount === 0) {
      eveningAVG  = noEveningData
    } else {
      eveningAVG  = eveningAVG.rowsOfObjects()[0]
    }
    if (!moodAVG  || moodAVG.rowCount === 0) {
      moodAVG  = {overall_average_mood: null}
    } else {
      moodAVG  = moodAVG.rowsOfObjects()[0]
    }
    
    const summary = {
      ...morningAVG,
      ...eveningAVG,
      ...moodAVG 
    }
    //console.log("------------- Summary ---------------")
    //console.log(summary)
    return summary
  }
  
  // Summary of all user data for a specific date (year, month, day)
  const getSummaryDate = async(year, month, day) => {
    var date = getDate(year, month, day)
    var morningAVG = await executeQuery("SELECT AVG(hours_slept)::numeric(10,2) as average_hours_slept, AVG(sleep_quality)::numeric(10,2) as average_sleep_quality, AVG(mood)::numeric(10,2) as average_morningMood FROM morning_reports WHERE date = $1", date);
    var eveningAVG = await executeQuery("SELECT AVG(sports_time)::numeric(10,2) as average_sports_time, AVG(study_time)::numeric(10,2) as average_study_time, AVG(eating)::numeric(10,2) as average_eating_quality, AVG(mood)::numeric(10,2) as average_eveningMood FROM evening_reports WHERE date = $1", date);
    var moodAVG = await executeQuery("SELECT AVG(mood)::numeric(10,2) as overall_average_mood FROM (SELECT mood, date FROM morning_reports UNION SELECT mood, date FROM evening_reports) as something WHERE date =  $1", date);
    
    if (!morningAVG || morningAVG.rowCount === 0) {
      morningAVG = noMorningData
    } else {
      morningAVG = morningAVG.rowsOfObjects()[0]
    }
    if (!eveningAVG || eveningAVG.rowCount === 0) {
      eveningAVG = noEveningData
    } else {
      eveningAVG = eveningAVG.rowsOfObjects()[0]
    }
    if (!moodAVG || moodAVG.rowCount === 0) {
      moodAVG = {overall_average_mood: null}
    } else {
      moodAVG = moodAVG.rowsOfObjects()[0]
    }
    
    const summary = {
      ...morningAVG,
      ...eveningAVG,
      ...moodAVG
    }
    //console.log("----------- Summary -------------")
    //console.log(summary)
    return summary
  }
  
  // Summary of specific users data for a specific week
  const getWeekSummary = async(user_id, year, week) => {
    var morningAVG= await executeQuery(
      `SELECT AVG(hours_slept)::numeric(10,2) as average_hours_slept, AVG(sleep_quality)::numeric(10,2) as average_sleep_quality, AVG(mood)::numeric(10,2) as average_morningMood
      FROM (SELECT t1.*, DATE_PART('week',date) as week, DATE_PART('year',date) as year FROM morning_reports as t1 WHERE user_id = $3) as something
      WHERE year = $1 AND week = $2`, year, week, user_id)
    var eveningAVG = await executeQuery(
      `SELECT AVG(sports_time)::numeric(10,2) as average_sports_time, AVG(study_time)::numeric(10,2) as average_study_time, AVG(eating)::numeric(10,2) as average_eating_quality, AVG(mood)::numeric(10,2) as average_eveningMood
      FROM (SELECT t1.*, DATE_PART('week',date) as week, DATE_PART('year',date) as year FROM evening_reports as t1 WHERE user_id = $3) as something
      WHERE year = $1 AND week = $2`, year, week, user_id)
    var moodAVG = await executeQuery(
      `SELECT AVG(mood)::numeric(10,2) as overall_average_mood
      FROM (SELECT mood, DATE_PART('week',date) as week, DATE_PART('year',date) as year FROM morning_reports WHERE user_id = $3
            UNION 
            SELECT mood, DATE_PART('week',date) as week, DATE_PART('year',date) as year FROM evening_reports WHERE user_id = $3) as something
      WHERE year = $1 AND week = $2`, year, week, user_id)
  
    if (!morningAVG || morningAVG.rowCount === 0) {
        morningAVG = noMorningData
    } else {
      morningAVG = morningAVG.rowsOfObjects()[0]
    }
    if (!eveningAVG || eveningAVG.rowCount === 0) {
        eveningAVG = noEveningData
    } else {
        eveningAVG = eveningAVG.rowsOfObjects()[0]
    }
    if (!moodAVG || moodAVG.rowCount === 0) {
        moodAVG = {overall_average_mood: null}
    } else {
        moodAVG = moodAVG.rowsOfObjects()[0]
    }
    
    const summary = {
      ...morningAVG,
      ...eveningAVG,
      ...moodAVG
    }
    //console.log("- Summary -")
    //console.log(summary)
    return summary
  }
  
  // Summary of specific users specific month data
  const getMonthSummary = async(user_id, year, month) => {
    var morningAVG = await executeQuery(
      `SELECT AVG(hours_slept)::numeric(10,2) as average_hours_slept, AVG(sleep_quality)::numeric(10,2) as average_sleep_quality, AVG(mood)::numeric(10,2) as average_morningMood
      FROM (SELECT t1.*, DATE_PART('month',date) as month, DATE_PART('year',date) as year FROM morning_reports as t1 WHERE user_id = $3) as something
      WHERE year = $1 AND month = $2`, year, month, user_id)
    var eveningAVG = await executeQuery(
      `SELECT AVG(sports_time)::numeric(10,2) as average_sports_time, AVG(study_time)::numeric(10,2) as average_study_time, AVG(eating)::numeric(10,2) as average_eating_quality, AVG(mood)::numeric(10,2) as average_eveningMood
      FROM (SELECT t1.*, DATE_PART('month',date) as month, DATE_PART('year',date) as year FROM evening_reports as t1 WHERE user_id = $3) as something
      WHERE year = $1 AND month = $2`, year, month, user_id)
    var totalmoodAVG = await executeQuery(
      `SELECT AVG(mood)::numeric(10,2) as overall_average_mood
      FROM (SELECT mood, DATE_PART('month',date) as month, DATE_PART('year',date) as year FROM morning_reports WHERE user_id = $3
            UNION 
            SELECT mood, DATE_PART('month',date) as month, DATE_PART('year',date) as year FROM evening_reports WHERE user_id = $3) as something
      WHERE year = $1 AND month = $2`, year, month, user_id)
  
    if (!morningAVG || morningAVG.rowCount === 0) {
        morningAVG = noMorningData
    } else {
        morningAVG = morningAVG.rowsOfObjects()[0]
    }
    if (!eveningAVG || eveningAVG.rowCount === 0) {
        eveningAVG = noEveningData
    } else {
        eveningAVG = eveningAVG.rowsOfObjects()[0]
    }
    if (!totalmoodAVG || totalmoodAVG.rowCount === 0) {
        totalmoodAVG = {overall_average_mood: null}
    } else {
        totalmoodAVG = totalmoodAVG.rowsOfObjects()[0]
    }
  
    const summary = {
      ...morningAVG,
      ...eveningAVG,
      ...totalmoodAVG
    }
    //console.log("-------------- Summary ----------------")
    //console.log(summary)
    return summary
  }

  //get a spesific users mood from a spesific day
  const getMood = async(user_id, year, month, day) => {
    var date = getDateFormated(year, month, day)
    var moodAVG = await executeQuery("SELECT AVG(mood)::numeric(10,2) as overall_average_mood FROM (SELECT mood, date FROM morning_reports WHERE user_id = $2 UNION SELECT mood, date FROM evening_reports WHERE user_id = $2) as something WHERE date =  $1", date, user_id);
    if (!moodAVG || moodAVG.rowCount === 0) {
        moodAVG = {overall_average_mood: null}
    } else {
        moodAVG = moodAVG.rowsOfObjects()[0]
    }
    var res = moodAVG.overall_average_mood
    return res
  }
  
  export { getSummary, getSummaryDate, getWeekSummary, getMonthSummary, getMood };