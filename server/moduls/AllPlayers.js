export var players = new Map();

export function setNewPlayer(nickname, uuid) {
  players.set(uuid, nickname);
  return true;
}

export function checkIfPlayerExist(nickname) {
  for (const name of players.values()) {
    if (name === nickname) {
      return true;
    }
  }

  return false;
}

export function getNickname(uuid) {
  return players.get(uuid) || null;
}

export function removePlayer(uuid) {
  const nickname = players.get(uuid);
  if (nickname) {
    players.delete(uuid);
    nicknameToUuid.delete(nickname);
    return true;
  }
  return false;
}
