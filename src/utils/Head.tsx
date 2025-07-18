
type HeadProps = {
    title: string;
    description: string;
};
export default function Head({ title, description }: HeadProps) {
  return (
    <head>
    <title>{title}</title>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content={description} />
    </head>
  )
}