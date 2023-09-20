interface titleProps {
  title: string;
}

function Title(props: titleProps) {
  return <h1>{props.title}</h1>;
}

export default Title;
