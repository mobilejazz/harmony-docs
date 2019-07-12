import Item from './item';
import MenuItem from './menu-item';

interface State {
  items: Item[];
  menu: MenuItem[];
  path?: string;
}

export default State;
