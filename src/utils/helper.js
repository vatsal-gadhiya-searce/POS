import jQuery from "jquery";
import _ from "lodash";

export function getFormatDate(date, format = 'd-m-y') {
    let today = date;
    let dd = today.getDate();
    let mm = today.getMonth() + 1;
    if (dd < 10) {
        dd = '0' + dd;
    }

    if (mm < 10) {
        mm = '0' + mm;
    }
    format = format.replace('y', today.getFullYear());
    format = format.replace('d', dd);
    return format.replace('m', mm);
}

export function getFormatTime(date) {
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0' + minutes : minutes;
    return hours + ':' + minutes + ' ' + ampm;
}

export function checkIsValid(value) {
    try {
        return JSON.parse(value)
    } catch (e) {
        return [];
    }
}

export function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) === 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

export function setCookie(cname, cvalue, exdays) {
    let d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    let expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

export function removeCharacter(string = '', startPosition = 0, endPosition = 1) {
    return string.substr(startPosition, string.length - endPosition);
}


export function scrollToBottomOfElement(parentElement = '.order-list', childElement = ".order-list .order-item") {
    setTimeout(() => {
        let element = jQuery(childElement);
        jQuery(parentElement).animate({
            scrollTop: element.length * element.height()
        }, 'fast');
    }, 100)
}

export function getSumOfItems(items, key) {
    let sum = _.sum(
        _.map(items, (value) => {
            return value[key];
        })
    );
    return sum ? sum : 0;
}

export function getSumOfQuantity(items, key) {
    let sum = _.sum(
        _.map(items, (value) => {
            return value[key];
        })
    );
    return sum ? sum : 0;
}