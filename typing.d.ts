declare module "*.less" {
  const classes: {
    readonly [key: string]: string;
  };
  export default classes;
}

declare module "*.png" {
  const value: any;
  export default value;
}

interface Window {
  _store_: any;
}
