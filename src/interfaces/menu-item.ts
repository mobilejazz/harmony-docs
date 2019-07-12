interface MenuItem {
    name: string;
    path: string;
    sha: string;
    children?: MenuItem[]
}

export default MenuItem;