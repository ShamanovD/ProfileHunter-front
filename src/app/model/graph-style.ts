export const style = [
  {
    selector: 'node',
    style: {
      'shape': 'ellipse',
      'width': 100, // Примерный размер круга
      'height': 100,
      'background-image': 'data(image)', // Используем URL аватара как фон
      'background-fit': 'cover', // Заполняем всю ноду, обрезая при необходимости
      'border-width': 2,
      'border-color': '#ccc',
      'label': '', // Внутри ноды метки не будет (или можно сделать очень маленькой и прозрачной)
      'text-valign': 'bottom', // Username будет снизу
      'text-halign': 'center',
    }
  },
  {
    selector: 'edge',
    style: {
      'width': 2,
      'line-color': '#aaa',
      'target-arrow-color': '#aaa',
      'target-arrow-shape': 'triangle',
      'curve-style': 'bezier',
      'opacity': 0.7
    }
  },
  {
    selector: '.center-node',
    style: {
      'border-color': '#374151',
      'border-width': 3
    }
  },
  {
    selector: 'node', // Стиль для текста под нодой (username)
    style: {
      'text-valign': 'bottom',
      'text-halign': 'center',
      'label': 'data(username)',
      'font-size': 12,
      'color': '#374151',
      'text-background-opacity': 0,
      'text-margin-y': 5 // Отступ от круга
    }
  },
  {
    selector: 'node', // Стиль для дополнительного текста под username (fullName)
    style: {
      'text-valign': 'bottom',
      'text-halign': 'center',
      'label': 'data(fullName)',
      'font-size': 10,
      'color': '#999',
      'text-background-opacity': 0,
      'text-margin-y': -15 // Размещаем под username
    }
  },
  {
    selector: 'node', // Стиль для иконки соцсети (попробуем разместить текстом)
    style: {
      'text-valign': 'top',
      'text-halign': 'right',
      // 'label': (ele) => {
      //   const sourceType = ele.data('sourceType');
      //   if (sourceType === 'TELEGRAM') return '💬'; // Пример эмодзи
      //   if (sourceType === 'FACEBOOK') return 'f'; // Пример текстовой иконки
      //   return '';
      // },
      'font-size': 16,
      'color': '#374151',
      'text-background-opacity': 0,
      'text-margin-x': -5,
      'text-margin-y': 5
    }
  }
]
