// utils/dataHelper.js

export function randomText(prefix = 'test') {
  return `${prefix}-${Date.now()}`;
}

export function randomNumber() {
  return Math.floor(Math.random() * 1000).toString();
}