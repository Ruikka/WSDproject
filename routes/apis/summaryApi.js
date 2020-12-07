import { getSummary, getSummaryDate } from '../../services/summaryService.js'

const summary = async({response}) => {
    response.body = await getSummary()
};

const daySummary = async({response, params}) => {
    response.body = await getSummaryDate(params.year, params.month, params.day)
};
   
export { summary, daySummary };