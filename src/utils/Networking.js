import SubmissionError from "./SubmissionError";

class Networking {

    static get = (url) => {

        return fetch(url, {
            headers: {
                "Accept": "application/json",
            },
        })
            .then(Networking.handleMessages)
            .then((response) => response.json())
            .catch(console.log);
    };

    static post = (url, data = {}, method = 'POST') => {
        return fetch(url, {
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
            },
            method,
            body: JSON.stringify(data),
        })
            .then(Networking.handleMessages)
            .then((response) => response.json());
    };

    /**
     * handle errors from api endpoints
     * @param response
     */
    static async handleMessages(response) {
        if (response.status === 422) {
            const json = await response.json();
            const errors = {};
            Object.keys(json.errors).forEach((key) => {
                errors[key] = json.errors[key];
            });
            throw new SubmissionError({...errors, _error: json.message});
        }
        return response;
    }
}

export default Networking;
