import I18n from '../../languages/i18n';

//mark = 玩家棋子 false = 'O'  true = 'X'
export const CheckWinner = (squares, mark) => {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return mark ?
        (squares[a] === 'X'? _displayMessage('Win') : _displayMessage('Loss'))
        :(squares[a] === 'O'? _displayMessage('Win') : _displayMessage('Loss'))

    }
  }
  return null;
}


export const _displayMessage = (message) => {
  switch (message) {
    case 'Win':
      return I18n.t('game.success');
    case 'Loss':
      return I18n.t('game.failed');
    case 'Draw':
      return I18n.t('game.draw');
  }
}
