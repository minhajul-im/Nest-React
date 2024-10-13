export type Item = {
  title: string;
  link: string;
};

export type LinkProps = {
  isLink?: boolean;
  children: string;
  links: Item[];
};
