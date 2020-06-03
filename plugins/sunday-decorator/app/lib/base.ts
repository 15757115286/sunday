import { BaseApplication } from "../../../../definitions/core";

class BaseController {
    app!:BaseApplication;
    super(options:any = {}) {
        this.app = options.app;
    }
}

export default BaseController;