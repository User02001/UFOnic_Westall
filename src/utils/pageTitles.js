export const TITLES = {
 home: 'UFOnic Westall | Shortcut Platform',
};

export function setTitle(key) {
 document.title = TITLES[key] ?? 'UFOnic Westall';
}