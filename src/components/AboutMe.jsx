export default function AboutMe(props) {
  return (
    <div>
      <h1>About Me</h1>
      <p>{props.bio}</p>
      <a href="#/">Back Home</a>
    </div>
  );
}