export const prettyNumber = (num: number) => Math.round(num * 100) / 100

export const prettyDate = (date: string) => date.split('-').reverse().join('/')
