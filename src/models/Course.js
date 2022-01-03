import JsonParser from "../utils/JsonParser";

export default class Course {

    Id = 0 ;
    DisplayOrder = 0 ;
    Name = null ;
    IsChangable = false ;
    CourseTime = 0;

    createFromJson(json) {
        this.Id = JsonParser.int(json, 'Id');
        this.DisplayOrder = JsonParser.int(json, 'DisplayOrder');
        this.IsChangable = JsonParser.bool(json, 'IsChangable');
        this.Name = JsonParser.string(json, 'Name');
        this.CourseTime = JsonParser.int(json, 'CourseTime');
    }

    static createFromJson(json) {
        const course = new Course();
        course.createFromJson(json);
        return course;
    }
}