import AlertService from './alert-service';
export default class TestAlert {
  constructor(msg) {
    this._msg = msg;
  }
  trigger() {
    AlertService(this._msg);
  }
}
