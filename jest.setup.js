import '@testing-library/jest-dom';

//  we run headless mode so we don't have window object
window.alert = console.log;
