import Api from "./Api";
import Networking from '../utils/Networking';

export class SettingService extends Api {

    getVersion() {
        return Networking.get(this.apiUrl + 'v2/administration/settings/version');
    }

    getSettings() {
        return Networking.get(this.apiUrl + 'v2/administration/settings');
    }
}
