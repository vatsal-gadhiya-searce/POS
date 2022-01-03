import {action, observable} from "mobx";
import BasePage from "../BasePage";
import ServiceStation from "../../components/service-station/ServiceStation";

export default class ServiceStationPage extends BasePage{
    component = ServiceStation;

    @observable isLoading = true;

    @action
    load(){
        this.isLoading = false;
    }
}