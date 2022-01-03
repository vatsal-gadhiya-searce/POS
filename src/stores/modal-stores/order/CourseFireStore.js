import {observable, action} from 'mobx';
import _ from 'lodash';

export class CourseFireStore {

    @observable isCourseFireModal = false;
    @observable courses = _.range(1, 4);

    constructor(page) {
        this.page = page;
    }

    @action
    onShowCourseFireModal() {
        this.isCourseFireModal = !this.isCourseFireModal;
    };

    @action
    onFireCourse(value) {
        console.log(value);
        this.isCourseFireModal = false;
    }
}
