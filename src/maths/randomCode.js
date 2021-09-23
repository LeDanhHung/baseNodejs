export function randomCode() {
    let result = Math.floor(Math.random() * 9999)
    if (result < 1000) {
        result = result + 1000
    }
    return result
}