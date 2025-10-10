// caching session data
import { auth } from "@/auth";
import { cache } from "react";

export const cachedAuth = cache(auth);

// Date function
const MONTH_NAMES = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'] as const;

export const formatDate = (date: Date | string | number | null | undefined, showTime: boolean = false): string => {
    if (!date) return '';

    try {
        const dateObj = new Date(date);

        // Check for invalid date
        if (isNaN(dateObj.getTime())) return '';

        const day = dateObj.getDate().toString().padStart(2, '0');
        const month = MONTH_NAMES[dateObj.getMonth()];
        const year = dateObj.getFullYear();

        let formattedDate = `${day} ${month}, ${year}`;

        if (showTime) {
            const hours = dateObj.getHours().toString().padStart(2, '0');
            const minutes = dateObj.getMinutes().toString().padStart(2, '0');
            const seconds = dateObj.getSeconds().toString().padStart(2, '0');
            formattedDate += ` ${hours}:${minutes}:${seconds}`;
        }

        return formattedDate;
    } catch (error) {
        return '';
    }
};

// Truncate text function
export const truncateText = (text: string | undefined, charLimit: number) => {
    if (!text) return '';
    if (text.length <= charLimit) {
        return text;
    }
    return text.substring(0, charLimit) + '...';
};

// Capitalize function
export function capitalize<T>(data: T): T {
    if (typeof data === 'string') {
        return (data.charAt(0).toUpperCase() + data.slice(1)) as T;
    }
    if (Array.isArray(data)) {
        return data.map(item => capitalize(item)) as T;
    }
    if (typeof data === 'object' && data !== null) {
        const result: any = {};
        for (const key in data) {
            if (Object.prototype.hasOwnProperty.call(data, key)) {
                result[key] = capitalize((data as any)[key]);
            }
        }
        return result;
    }
    return data;
}


// Query handler
import qs from 'query-string'

type TUrlQueryParams = {
    params: string
    key: string
    value: string | null
}

export function formUrlQuery({ params, key, value }: TUrlQueryParams) {

    const currentUrl = qs.parse(params)

    currentUrl[key] = value

    return qs.stringifyUrl({
        url: window.location.pathname,
        query: currentUrl,
    }, { skipNull: true }
    )
}

type TRemoveUrlQueryParams = {
    params: string
    keysToRemove: string[]
}

export function removeKeysFromQuery({ params, keysToRemove }: TRemoveUrlQueryParams) {
    const currentUrl = qs.parse(params)

    keysToRemove.forEach(key => {
        delete currentUrl[key]
    })

    return qs.stringifyUrl(
        {
            url: window.location.pathname,
            query: currentUrl,
        },
        { skipNull: true }
    )
}

// Email body parser

function decodeBase64Url(data: any) {
    const b64 = data.replace(/-/g, '+').replace(/_/g, '/');
    return decodeURIComponent(escape(window.atob(b64)));
}

export function getMessageBody(payload: any, isHtml = true): string {
    if (payload.parts && payload.parts.length) {

        if (isHtml) {
            const htmlPart = payload.parts.find(
                (part: any) => part.mimeType === "text/html"
            );
            if (htmlPart && htmlPart.body && htmlPart.body.data) {
                return decodeBase64Url(htmlPart.body.data);
            }
        } else {
            const textPart = payload.parts.find(
                (part: any) => part.mimeType === "text/plain"
            );

            if (textPart && textPart.body && textPart.body.data) {
                return decodeBase64Url(textPart.body.data);
            }
        }

    }

    if (payload.body && payload.body.data) {
        return decodeBase64Url(payload.body.data);
    }

    return "";
}