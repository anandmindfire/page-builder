import { Canvas } from '../canvas/Canvas';

export class ThreeColumnContainer {
  private element: HTMLElement;

  constructor() {
    this.element = document.createElement('div');
    this.element.classList.add('three-column-container');
    this.element.setAttribute('draggable', 'true');

    // Create columns
    const column1 = this.createColumn('column-1');
    const column2 = this.createColumn('column-2');
    const column3 = this.createColumn('column-3');

    // Append columns to the container
    this.element.appendChild(column1);
    this.element.appendChild(column2);
    this.element.appendChild(column3);

    // Add styles
    this.addStyles();

    // Add event listeners
    this.initializeEventListeners();
  }

  private createColumn(className: string): HTMLElement {
    const column = document.createElement('div');
    column.classList.add('column', className);
    column.setAttribute('draggable', 'true');
    column.style.width = '33.33%'; // Default equal width for three columns
    return column;
  }

  private initializeEventListeners(): void {
    this.element.addEventListener('dragover', event => event.preventDefault());
    this.element.addEventListener('drop', this.onDrop.bind(this));
  }

  private onDrop(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();

    const componentType = event.dataTransfer?.getData('component-type');
    if (!componentType) return;

    const component = Canvas.createComponent(componentType);
    if (!component) return;

    // Determine the target column
    const targetColumn = event.target as HTMLElement;

    // Ensure the drop is happening on a valid column
    if (targetColumn && targetColumn.classList.contains('column')) {
      targetColumn.appendChild(component);

      // Capture state for history
      Canvas.historyManager.captureState();
    }
  }

  private addStyles(): void {
    const style = document.createElement('style');
    style.textContent = `
        .three-column-container {
          display: flex;
          width: 100%;
          min-width: 300px;
          min-height: 100px;
        }
        .column {
          flex: 1;
          min-width: 50px;
          border: 1px dashed #ddd;
          padding: 10px;
          position: relative;
        }
        .column:hover {
          background: #f5f5f5;
        }
      `;
    document.head.appendChild(style);
  }

  public create(): HTMLElement {
    return this.element;
  }
}
