export function isValidNickname(nickname) {
    return typeof nickname === 'string'
        && nickname.trim() !== ''
        && nickname.length < 20
        && /^[a-zA-Z0-9_]+$/.test(nickname);
}