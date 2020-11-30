import * as helloService from "../../services/registerService.js";

const Registration = async({request, response}) => {
    const body = request.body();
    const document = await body.value;
    helloService.registerUser(document);
    response.status = 200;
};

export {Registration}