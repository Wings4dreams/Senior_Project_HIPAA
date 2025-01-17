import React from 'react';
import jwt from 'jwt-decode';
import CookieProvider from './CookieProvider';

const TokenProvider = {
    //setTokens: function(access_token, refresh_token) {
        //localStorage.setItem("ACCESS_TOKEN", access_token);
        //localStorage.setItem("REFRESH_TOKEN", refresh_token);
    //},

    getAccessToken: function() {
        return CookieProvider.getCookie("JWTCookie")
        //return localStorage.getItem("ACCESS_TOKEN");
    },

    //getRefreshToken: function() {
        //return localStorage.getItem("REFRESH_TOKEN");
    //},

    getExpirationDate: function(jwtToken) {
        if (jwtToken === null || jwtToken === 'null') {
            return null;
        }
        if (!jwtToken) {
            return null;
        }
    
        const jwt = JSON.parse(atob(jwtToken.split('.')[1]));
    
        // multiply by 1000 to convert seconds into milliseconds
        return jwt && jwt.exp && jwt.exp * 1000;
    },

    
    isExpired: function(expirationDate) {
        if (expirationDate === null || expirationDate === 'null') {
            return true;
        }

        return Date.now() > expirationDate; /* Returns true if the expiration is invalid/expired */
    },

    getToken: async function() {
        if (CookieProvider.getCookie("JWTCookie") == null) {
            return null;
        }
        
        if (isExpired(getExpirationDate(CookieProvider.getCookie("JWTCookie")))) {
            /*
            const updatedToken = await fetch('/update-token', {
                method: 'POST',
                // send refresh token
                // method to update token 
            })
                .then(r => r.json());
            */

            // setTokens(updatedToken, updatedRefreshToken);
        }

        return CookieProvider.getCookie("JWTCookie")
    },

    getEmail: function() {
        let token = CookieProvider.getCookie("JWTCookie");
        let decoded = jwt(token);
        return decoded.sub;
    },

    isLoggedIn: function() { 
        // if (localStorage.getItem("ACCESS_TOKEN")) return false;
        console.log("Is logged in :" + isExpired(getExpirationDate(CookieProvider.getCookie("JWTCookie"))))
        if ((isExpired(getExpirationDate(CookieProvider.getCookie("JWTCookie"))))) {
            return false;
        }
        else {
            return true;
        }
    }

}

export default TokenProvider; /** EXPORT FUNCTIONS */




/** defined functions that are used in above functions */
function getExpirationDate(jwtToken) {
    if (jwtToken === null || jwtToken === 'null') {
        return null;
    }

    const jwt = JSON.parse(atob(jwtToken.split('.')[1]));

    // multiply by 1000 to convert seconds into milliseconds
    return jwt && jwt.exp && jwt.exp * 1000;
}


function isExpired (expirationDate) {
    if (expirationDate === null || expirationDate === 'null') {
        return true;
    }
    if (!expirationDate) {
        return true;
    }

    return Date.now() > expirationDate; /* Returns true if the expiration is invalid/expired */
}