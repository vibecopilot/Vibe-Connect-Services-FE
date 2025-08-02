
// Email
export const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Phone (India: 10-digit)
export const PHONE_REGEX = /^[6-9]\d{9}$/;

export const INTERNATIONAL_PHONE_REGEX = /^\+[1-9]\d{1,14}$/;

export const NAME_BASIC_REGEX = /^[A-Za-z]+$/;

// Password (min 8 chars, at least 1 letter and 1 number)
export const PASSWORD_REGEX = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

// Strong Password (min 8 chars, at least 1 uppercase, 1 lowercase, 1 digit, 1 special char)
export const STRONG_PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?#&])[A-Za-z\d@$!%*?#&]{8,}$/;

// Username (alphanumeric, underscores, 3-20 chars)
export const USERNAME_REGEX = /^[a-zA-Z0-9_]{3,20}$/;

// Only Alphabets
export const ALPHABET_ONLY_REGEX = /^[A-Za-z]+$/;

// Alphanumeric
export const ALPHANUMERIC_REGEX = /^[A-Za-z0-9]+$/;

// Postal Code (India - 6 digit)
export const POSTAL_CODE_REGEX = /^[1-9][0-9]{5}$/;

// URL
export const URL_REGEX = /^(https?:\/\/)?([\w\-])+\.{1}([a-zA-Z]{2,63})([\/\w\.-]*)*\/?$/;

// IPv4 Address
export const IPV4_REGEX = /^(25[0-5]|2[0-4]\d|[01]?\d\d?)\.((25[0-5]|2[0-4]\d|[01]?\d\d?)\.){2}(25[0-5]|2[0-4]\d|[01]?\d\d?)$/;

// Hex Color
export const HEX_COLOR_REGEX = /^#?([a-fA-F0-9]{6}|[a-fA-F0-9]{3})$/;

// Date (YYYY-MM-DD)
export const DATE_REGEX = /^\d{4}-\d{2}-\d{2}$/;

// Time (HH:MM in 24hr)
export const TIME_24H_REGEX = /^([01]\d|2[0-3]):([0-5]\d)$/;

// Credit Card (generic)
export const CREDIT_CARD_REGEX = /^(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|3[47][0-9]{13})$/;

// PAN Card (India)
export const PAN_CARD_REGEX = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;

// Aadhaar Card (India - 12 digit)
export const AADHAAR_REGEX = /^\d{12}$/;

// GSTIN (India)
export const GSTIN_REGEX = /^\d{2}[A-Z]{5}\d{4}[A-Z]{1}[A-Z\d]{1}[Z]{1}[A-Z\d]{1}$/;

// UPI ID
export const UPI_REGEX = /^[\w.-]+@[\w.-]+$/;

// YouTube Video URL
export const YOUTUBE_URL_REGEX = /^(https?\:\/\/)?(www\.youtube\.com|youtu\.?be)\/.+$/;


