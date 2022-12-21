export class CookieHelper {
    static getCookie(cookieName, returnValueOnError = ""): string {
        let name = cookieName + "=";
        let cookieString = document.cookie;
        let cookies = cookieString.split(";");

        for (let i = 0; i < cookies.length; i++) {
            let cookie = cookies[i];

            while (cookie.charAt(0) == ' ') {
                cookie = cookie.substring(1);
            }

            if (cookie.indexOf(name) == 0) {
                return cookie.substring(name.length, );
            }
        }

        return returnValueOnError;
    }

    static setCookie(cookieName: string, cookieValue){
        document.cookie = cookieName + "=" + cookieValue;
    }
}