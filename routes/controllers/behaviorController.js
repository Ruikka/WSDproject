import { executeQuery } from "../../database/database.js";

const root = ({render}) => {
  render('rootView.ejs')
};

const getBehaviorReport = ({render}) => {
  render('reportView.ejs')
};

const getMorningReport = ({render}) => {
  render('morningView.ejs')
};

const postMorningReport = async({request, response}) => {
  const body = request.body();
  const params = await body.value;
   
  const user_id = 1
  const date = params.get('date')
  const sleep_duration = Number(params.get('hours_slept'));
  const sleep_quality = Number(params.get('sleep_quality'));
  const mood = Number(params.get('mood'));

  /**Todoo:
   * - add user message 'Report submitted' with session
   */

  const existingDate = await executeQuery("SELECT * FROM morning_reports WHERE date = $1 AND user_id = $2;", date, user_id)
  if (existingDate && existingDate.rowCount > 0) {
    // Update existing report
    await executeQuery("UPDATE morning_reports SET (hours_slept, sleep_quality, mood) = ($1, $2, $3) WHERE user_id = $4;",
      sleep_duration,
      sleep_quality,
      mood,
      user_id
    );
    response.redirect('/')
  } else {
  await executeQuery("INSERT INTO morning_reports (date, hours_slept, sleep_quality, mood, user_id) VALUES ($1, $2, $3, $4, $5);", date, sleep_duration, sleep_quality, mood, user_id);

  response.redirect('/')
  }
}

const getEveningReport = ({render}) => {
  render('eveningView.ejs')
};

const postEveningReport = async({request, response}) => {
  const body = request.body();
  const params = await body.value;
   
  const user_id = 1
  const date = params.get('date')
  const sports_time = Number(params.get('sports_time'));
  const study_time = Number(params.get('study_time'));
  const eating = Number(params.get('eating'));
  const mood = Number(params.get('mood'));

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
    response.redirect('/')
  } else {
  await executeQuery("INSERT INTO evening_reports (date, sports_time, study_time, eating, mood, user_id) VALUES ($1, $2, $3, $4, $5, $6);", date, sports_time, study_time, eating, mood, user_id);

  response.redirect('/')
  }
}


export { root, getBehaviorReport, getMorningReport, postMorningReport, getEveningReport, postEveningReport };