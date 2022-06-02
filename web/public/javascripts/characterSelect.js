window.onload = function () {
  $.get('/character/list', data => {
    const characterElement = $('#character-list');
    data.map(character => characterElement.append(`<li><a href="/character/${character.name}">${character.name}</a></li>`));
  });
}