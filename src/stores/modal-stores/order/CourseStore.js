import {observable, action, autorun} from 'mobx';

export class CourseStore {

    @observable showCourse = false;
    @observable currentItem = null;
    @observable selectedCourse = null;
    @observable availableCourses = [];
    combineId = null;

    constructor(page) {
        this.page = page;
    }

    @action
    onShowCourse(item, combineId = null) {
        this.showCourse = true;
        this.currentItem = item;
        this.combineId = combineId;
        this.selectedCourse = item.CurrentCourse;
        autorun( () => {
            this.availableCourses = this.page.rootStore.settingStore.staticData.AvailableCourses;
        })
    };

    @action
    onClearCourse() {
        this.showCourse = false;
        this.currentItem = null;
        this.selectedCourse = {};
        this.combineId = null;
    }

    @action
    onSelectCourse(course) {
        this.selectedCourse = course;
    }

    @action
    onDone() {
       this.currentItem.CurrentCourse = this.selectedCourse;
       this.page.onCloseCourseModal(this.currentItem, this.combineId);
       this.onClearCourse();
    }
}