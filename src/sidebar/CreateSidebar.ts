export function createSidebar() {
  const sidebar = document.getElementById('sidebar')!;

  const icons: { [key: string]: string } = {
    button: 'dist/icons/button.png',
    header: 'dist/icons/header.png',
    image: 'dist/icons/image.png',
    text: 'dist/icons/text.png',
    container: 'dist/icons/square.png',
    twoCol: 'dist/icons/column.png',
    threeCol: 'dist/icons/threecolumn.png',
    portfolio: 'dist/icons/portfolio.png',
    landingpage: 'dist/icons/landingpage.png',
  };

  const titles: { [key: string]: string } = {
    button: 'Button',
    header: 'Header',
    image: 'Image',
    text: 'Text',
    container: 'Container',
    twoCol: 'Two Column Layout',
    threeCol: 'Three Column Layout',
    portfolio: 'Portfolio Template',
    landingpage: 'Landing Page Template',
  };

  Object.entries(icons).forEach(([componentId, iconPath]) => {
    const iconElement = document.createElement('div');
    iconElement.classList.add('draggable');
    iconElement.id = componentId;
    iconElement.setAttribute('draggable', 'true');
    iconElement.setAttribute('data-component', componentId);

    // Use the custom title instead of the componentId
    const customTitle = titles[componentId] || `Drag to add ${componentId}`;
    iconElement.setAttribute('title', customTitle);

    const img = document.createElement('img');
    img.src = iconPath;
    img.alt = `${componentId} icon`;
    iconElement.appendChild(img);

    sidebar.appendChild(iconElement);
  });
}
