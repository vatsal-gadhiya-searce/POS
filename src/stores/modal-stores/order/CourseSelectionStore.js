import {observable, action} from 'mobx';
import _ from 'lodash';

export class CourseSelectionStore {

    @observable isSeatSelectionModal = false;
    @observable selectedSeat = null;

    @observable isCourseSelectionModal = false;
    @observable selectedCourse = null;
    @observable courses = _.range(1, 12).map((value) => {
        return "Course " + value;
    });

    @observable seats = _.range(1, 6).map((value) => {
        return "Seat " + value;
    });

    constructor(page) {
        this.page = page;
    }

    @action
    onShowSeatSelectionModal() {
        this.isSeatSelectionModal = !this.isSeatSelectionModal;
    }

    @action
    onClickSeat = (seat) => {
        this.selectedSeat = seat;
        this.isSeatSelectionModal = false;
        this.isCourseSelectionModal = true;

    };

    @action
    onShowCourseSelectionModal() {
        this.isCourseSelectionModal = !this.isCourseSelectionModal;
    }

    @action
    onClickCourse = (course) => {
        this.selectedCourse = course;
        this.isCourseSelectionModal = false;
        this.page.modifierStore.showModifier = true;
    };
}
