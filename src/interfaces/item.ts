interface Item {
  content?: string;
  name: string;
  path: string;
  sha: string;
  type: "dir" | "file";
}

export default Item;
