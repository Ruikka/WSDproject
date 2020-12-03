import * as reportService from "../../services/reportService.js";

const morningReport = async({request, response}) => {
    const body = request.body();
    const document = await body.value;
    reportService.morningReport(document);
    response.status = 200;
};

export {morningReport}